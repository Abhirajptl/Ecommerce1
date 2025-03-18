import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <div className="border p-4 rounded-md shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <button 
                className="bg-blue-500 text-white px-4 py-2 mt-2"
                onClick={() => dispatch(addToCart(product))}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
