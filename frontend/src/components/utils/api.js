const FINNCLUB_BASE_URL = "https://finnhub.io/api/v1/";
const FINNCLUB_TOKEN = "cthgm31r01qtho2pfrtgcthgm31r01qtho2pfru0";
const DB_URL = "http://localhost:8080/api/investments";

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
