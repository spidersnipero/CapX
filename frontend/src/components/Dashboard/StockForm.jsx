import React, { useState, useEffect } from "react";

const StockForm = ({ addStock, updateStock, editStock }) => {
  const [formData, setFormData] = useState({
    stockSymbol: "",
    boughtPrice: "",
    quantity: "",
  });

  useEffect(() => {
    if (editStock) {
      setFormData({
        stockSymbol: editStock.id.stockSymbol,
        boughtPrice: editStock.boughtPrice.toString(),
        quantity: editStock.quantity.toString(),
      });
    }
  }, [editStock]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (formData.stockSymbol && formData.boughtPrice && formData.quantity) {
      addStock({
        id: {
          userId: 1,
          stockSymbol: formData.stockSymbol,
        },
        boughtPrice: parseFloat(formData.boughtPrice),
        quantity: parseInt(formData.quantity),
      });
      setFormData({ stockSymbol: "", boughtPrice: "", quantity: "" });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (formData.stockSymbol && formData.boughtPrice && formData.quantity) {
      updateStock({
        id: {
          userId: 1,
          stockSymbol: formData.stockSymbol,
        },
        boughtPrice: parseFloat(formData.boughtPrice),
        quantity: parseInt(formData.quantity),
      });
      setFormData({ stockSymbol: "", boughtPrice: "", quantity: "" });
    }
  };

  return (
    <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full mx-auto mt-6">
      <h3 className="text-xl font-bold mb-4 dark:text-white">Add Stock</h3>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Stock Symbol
        </label>
        <input
          type="text"
          name="stockSymbol"
          value={formData.stockSymbol}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter Stock Symbol (e.g., AAPL)"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Bought Price
        </label>
        <input
          type="number"
          name="boughtPrice"
          value={formData.boughtPrice}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter Bought Price"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Quantity
        </label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter Quantity"
        />
      </div>
      <div className="flex gap-4">
        {editStock === null ? (
          <button
            className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={handleAdd}
          >
            Add Stock
          </button>
        ) : (
          <button
            className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={handleUpdate}
          >
            Update Stock
          </button>
        )}
      </div>
    </form>
  );
};

export default StockForm;
