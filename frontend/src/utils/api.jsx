import axios from "axios";

// Set up Axios instance with base URL
const API = axios.create({
    baseURL: "https://ecommerce1-xi-lilac.vercel.app/api", // Change this if your backend is deployed
    headers: {
        "Content-Type": "application/json"
    }
});

// Function to create an order (Razorpay)
export const createOrder = async (amount) => {
    try {
        const { data } = await API.post("/payment/create-order", {
            amount, 
            currency: "INR"
        });
        return data; // Returns order details
    } catch (error) {
        console.error("Error creating order:", error.response?.data || error.message);
        throw error;
    }
};

// Function to verify payment after successful transaction
export const verifyPayment = async (paymentData) => {
    try {
        const { data } = await API.post("/payment/verify", paymentData);
        return data;
    } catch (error) {
        console.error("Payment verification failed:", error.response?.data || error.message);
        throw error;
    }
};

export default API;
