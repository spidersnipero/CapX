import React from "react";

const DashboardStockCard = ({
  id,
  stockSymbol,
  userId,
  boughtPrice,
  quantity,
}) => {
  // Calculate total investment value
  const totalInvestment = (boughtPrice * quantity).toFixed(2);

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {stockSymbol}
        </h2>
        <span className="text-gray-500 text-sm dark:text-gray-400">
          ID: {id}
        </span>
      </div>
      <div className="text-gray-700 dark:text-gray-300">
        <p>
          <span className="font-medium">Bought Price: </span>₹
          {boughtPrice.toFixed(2)}
        </p>
        <p>
          <span className="font-medium">Quantity: </span>
          {quantity}
        </p>
        <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
          Total Investment: ₹{totalInvestment}
        </p>
      </div>
    </div>
  );
};

export default DashboardStockCard;
