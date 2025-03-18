import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch user orders
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token"); // Get auth token
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get("/api/orders", config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
});

// Async action to create a new order
export const createOrder = createAsyncThunk("orders/createOrder", async (orderData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };
        const { data } = await axios.post("/api/orders", orderData, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to create order");
    }
});

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetOrderState: (state) => {
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Orders
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create Order
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload);
                state.success = true;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
