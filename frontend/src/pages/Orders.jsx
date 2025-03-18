import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../redux/orderSlice";
import formatPrice from "../utils/formatPrice";

const Orders = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold text-center mb-4">Your Orders</h2>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {orders.length === 0 && !loading ? (
                <p className="text-center">No orders found.</p>
            ) : (
                <div className="grid gap-4">
                    {orders.map((order) => (
                        <div key={order._id} className="border p-4 rounded-lg shadow-md">
                            <p className="text-lg font-medium">Order ID: {order._id}</p>
                            <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleString()}</p>
                            <p className="text-gray-600">Total: <strong>{formatPrice(order.totalAmount)}</strong></p>
                            <p className="text-gray-600">Status: <span className="font-medium">{order.status}</span></p>
                            <h3 className="font-semibold mt-2">Items:</h3>
                            <ul className="list-disc list-inside">
                                {order.items.map((item) => (
                                    <li key={item._id} className="text-gray-700">
                                        {item.name} - {item.quantity} x {formatPrice(item.price)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
