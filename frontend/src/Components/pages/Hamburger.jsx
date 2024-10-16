

// import React, { useState, useEffect } from 'react';
// import './Hamburger.css';
// import logo from '../assests/logo.png'
// import { jwtDecode } from 'jwt-decode';

// const Hamburger = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [data, setData] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [total, setTotal] = useState(0); // State to hold the total sum

//   useEffect(() => {
//     fetchCategories();
//   }, []);



//   const resetForm = () => {
//     setSelectedItems([]);
//     setTotal(0);
//   };
  

  


//   const fetchCategories = async () => {
//     try {
//         const token = localStorage.getItem('jwtToken'); 
//         const response = await fetch('http://localhost:8080/categories', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}` 
//             }
//         });

//         if (response.ok) {
//             const data = await response.json();
//             setCategories(data);
//         } else if (response.status === 401) {
//             console.error("Unauthorized access - please log in");
            
//         } else {
//             console.error("Failed to fetch categories");
//         }
//     } catch (error) {
//         console.error("Error fetching categories:", error);
//     }
// };


//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//     setActiveMenu(null);
//     setData([]);
//     setSelectedItems([]);
//     setTotal(0); 
//   };

//   const toggleSubmenu = (menu) => {
//     if (activeMenu === menu) {
//       setActiveMenu(null);
//       setData([]);
//     } else {
//       setActiveMenu(menu);
//       fetchItemsByCategory(menu);
//     }
//   };

  

//   const fetchItemsByCategory = async (category) => {
//     try {
//         const token = localStorage.getItem('jwtToken'); 
//         const response = await fetch(`http://localhost:8080/FoodByCat/${category}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}` 
//             }
//         });

//         if (response.ok) { 
//             const data = await response.json();
//             setData(data);
//         } else if (response.status === 401) {
//             console.error("Unauthorized access - please log in");
           
//         } else {
//             console.error(`Failed to fetch items for category ${category}`);
//         }
//     } catch (error) {
//         console.error(`Error fetching items for category ${category}:`, error);
//     }
// };




//   const renderSubmenuItems = () => {
//     return data.map(item => (
//       <li key={item.f_id} onClick={() => addSelectedItem(item)}>
//         <button>{item.fname} Rs{item.price}</button>
//       </li>
//     ));
//   };

//   const addSelectedItem = (item) => {
//     setSelectedItems(prevItems => {
//       const existingItem = prevItems.find(i => i.f_id === item.f_id);
//       if (existingItem) {
//         const updatedItems = prevItems.map(i =>
//           i.f_id === item.f_id ? { ...i, quantity: i.quantity + 1 } : i
//         );
//         updateTotal(updatedItems);
//         return updatedItems;
//       } else {
//         const newItems = [...prevItems, { ...item, quantity: 1 }];
//         updateTotal(newItems); 
//         return newItems;
//       }
//     });
//   };

//   const updateQuantity = (item, amount) => {
//     setSelectedItems(prevItems => {
//       const updatedItems = prevItems.map(i =>
//         i.f_id === item.f_id ? { ...i, quantity: Math.max(i.quantity + amount, 0) } : i
//       ).filter(i => i.quantity > 0); 
//       updateTotal(updatedItems); 
//       return updatedItems;
//     });
//   };

//   const updateTotal = (items) => {
//     let totalSum = items.reduce((acc, item) => {
//       return acc + (item.price * item.quantity);
//     }, 0);
//     setTotal(totalSum);
//   };



//   const printBill = async () => {
//     // Get the JWT token
//     const token = localStorage.getItem('jwtToken');
    
//     // Decode the JWT token to get restaurant name
//     const decodedToken = jwtDecode(token);
//     const restaurantName = decodedToken.restaurantName; // Adjust the property name as per your JWT structure
//     const restaurantAddress = "Shake-C Allience"; // Static address
//     const gstRate = 0.18; 
//     const gstAmount = total * gstRate;
//     const totalIncludingGst = total + gstAmount;

    


  
//     // Prepare bill content for printing
//     const billContent = selectedItems.map(item => (
//       `<div class="form-row">
//          <div class="form-item">${item.fname}</div>
//          <div class="form-item"> ${item.quantity}</div>
//          <div class="form-item">  ${item.price}</div>
//          <div class="form-item">  ${item.price * item.quantity}</div>
//        </div>`
//     )).join('');

//     await saveBill(selectedItems, total);
   




    
    
//     // Create a new window for printing
//     const printWindow = window.open('', '_blank');
//     printWindow.document.open();
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Bill</title>
//           <style>
//             @media print {
//               body {
//                 font-family: Arial, sans-serif;
//                 margin: 0;
//                 padding: 0;
//                 width: 80mm; /* width suitable for most thermal printers */
//                 font-size: 12px;
//               }
//               .form {
//                 padding: 10px;
//                 margin: 0;
//               }
//               .form-row {
//                 display: flex;
//                 justify-content: space-between;
//                 margin-bottom: 5px;
//               }
//               .form-item {
//                 flex: 1;
//                 text-align: left;
//                 padding: 0 5px;
//               }
//               .form-item:last-child {
//                 text-align: right;
//               }
//               .restaurant-info {
//                 text-align: center;
//                 margin-bottom: 10px;
//               }
//               hr {
//                 border-top: 1px solid black;
//               }
//             }
//           </style>
//         </head>
//         <body>
//           <div class="restaurant-info">
//             <div><strong>${restaurantName}</strong></div>
//             <div>${restaurantAddress}</div>
//           </div>
//           <hr>
//           <h2>Bill</h2>
//           <div class="form">
//             <div class="form-row">
//               <div class="form-item">Items</div>
//               <div class="form-item">Quantity</div>
//               <div class="form-item">Price</div>
//               <div class="form-item">Total</div>
//             </div>
//             <hr>
//             ${billContent}
//             <div class="form-row">
//               <div class="form-item"><strong>Subtotal:</strong></div>
//               <div class="form-item"></div>
//               <div class="form-item"></div>
//               <div class="form-item"><strong>${total}</strong></div>
//             </div>
//             <div class="form-row">
//               <div class="form-item"><strong>GST (18%):</strong></div>
//               <div class="form-item"></div>
//               <div class="form-item"></div>
//              <div class="form-item"><strong>${gstAmount.toFixed(2)}</strong></div>
//             </div>
//             <hr>
//             <div class="form-row">
//               <div class="form-item"><strong>Total:</strong></div>
//               <div class="form-item"></div>
//               <div class="form-item"></div>
//              <div class="form-item"><strong>${totalIncludingGst.toFixed(2)}</strong></div>
//             </div>
//           </div>
//           <script>window.print();</script>
//         </body>
//       </html>
//     `);
//     printWindow.document.close();

//     // Reset the form after printing (if needed)
//     resetForm();


// };

// const saveBill = async (selectedItems, total) => {
//   const token = localStorage.getItem('jwtToken');
//   const decodedToken = jwtDecode(token);
//   const restaurantName = decodedToken.restaurantName;
//   const restaurantAddress = "Shake-C Allience"; // Static address
//   const gstRate = 0.18;
//   const gstAmount = total * gstRate;
//   const totalIncludingGst = total + gstAmount;

//   const billContent = selectedItems.map(item => ({
//     itemName: item.fname,
//     quantity: item.quantity,
//     price: item.price,
//     total: item.price * item.quantity,
//   }));

//   const billData = {
//     restaurantName,
//     restaurantAddress,
//     items: billContent,
//     subtotal: total,
//     gst: gstAmount,
//     total: totalIncludingGst,
//     // date: billDate,
//   };

//   try {
//     const response = await fetch('http://localhost:8080/api/bills',  {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify(billData),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to save the bill');
//     }

//     console.log('Bill saved successfully');
//   } catch (error) {
//     console.error("Error saving bill:", error);
//   }
// };



   

//   return (
//     <>
//       <div className='Nav'> 
//         <img src={logo} alt="Logo"/>
//         <h1>Acceinfo Billing Software</h1>
//       </div>

//       <div className="hamburger-menu">
//         <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
//           <div className="bar"></div>
//           <div className="bar"></div>
//           <div className="bar"></div>
//         </div>
//         <nav className={`menu ${isOpen ? 'open' : ''}`}>
//           <ul>
//             {categories.map(category => (
//               <li key={category}>
//                 <a href={`#${category}`} onClick={() => toggleSubmenu(category)}>{category}</a>
//                 <ul className={`submenu ${activeMenu === category ? 'open' : ''}`}>
//                   {activeMenu === category && renderSubmenuItems()}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         <div className='form'>
//           <div className='form-header'>
//             <div>Items</div>
//             <div>Quantity</div>
//             <div>Price</div>
//             <div>Total</div>
//           </div>
//           {selectedItems.map(item => (
//             <div className='form-row' key={item.f_id}>
//               <div className='form-item'>{item.fname}</div>
//               <div className='form-item quantity-control'>
//                 <button onClick={() => updateQuantity(item, -1)}>-</button>
//                 <input type="number" min="1" value={item.quantity} readOnly />
//                 <button onClick={() => updateQuantity(item, 1)}>+</button>
//               </div>
//               <div className='form-item'>{item.price}</div>
//               <div className='form-item'>{item.price * item.quantity}</div>
//             </div>
//           ))}
//           <div className='form-row'>
//             <div className='form-item'><strong>Subtotal:</strong></div>
//             <div className='form-item'></div>
//             <div className='form-item'></div>
//             <div className='form-item'><strong>{total}</strong></div>
//           </div>
//           <div className='form-row'>
//             <div className='form-item'><strong>GST (18%):</strong></div>
//             <div className='form-item'></div>
//             <div className='form-item'></div>
//             <div className='form-item'><strong>{(total * 0.18).toFixed(2)}</strong></div>
//           </div>
//           <div className='form-row'>
//             <div className='form-item'><strong>Total:</strong></div>
//             <div className='form-item'></div>
//             <div className='form-item'></div>
//             <div className='form-item'><strong>{(total * 1.18).toFixed(2)}</strong></div>
//           </div>

//       <button onClick={printBill}>
//         Print & Save Bill
//       </button>
      
//         </div>
//       </div>
//     </>
//   );
// };

// export default Hamburger;














import React, { useState, useEffect } from 'react';
import './Hamburger.css';
import logo from '../assests/logo.png'
import { jwtDecode } from 'jwt-decode';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0); // State to hold the total sum
  const [customerName, setCustomerName] = useState('');
const [contactNumber, setContactNumber] = useState('');


  useEffect(() => {
    fetchCategories();
  }, []);



  const resetForm = () => {
    setSelectedItems([]);
    setTotal(0);
  };
  

  


  const fetchCategories = async () => {
    try {
        const token = localStorage.getItem('jwtToken'); 
        const response = await fetch('http://localhost:8080/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });

        if (response.ok) {
            const data = await response.json();
            setCategories(data);
        } else if (response.status === 401) {
            console.error("Unauthorized access - please log in");
            
        } else {
            console.error("Failed to fetch categories");
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};


  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveMenu(null);
    setData([]);
    setSelectedItems([]);
    setTotal(0); 
  };

  const toggleSubmenu = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
      setData([]);
    } else {
      setActiveMenu(menu);
      fetchItemsByCategory(menu);
    }
  };

  

  const fetchItemsByCategory = async (category) => {
    try {
        const token = localStorage.getItem('jwtToken'); 
        const response = await fetch(`http://localhost:8080/FoodByCat/${category}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });

        if (response.ok) { 
            const data = await response.json();
            setData(data);
        } else if (response.status === 401) {
            console.error("Unauthorized access - please log in");
           
        } else {
            console.error(`Failed to fetch items for category ${category}`);
        }
    } catch (error) {
        console.error(`Error fetching items for category ${category}:`, error);
    }
};




  const renderSubmenuItems = () => {
    return data.map(item => (
      <li key={item.f_id} onClick={() => addSelectedItem(item)}>
        <button>{item.fname} Rs{item.price}</button>
      </li>
    ));
  };

  const addSelectedItem = (item) => {
    setSelectedItems(prevItems => {
      const existingItem = prevItems.find(i => i.f_id === item.f_id);
      if (existingItem) {
        const updatedItems = prevItems.map(i =>
          i.f_id === item.f_id ? { ...i, quantity: i.quantity + 1 } : i
        );
        updateTotal(updatedItems);
        return updatedItems;
      } else {
        const newItems = [...prevItems, { ...item, quantity: 1 }];
        updateTotal(newItems); 
        return newItems;
      }
    });
  };

  const updateQuantity = (item, amount) => {
    setSelectedItems(prevItems => {
      const updatedItems = prevItems.map(i =>
        i.f_id === item.f_id ? { ...i, quantity: Math.max(i.quantity + amount, 0) } : i
      ).filter(i => i.quantity > 0); 
      updateTotal(updatedItems); 
      return updatedItems;
    });
  };

  const updateTotal = (items) => {
    let totalSum = items.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
    setTotal(totalSum);
  };



  const printBill = async () => {
    // Get the JWT token
    const token = localStorage.getItem('jwtToken');
    
    // Decode the JWT token to get restaurant name
    const decodedToken = jwtDecode(token);
    const restaurantName = decodedToken.restaurantName; // Adjust the property name as per your JWT structure
    const restaurantAddress = "Shake-C Allience"; // Static address
    const gstRate = 0.18; 
    const gstAmount = total * gstRate;
    const totalIncludingGst = total + gstAmount;

    


  
    // Prepare bill content for printing
    const billContent = selectedItems.map(item => (
      `<div class="form-row">
         <div class="form-item">${item.fname}</div>
         <div class="form-item"> ${item.quantity}</div>
         <div class="form-item">  ${item.price}</div>
         <div class="form-item">  ${item.price * item.quantity}</div>
       </div>`
    )).join('');

    await saveBill(selectedItems, total);
   

    //-----------------

    const printWindow = window.open('', '_blank');
printWindow.document.open();
printWindow.document.write(`
  <html>
    <head>
      <title>Powered By Acceinfo</title>
      <style>
        @media print {
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            width: 80mm; /* width suitable for most thermal printers */
            font-size: 12px;
          }
          .powered-by {
            text-align: left;
            margin-bottom: 5px;
            font-weight: bold;
            font-size: 10px;
            padding-left: 10px; /* Adds some space from the left edge */
          }
          .form {
            padding: 10px;
            margin: 0;
          }
          .form-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          }
          .form-item {
            flex: 1;
            text-align: left;
            padding: 0 5px;
          }
          .form-item:last-child {
            text-align: right;
          }
          .restaurant-info {
            text-align: center;
            margin-bottom: 10px;
          }
          hr {
            border-top: 1px solid black;
          }
        }
      </style>
    </head>
    <body>
      <div class="powered-by">Powered By Acceinfo</div>
      <div class="restaurant-info">
        <div><strong>${restaurantName}</strong></div>
        <div>${restaurantAddress}</div>
      </div>
      <hr>
      <h2>Bill</h2>
      <div class="form">
        <div class="form-row">
          <div class="form-item">Items</div>
          <div class="form-item">Quantity</div>
          <div class="form-item">Price</div>
          <div class="form-item">Total</div>
        </div>
        <hr>
        ${billContent}
        <div class="form-row">
          <div class="form-item"><strong>Subtotal:</strong></div>
          <div class="form-item"></div>
          <div class="form-item"></div>
          <div class="form-item"><strong>${total}</strong></div>
        </div>
        <div class="form-row">
          <div class="form-item"><strong>GST (18%):</strong></div>
          <div class="form-item"></div>
          <div class="form-item"></div>
         <div class="form-item"><strong>${gstAmount.toFixed(2)}</strong></div>
        </div>
        <hr>
        <div class="form-row">
          <div class="form-item"><strong>Total:</strong></div>
          <div class="form-item"></div>
          <div class="form-item"></div>
         <div class="form-item"><strong>${totalIncludingGst.toFixed(2)}</strong></div>
        </div>
      </div>
      <script>window.print();</script>
    </body>
  </html>
`);
printWindow.document.close();


    //--------------




    
    
    // Create a new window for printing
    // const printWindow = window.open('', '_blank');
    // printWindow.document.open();
    // printWindow.document.write(`
    //   <html>
    //     <head>
    //       <title>Powered By Acceinfo</title>
    //       <style>
    //         @media print {
    //           body {
    //             font-family: Arial, sans-serif;
    //             margin: 0;
    //             padding: 0;
    //             width: 80mm; /* width suitable for most thermal printers */
    //             font-size: 12px;
    //           }
    //           .form {
    //             padding: 10px;
    //             margin: 0;
    //           }
    //           .form-row {
    //             display: flex;
    //             justify-content: space-between;
    //             margin-bottom: 5px;
    //           }
    //           .form-item {
    //             flex: 1;
    //             text-align: left;
    //             padding: 0 5px;
    //           }
    //           .form-item:last-child {
    //             text-align: right;
    //           }
    //           .restaurant-info {
    //             text-align: center;
    //             margin-bottom: 10px;
    //           }
    //           hr {
    //             border-top: 1px solid black;
    //           }
    //         }
    //       </style>
    //     </head>
    //     <body>
    //       <div class="restaurant-info">
    //         <div><strong>${restaurantName}</strong></div>
    //         <div>${restaurantAddress}</div>
    //       </div>
    //       <hr>
    //       <h2>Bill</h2>
    //       <div class="form">
    //         <div class="form-row">
    //           <div class="form-item">Items</div>
    //           <div class="form-item">Quantity</div>
    //           <div class="form-item">Price</div>
    //           <div class="form-item">Total</div>
    //         </div>
    //         <hr>
    //         ${billContent}
    //         <div class="form-row">
    //           <div class="form-item"><strong>Subtotal:</strong></div>
    //           <div class="form-item"></div>
    //           <div class="form-item"></div>
    //           <div class="form-item"><strong>${total}</strong></div>
    //         </div>
    //         <div class="form-row">
    //           <div class="form-item"><strong>GST (18%):</strong></div>
    //           <div class="form-item"></div>
    //           <div class="form-item"></div>
    //          <div class="form-item"><strong>${gstAmount.toFixed(2)}</strong></div>
    //         </div>
    //         <hr>
    //         <div class="form-row">
    //           <div class="form-item"><strong>Total:</strong></div>
    //           <div class="form-item"></div>
    //           <div class="form-item"></div>
    //          <div class="form-item"><strong>${totalIncludingGst.toFixed(2)}</strong></div>
    //         </div>
    //       </div>
    //       <script>window.print();</script>
    //     </body>
    //   </html>
    // `);
    // printWindow.document.close();






    // Reset the form after printing (if needed)
    resetForm();
    setCustomerName('');   
  setContactNumber(''); 


};

const saveBill = async (selectedItems, total) => {
  const token = localStorage.getItem('jwtToken');
  const decodedToken = jwtDecode(token);
  const restaurantName = decodedToken.restaurantName;
  const restaurantAddress = "Shake-C Allience"; // Static address
  const gstRate = 0.18;
  const gstAmount = total * gstRate;
  const totalIncludingGst = total + gstAmount;

  const billContent = selectedItems.map(item => ({
    itemName: item.fname,
    quantity: item.quantity,
    price: item.price,
    total: item.price * item.quantity,
  }));

  const billData = {
    restaurantName,
    restaurantAddress,
    items: billContent,
    subtotal: total,
    gst: gstAmount,
    total: totalIncludingGst,
    customerName,      
    contactNumber,
    // date: billDate,
  };

  try {
    const response = await fetch('http://localhost:8080/api/bills',  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(billData),
    });

    if (!response.ok) {
      throw new Error('Failed to save the bill');
    }

    console.log('Bill saved successfully');
  } catch (error) {
    console.error("Error saving bill:", error);
  }
};



   

  return (
    <>
      <div className='Nav'> 
        <img src={logo} alt="Logo"/>
        <h1>Acceinfo Billing Software</h1>
      </div>

      <div className="hamburger-menu">
        <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <nav className={`menu ${isOpen ? 'open' : ''}`}>
          <ul>
            {categories.map(category => (
              <li key={category}>
                <a href={`#${category}`} onClick={() => toggleSubmenu(category)}>{category}</a>
                <ul className={`submenu ${activeMenu === category ? 'open' : ''}`}>
                  {activeMenu === category && renderSubmenuItems()}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
        <div className='form'>
          <div className='form-header'>
            <div>Items</div>
            <div>Quantity</div>
            <div>Price</div>
            <div>Total</div>
          </div>
          {selectedItems.map(item => (
            <div className='form-row' key={item.f_id}>
              <div className='form-item'>{item.fname}</div>
              <div className='form-item quantity-control'>
                <button onClick={() => updateQuantity(item, -1)}>-</button>
                <input type="number" min="1" value={item.quantity} readOnly />
                <button onClick={() => updateQuantity(item, 1)}>+</button>
              </div>
              <div className='form-item'>{item.price}</div>
              <div className='form-item'>{item.price * item.quantity}</div>
            </div>
          ))}
          <div className='form-row'>
            <div className='form-item'><strong>Subtotal:</strong></div>
            <div className='form-item'></div>
            <div className='form-item'></div>
            <div className='form-item'><strong>{total}</strong></div>
          </div>
          <div className='form-row'>
            <div className='form-item'><strong>GST (18%):</strong></div>
            <div className='form-item'></div>
            <div className='form-item'></div>
            <div className='form-item'><strong>{(total * 0.18).toFixed(2)}</strong></div>
          </div>
          <div className='form-row'>
            <div className='form-item'><strong>Total:</strong></div>
            <div className='form-item'></div>
            <div className='form-item'></div>
            <div className='form-item'><strong>{(total * 1.18).toFixed(2)}</strong></div>
          </div>


          {/* form to save the Name and Contact */}

          <div className="contact-form">
  <label>
    Name:
    <input
      type="text"
      value={customerName}
      onChange={(e) => setCustomerName(e.target.value)}
      placeholder="Enter customer name"
    />
  </label>
  <label>
    Contact Number:
    <input
      type="text"
      value={contactNumber}
      onChange={(e) => setContactNumber(e.target.value)}
      placeholder="Enter contact number"
    />
  </label>
</div>

      <button onClick={printBill}>
        Print & Save Bill
      </button>
      
        </div>
      </div>
    </>
  );
};

export default Hamburger;
























