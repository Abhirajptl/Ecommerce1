import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const cart = useSelector((state) => state.cart);

    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between">
            <Link to="/" className="text-xl font-bold">E-Shop</Link>
            <div>
                <Link to="/cart" className="mr-4">Cart ({cart.items.length})</Link>
                <Link to="/orders" className="mr-4">Orders</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;
