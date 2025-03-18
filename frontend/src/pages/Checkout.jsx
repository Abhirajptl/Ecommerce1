import { createOrder } from "../utils/api";
import axios from "axios";

const handlePayment = async () => {
    try {
        const order = await createOrder(500); // Amount in INR

        if (!order || !order.id) {
            throw new Error("Failed to create Razorpay order");
        }

        const options = {
            key: import.meta.env.REACT_APP_RAZORPAY_KEY_ID, // Razorpay Key from .env
            amount: order.amount,
            currency: order.currency,
            order_id: order.id,
            name: "E-commerce Store",
            description: "Order Payment",
            handler: async (response) => {
                console.log("Payment Success:", response);

                // Verify payment with backend
                const verifyResponse = await axios.post("/api/payment/verify", {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                });

                if (verifyResponse.data.success) {
                    alert("Payment successful and verified!");
                } else {
                    alert("Payment verification failed!");
                }
            },
            prefill: {
                name: "John Doe",
                email: "johndoe@example.com",
                contact: "9876543210",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const razor = new window.Razorpay(options);
        razor.open();
    } catch (error) {
        console.error("Payment failed:", error);
        alert("Payment failed. Please try again.");
    }
};

export default handlePayment;
