const express = require("express");
const router = express.Router();
const {
    createOrder,
    getOrderById,
    getAllOrders,
    updateOrderToPaid,
    updateOrderToDelivered,
    processPayment, // Ensure this function exists in orderController.js
} = require("../controllers/orderController"); // Correct Import

const { protect, admin } = require("../middleware/authMiddleware"); // Ensure this exists

// Routes
router.post("/", protect, createOrder);
router.get("/:id", protect, getOrderById);
router.get("/", protect, admin, getAllOrders);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);
router.post("/:id/pay", protect, processPayment); // Ensure processPayment exists

module.exports = router;
