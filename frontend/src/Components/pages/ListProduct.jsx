


import React, { useState, useEffect } from "react";
import './ListProduct.css';

const ListProduct = () => {
    const [allProducts, setAllProducts] = useState([]);

    // const fetchInfo = async () => {
    //     try {
    //         const response = await fetch('http://localhost:8080/allfoods');
    //         const data = await response.json();
    //         setAllProducts(data);
    //     } catch (error) {
    //         console.error("Error fetching products:", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchInfo();
    // }, []);



    const fetchInfo = async () => {
        try {
            // Retrieve the JWT token from local storage
            const token = localStorage.getItem('jwtToken');
    
            const response = await fetch('http://localhost:8080/allfoods', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the JWT token
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                setAllProducts(data);
            } else {
                console.log("Failed to fetch products. Status:", response.status);
                if (response.status === 401) {
                    // Handle unauthorized access (e.g., redirect to login)
                }
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    
    useEffect(() => {
        fetchInfo(); 
    }, []);
    



   
    

    // const removeProduct = async (id) => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/delete/${id}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         // Changed response.ok check to response status check
    //         if (response.status === 204) { // NO_CONTENT status
    //             alert("Product deleted");
    //             fetchInfo(); // Refresh the products list
    //         } else {
    //             alert("Failed to delete product");
    //         }
    //     } catch (error) {
    //         console.error('Error deleting product:', error);
    //         alert("Failed to delete product");
    //     }
    // };

    

    const removeProduct = async (id) => {
        try {
            // Retrieve the JWT token from local storage
            const token = localStorage.getItem('jwtToken');
    
            const response = await fetch(`http://localhost:8080/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the JWT token
                },
            });
    
            if (response.status === 204) { // NO_CONTENT status
                alert("Product deleted");
                fetchInfo(); // Refresh the products list
            } else {
                alert("Failed to delete product");
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert("Failed to delete product");
        }
    };
    


  

    

    return (
        <div className='list-product'>
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>fname</p>
                <p>Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {
                    allProducts.map((product, index) => (
                        <React.Fragment key={index}>
                            <div className="listproduct-format-main listproduct-format">
                                <p>{product.fname}</p>
                                <p>{product.price}</p>
                                <p>{product.category}</p>
                                <button onClick={() => removeProduct(product.f_id)} className='listproduct-remove-btn'>
                                    Remove
                                </button>
                            </div>
                            <hr />
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    );
};

export default ListProduct;




