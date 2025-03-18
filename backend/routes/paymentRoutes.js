const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const razorpayInstance = require("../config/razorpay");

// Create a Razorpay order
router.post("/create-order", async (req, res) => {
    try {
        const { amount, currency } = req.body;

        if (!amount || isNaN(amount)) {
            return res.status(400).json({ message: "Invalid amount provided" });
        }

        const options = {
            amount: amount * 100, // Convert to paise
            currency: currency || "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpayInstance.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Payment initiation failed" });
    }
});

// Verify Razorpay Payment
router.post("/verify", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: "Missing required payment details" });
        }

        const secret = process.env.RAZORPAY_SECRET; // Ensure this is set in your .env file
        const generatedSignature = crypto
            .createHmac("sha256", secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid payment signature" });
        }

        res.json({ message: "Payment verified successfully", success: true });
    } catch (error) {
        console.error("Payment verification failed:", error);
        res.status(500).json({ message: "Payment verification failed" });
    }
});

module.exports = router;
