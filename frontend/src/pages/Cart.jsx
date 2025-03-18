import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';
import "./Cart.css";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            {cart.items.length === 0 ? <p>Your cart is empty</p> : (
                <ul>
                    {cart.items.map(item => (
                        <li key={item._id} className="flex justify-between p-2 border-b">
                            {item.name} - ${item.price}
                            <button 
                                className="text-red-500"
                                onClick={() => dispatch(removeFromCart(item._id))}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
