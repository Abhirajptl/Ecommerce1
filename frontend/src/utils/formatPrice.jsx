/**
 * Formats a number as a currency string.
 * @param {number} amount - The amount to format.
 * @param {string} currency - The currency code (default: INR).
 * @returns {string} - Formatted price string.
 */
const formatPrice = (amount, currency = "INR") => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
    }).format(amount);
};

export default formatPrice;
