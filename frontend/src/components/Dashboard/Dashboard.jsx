import React, { useEffect, useState } from "react";
import {
  fetchStockHoldings,
  fetchStockProfile,
  fetchStock,
} from "../utils/api";
import StockForm from "./StockForm";
import { deleteStock, addStock, updateStock } from "../utils/api";
import loadingSVG from "../../assets/loading.svg";

const Dashboard = () => {
  const [stockHoldings, setStockHoldings] = useState([]);
  const [stocksProfiles, setStocksProfiles] = useState({});
  const [currentStocks, setCurrentStocks] = useState({});
  const [currentValue, setCurrentValue] = useState(7970);
  const [editStock, setEditStock] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
    if (!isOverlayVisible) {
      setEditStock(null);
    }
  };

  // Fetch stock holdings
  const getStockHoldings = async () => {
    const data = await fetchStockHoldings();
    setStockHoldings(data);
    console.log(data);
  };
  // Fetch stock profiles
  const getStocksProfiles = async () => {
    const stockSymbols = stockHoldings.map((stock) => stock.id.stockSymbol);
    const data = await Promise.all(
      stockSymbols.map(async (symbol) => {
        const stock = await fetchStockProfile(symbol);
        return stock;
      })
    );
    const stockProfilesMap = {};
    data.map((stock) => {
      stockProfilesMap[stock.ticker] = stock;
    });
    console.log(stockProfilesMap);
    setStocksProfiles(stockProfilesMap);
    setLoading(false);
  };
  // get the current value of the stocks
  const getInvestedValue = () => {
    return stockHoldings.reduce((acc, stock) => {
      return acc + stock.boughtPrice * stock.quantity;
    }, 0);
  };
  // delete a stock

  const addStockToDashboard = async (stock) => {
    await addStock(stock);
    console.log(stock);
    setStockHoldings((prev) => [...prev, stock]);
    setLoading(true);
    toggleOverlay();
  };

  const updateStockToDashboard = async (stock) => {
    console.log(stock);
    await updateStock(stock);
    setStockHoldings((prev) =>
      prev.map((s) => {
        if (s.id.stockSymbol === stock.id.stockSymbol) {
          return stock;
        }
        return s;
      })
    );
    setLoading(true);
    toggleOverlay();
    setEditStock(null);
  };

  const deleteStockFromDashboard = async (stockSymbol) => {
    await deleteStock(stockSymbol);
    setStockHoldings((prev) =>
      prev.filter((stock) => stock.id.stockSymbol !== stockSymbol)
    );
  };

  const editStockInDashboard = (stock) => {
    setEditStock(stock);
    setIsOverlayVisible(true);
  };

  // useEffects

  useEffect(() => {
    const fetchData = async () => {
      await getStockHoldings(); // Fetch stock holdings first
    };
    fetchData();
  }, []);

  // Use another useEffect to fetch stock profiles after stock holdings have been set
  useEffect(() => {
    if (stockHoldings.length > 0) {
      getStocksProfiles(); // Fetch stock profiles only after stockHoldings is updated
    }
  }, [stockHoldings]);

  // Calculate invested value

  // Update current value every 10 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const stockSymbols = stockHoldings.map((stock) => stock.id.stockSymbol);
      const updatedStocks = await Promise.all(
        stockSymbols.map(async (symbol) => {
          const stock = await fetchStock(symbol);
          return stock;
        })
      );
      // update currentValue
      const newCurrentValue = updatedStocks.reduce((acc, stock, index) => {
        const updatedStock = stockHoldings[index];
        return acc + updatedStock.quantity * stock.c;
      }, 0);

      // Update the current value state with the newly calculated value
      setCurrentValue(newCurrentValue);

      const currentStocksMap = {};

      updatedStocks.map((stock, index) => {
        const stockSymbol = stockHoldings[index].id.stockSymbol;
        currentStocksMap[stockSymbol] = stock;
      });
      setCurrentStocks(currentStocksMap);
    }, 10000);

    return () => clearInterval(interval);
  }, [stockHoldings]);

  if (loading) {
    return (
      <div className="flex items-center justify-center  min-h-screen bg-transparent">
        <img src={loadingSVG} alt="loading" className="bg-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-sans dark:text-slate-100">Dashboard</h2>
        <div className="relative">
          <button
            onClick={toggleOverlay}
            className="bg-green-400 text-white px-4 py-2 rounded-full mt-5"
          >
            Add Stocks
          </button>

          {/* Overlay div that appears on button click */}
          {isOverlayVisible && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              onClick={() => setIsOverlayVisible(false)} // Close the overlay when clicking outside the content
            >
              <div
                className="bg-white rounded-lg p-6 max-w-lg w-full dark:bg-gray-800"
                onClick={(e) => e.stopPropagation()} // Prevent closing the overlay when clicking inside the form
              >
                {/* Close button for the form overlay */}
                <button
                  className="  top-2 right-2 text-black text-3xl  dark:text-white"
                  onClick={() => setIsOverlayVisible(false)}
                >
                  &times;
                </button>
                <StockForm
                  addStock={addStockToDashboard}
                  updateStock={updateStockToDashboard}
                  editStock={editStock}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-2 rounded-2xl p-10 mt-5 dark:text-white">
        <div className="flex justify-around">
          <div className="flex flex-col">
            <p className="text-2xl">{`$${getInvestedValue()}`}</p>
            <p>Invested Value</p>
          </div>
          <div className="flex flex-col">
            <p className="text-2xl">{`$${currentValue.toFixed(2)}`}</p>
            <p>Current Value (updates after every 10 seconds)</p>
          </div>
        </div>
        {/* a horizontal line */}
        <hr className="my-5" />
        <div>
          {/* Table for stock holdings */}
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="font-bold py-2 px-4">Company Name</th>
                <th className="font-bold py-2 px-4">Symbol</th>
                <th className="font-bold py-2 px-4">Bought Price</th>
                <th className="font-bold py-2 px-4">Current Price</th>
                <th className="font-bold py-2 px-4">Quantity</th>
                <th className="font-bold py-2 px-4">Total Investment</th>
              </tr>
            </thead>
            <tbody>
              {stockHoldings.map((stock, index) => (
                <tr key={index} className="border-t my-10">
                  <td className="py-2 px-4 flex flex-row justify-between">
                    {stocksProfiles[stock.id.stockSymbol].name + " "}
                    <button
                      onClick={() => editStockInDashboard(stock)}
                      className="text-orange-300 pr-3"
                    >
                      edit
                    </button>
                  </td>
                  <td className="py-2 px-4">{stock.id.stockSymbol}</td>
                  <td className="py-2 px-4">{stock.boughtPrice}</td>
                  <td className="py-2 px-4">
                    ${currentStocks[stock.id.stockSymbol]?.c || "Loading..."}
                  </td>
                  <td className="py-2 px-4">{stock.quantity}</td>
                  <td className="py-2 px-4">
                    <div className="flex flex-row justify-between">
                      <p>
                        $
                        {(
                          stock.quantity *
                          (currentStocks[stock.id.stockSymbol]?.c || 0)
                        ).toFixed(2)}
                      </p>
                      <button
                        onClick={() =>
                          deleteStockFromDashboard(stock.id.stockSymbol)
                        }
                        className="bg-red-400 text-white px-2 py-1 rounded-full"
                      >
                        delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
