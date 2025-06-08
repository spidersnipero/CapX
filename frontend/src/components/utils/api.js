const FINNCLUB_BASE_URL = "https://finnhub.io/api/v1/";
const FINNCLUB_TOKEN = "cthgm31r01qtho2pfrtgcthgm31r01qtho2pfru0";
const DB_URL = "https://13.232.140.204:8443/api/investments";

/**
 * Helper function to handle common fetch errors.
 * @param {Response} response The fetch API response object.
 * @param {string} message A base message for the error.
 * @throws {Error} Throws an error with a descriptive message.
 */
const handleErrorResponse = async (response, message) => {
  let errorDetail = response.statusText;
  try {
    const errorBody = await response.json();
    if (errorBody && errorBody.message) {
      errorDetail = errorBody.message;
    }
  } catch (e) {
    // If response is not JSON, use default status text
  }
  throw new Error(`${message}: ${response.status} - ${errorDetail}`);
};

/**
 * Fetch all stock holdings from the backend for a user.
 * @returns {Promise<Array>} List of stock holdings.
 * @throws {Error} If fetching stock holdings fails.
 */
export const fetchStockHoldings = async () => {
  try {
    const response = await fetch(`${DB_URL}/user/1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      await handleErrorResponse(response, "Error fetching stock holdings");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch stock holdings:", error);
    throw new Error("Failed to fetch stock holdings: " + error.message);
  }
};

/**
 * Fetch current stock quote for a given symbol.
 * @param {string} symbol The stock symbol (e.g., "AAPL").
 * @returns {Promise<Object>} Stock quote data.
 * @throws {Error} If fetching stock quote fails.
 */
export const fetchStock = async (symbol) => {
  try {
    const response = await fetch(
      `${FINNCLUB_BASE_URL}quote?symbol=${symbol}&token=${FINNCLUB_TOKEN}`
    );
    if (!response.ok) {
      await handleErrorResponse(response, `Error fetching stock quote for ${symbol}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch stock quote for ${symbol}:`, error);
    throw new Error(`Failed to fetch stock quote for ${symbol}: ` + error.message);
  }
};

/**
 * Fetch company profile for a given stock symbol.
 * @param {string} symbol The stock symbol (e.g., "AAPL").
 * @returns {Promise<Object>} Stock profile data.
 * @throws {Error} If fetching stock profile fails.
 */
export const fetchStockProfile = async (symbol) => {
  try {
    const response = await fetch(
      `${FINNCLUB_BASE_URL}stock/profile2?symbol=${symbol}&token=${FINNCLUB_TOKEN}`
    );
    if (!response.ok) {
      await handleErrorResponse(response, `Error fetching stock profile for ${symbol}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch stock profile for ${symbol}:`, error);
    throw new Error(`Failed to fetch stock profile for ${symbol}: ` + error.message);
  }
};

/**
 * Add a new stock to the user's portfolio.
 * @param {Object} stock The stock object to add.
 * @returns {Promise<Object>} The added stock data.
 * @throws {Error} If adding stock fails.
 */
export const addStock = async (stock) => {
  try {
    const response = await fetch(`${DB_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stock),
    });

    if (response.ok) {
      return await response.json();
    } else if (response.status === 400) {
      // Specific handling for 400 with a custom error message
      throw new Error("Stock already exists in the portfolio.");
    } else {
      await handleErrorResponse(response, "Failed to add investment");
    }
  } catch (error) {
    console.error("Error adding stock:", error);
    throw new Error("Failed to add stock: " + error.message);
  }
};

/**
 * Update an existing stock in the user's portfolio.
 * @param {Object} stock The stock object to update.
 * @returns {Promise<Object>} The updated stock data.
 * @throws {Error} If updating stock fails.
 */
export const updateStock = async (stock) => {
  try {
    const response = await fetch(`${DB_URL}/1/${stock.id.stockSymbol}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stock),
    });
    if (response.ok) {
      return await response.json();
    } else if (response.status === 400) {
      // Specific handling for 400 with a custom error message
      throw new Error("Stock does not exist in the portfolio.");
    } else {
      await handleErrorResponse(response, "Failed to update investment");
    }
  } catch (error) {
    console.error("Failed to update investment:", error);
    throw new Error("Failed to update investment: " + error.message);
  }
};

/**
 * Delete a stock from the user's portfolio.
 * @param {string} stockSymbol The symbol of the stock to delete.
 * @returns {Promise<Response>} The fetch response.
 * @throws {Error} If deleting stock fails.
 */
export const deleteStock = async (stockSymbol) => {
  try {
    const response = await fetch(`${DB_URL}/1/${stockSymbol}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      await handleErrorResponse(response, `Error deleting stock ${stockSymbol}`);
    }
    return response;
  } catch (error) {
    console.error(`Failed to delete stock ${stockSymbol}:`, error);
    throw new Error(`Failed to delete stock ${stockSymbol}: ` + error.message);
  }
};
