import React, { useEffect, useState } from "react";
import {
  fetchStockHoldings,
  fetchStockProfile,
  fetchStock,
} from "../utils/api";

const Dashboard = () => {
  const [stockHoldings, setStockHoldings] = useState([]);
  const [stocksProfiles, setStocksProfiles] = useState([]);
  const [currentValue, setCurrentValue] = useState(7970);
  const [loading, setLoading] = useState(true);

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
    setStocksProfiles(data);
    console.log(data);
    setLoading(false);
  };

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
  const getInvestedValue = () => {
    return stockHoldings.reduce((acc, stock) => {
      return acc + stock.boughtPrice * stock.quantity;
    }, 0);
  };

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
      console.log(updatedStocks);
    }, 10000);

    return () => clearInterval(interval);
  }, [stockHoldings]);

  if (loading) {
    console.log(loading);
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-sans dark:text-slate-100">Dashboard</h2>
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
          {/* heading div of company name opn left and space between and symbol, bought price , current price, quantity and total investment=currentvalue*quantity on right */}
          <div className="flex justify-between">
            <div className="font-bold">Company Name</div>
            <div className="font-bold">Symbol</div>
            <div className="font-bold">Bought Price</div>
            <div className="font-bold">Current Price</div>
            <div className="font-bold">Quantity</div>
            <div className="font-bold">Total Investment</div>
          </div>
          {/* a horizontal line */}
          <hr className="my-5" />
          {stockHoldings.map((stock) => {
            return (
              <div className="flex justify-between" key={stock.id.stockSymbol}>
                <div>{stock.id.companyName}</div>
                <div>{stock.id.stockSymbol}</div>
                <div>{stock.boughtPrice}</div>
                <div>{stock.currentPrice}</div>
                <div>{stock.quantity}</div>
                <div>{(stock.quantity * stock.currentPrice).toFixed(2)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
