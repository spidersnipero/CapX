const FINNCLUB_BASE_URL = "https://finnhub.io/api/v1/";
const FINNCLUB_TOKEN = "cthgm31r01qtho2pfrtgcthgm31r01qtho2pfru0";
const DB_URL = "https://13.200.246.131:8443/api/investments";

/**
 * Fetch all stock holdings from the backend for a user.
 * @returns {Promise<Array>} List of stock holdings.
 */
export const fetchStockHoldings = async () => {
  try {
    const response = await fetch(`${DB_URL}/user/1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchStock = async (symbol) => {
  try {
    const response = await fetch(
      `${FINNCLUB_BASE_URL}quote?symbol=${symbol}&token=${FINNCLUB_TOKEN}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchStockProfile = async (symbol) => {
  try {
    const response = await fetch(
      `${FINNCLUB_BASE_URL}stock/profile2?symbol=${symbol}&token=${FINNCLUB_TOKEN}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addStock = async (stock) => {
  try {
    const response = await fetch(`${DB_URL}`, {
      // Make sure the URL is correct
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stock),
    });

    if (response.ok) {
      return await response.json(); // or handle the response as needed
    } else if (response.status === 400) {
      alert("Stock already exists in the portfolio");
      return response;
    } else {
      console.error("Failed to add investment", response.statusText);
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

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
      alert("Stock does not exist in the portfolio");
      return response;
    } else {
      console.error("Failed to update investment", response.statusText);
      return response;
    }
  } catch (error) {
    alert("Failed to update investment");
    console.error(error);
  }
};

export const deleteStock = async (stockSymbol) => {
  try {
    const response = await fetch(`${DB_URL}/1/${stockSymbol}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
