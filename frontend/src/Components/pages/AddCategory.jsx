

import React, { useState } from 'react';
import './AddCategory.css';
import logo from '../assests/logo.png';

const AddItem = () => {
    const [fname, setFname] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newItem = {
            fname,
            price,
            category
        };

        try {
            // Retrieve the JWT token from local storage
            const token = localStorage.getItem('jwtToken'); // Ensure this key matches where you store the token

            const response = await fetch('http://localhost:8080/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the JWT token
                },
                body: JSON.stringify(newItem),
            });

            if (response.ok) {
                alert("Item added successfully");
                setFname('');
                setPrice('');
                setCategory('');
            } else {
                alert("Failed to add item");
            }
        } catch (error) {
            console.error("Error adding item:", error);
            alert("Failed to add item");
        }
    };

    return (
        <>
            <div className='nav'>
                <img src={logo} alt="Logo" />
                <h1>Welcome To Acceinfo Billing Software</h1>
            </div>

            <div className="add-item">
                <h1>Add New Item</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fname">Name:</label>
                        <input
                            type="text"
                            id="fname"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="text"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <input
                            type="text"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className='bttn'>Add Item</button>
                </form>
            </div>
        </>
    );
};

export default AddItem;









