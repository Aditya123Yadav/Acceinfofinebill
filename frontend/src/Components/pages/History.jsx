




// import React, { useEffect, useState } from 'react';

// const History = () => {
//   const [bills, setBills] = useState([]);

//   useEffect(() => {
//     fetchBills();
//   }, []);



//   const fetchBills = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/api/allbills', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, // Send JWT token for authentication
//         }
//       });
  
//       const textResponse = await response.text();  // Get raw text response for debugging
//       console.log('Raw response:', textResponse);  // Log the raw response
  
//       try {
//         const data = JSON.parse(textResponse);  // Attempt to parse the response as JSON
//         setBills(data);  // Set the bills if parsing is successful
//       } catch (jsonError) {
//         console.error('Error parsing JSON:', jsonError);
//       }
//     } catch (error) {
//       console.error('Error fetching bills:', error);
//     }
//   };


//   return (
//     <div>
//       <h1>Billing History</h1>
//       {bills.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Items</th>
//               <th>Total</th>
//               <th>GST</th>
//               <th>Final Total</th>
//               <th>Date</th>
//             </tr>
//           </thead>



//           <tbody>
//     {bills.map((bill, index) => (
//       <tr key={index}>
//         <td>{bill.orderId}</td>
//         <td>
//           <ul>
//             {bill.items.map((item, idx) => (
//               <li key={idx}>
//                 {item.itemName} - Qty: {item.quantity}, Price: {item.price}
//               </li>
//             ))}
//           </ul>
//         </td>
//         <td>{bill.total}</td>
//         <td>{bill.gst}</td>
//         <td>{bill.finalTotal}</td>
//         <td>{new Date(bill.date).toLocaleDateString()}</td> {/* Adjust date format as needed */}
//       </tr>
//     ))}
//   </tbody>


         


//         </table>
//       ) : (
//         <p>No billing history available.</p>
//       )}
//     </div>
//   );
// };

// export default History;



//---------------wihtout filter date is working fine---------------

// import React, { useEffect, useState } from 'react';
// import './History.css';

// const History = () => {
//   const [bills, setBills] = useState([]);

//   useEffect(() => {
//     fetchBills();
//   }, []);

//   const fetchBills = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/api/allbills', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
//         }
//       });

//       const textResponse = await response.text();
//       console.log('Raw response:', textResponse);

//       try {
//         const data = JSON.parse(textResponse);
//         setBills(data);
//       } catch (jsonError) {
//         console.error('Error parsing JSON:', jsonError);
//       }
//     } catch (error) {
//       console.error('Error fetching bills:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Billing History</h1>
//       {bills.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Items</th>
//               <th>Total</th>
//               <th>GST</th>
//               <th>Final Total</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bills.map((bill, index) => (
//               <tr key={index}>
//                 <td>{bill.orderId}</td>
//                 <td>
//                   <ul>
//                     {bill.items.map((item, idx) => (
//                       <li key={idx}>
//                         {item.itemName} - Qty: {item.quantity}, Price: {item.price}
//                       </li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td>{bill.total}</td>
//                 <td>{bill.gst}</td>
//                 <td>{bill.finalTotal}</td>
//                 <td>{new Date(bill.date).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No billing history available.</p>
//       )}
//     </div>
//   );
// };

// export default History;


//-------------start and end date------------------

// import React, { useEffect, useState } from 'react';
// import './History.css';

// const History = () => {
//   const [bills, setBills] = useState([]);
//   const [filteredBills, setFilteredBills] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   useEffect(() => {
//     fetchBills();
//   }, []);

//   useEffect(() => {
//     filterBills();
//   }, [startDate, endDate, bills]);

//   const fetchBills = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/api/allbills', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
//         }
//       });

//       const textResponse = await response.text();
//       console.log('Raw response:', textResponse);

//       try {
//         const data = JSON.parse(textResponse);
//         setBills(data);
//         setFilteredBills(data);  // Set initial filtered bills to all bills
//       } catch (jsonError) {
//         console.error('Error parsing JSON:', jsonError);
//       }
//     } catch (error) {
//       console.error('Error fetching bills:', error);
//     }
//   };

//   const filterBills = () => {
//     if (startDate && endDate) {
//       const filtered = bills.filter(bill => {
//         const billDate = new Date(bill.date);
//         const start = new Date(startDate);
//         const end = new Date(endDate);
//         return billDate >= start && billDate <= end;
//       });
//       setFilteredBills(filtered);
//     } else {
//       setFilteredBills(bills);  // If no dates are selected, show all bills
//     }
//   };

//   return (
//     <div>
//       <h1>Billing History</h1>

//       {/* Date filter inputs */}
//       <div className="filter">
//         <label>
//           Start Date: 
//           <input 
//             type="date" 
//             value={startDate} 
//             onChange={(e) => setStartDate(e.target.value)} 
//           />
//         </label>
//         <label>
//           End Date: 
//           <input 
//             type="date" 
//             value={endDate} 
//             onChange={(e) => setEndDate(e.target.value)} 
//           />
//         </label>
//       </div>

//       {filteredBills.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Items</th>
//               <th>Total</th>
//               <th>GST</th>
//               <th>Final Total</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredBills.map((bill, index) => (
//               <tr key={index}>
//                 <td>{bill.orderId}</td>
//                 <td>
//                   <ul>
//                     {bill.items.map((item, idx) => (
//                       <li key={idx}>
//                         {item.itemName} - Qty: {item.quantity}, Price: {item.price}
//                       </li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td>{bill.total}</td>
//                 <td>{bill.gst}</td>
//                 <td>{bill.finalTotal}</td>
//                 <td>{new Date(bill.date).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No billing history available.</p>
//       )}
//     </div>
//   );
// };

// export default History;


//--------------------------only one date-------------------


// import React, { useEffect, useState } from 'react';
// import './History.css';

// const History = () => {
//   const [bills, setBills] = useState([]);
//   const [filteredBills, setFilteredBills] = useState([]);
//   const [selectedDate, setSelectedDate] = useState('');

//   useEffect(() => {
//     fetchBills();
//   }, []);

//   useEffect(() => {
//     filterBills();
//   }, [selectedDate, bills]);

//   const fetchBills = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/api/allbills', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
//         }
//       });

//       const textResponse = await response.text();
//       console.log('Raw response:', textResponse);

//       try {
//         const data = JSON.parse(textResponse);
//         setBills(data);
//         setFilteredBills(data);  // Set initial filtered bills to all bills
//       } catch (jsonError) {
//         console.error('Error parsing JSON:', jsonError);
//       }
//     } catch (error) {
//       console.error('Error fetching bills:', error);
//     }
//   };

//   const filterBills = () => {
//     if (selectedDate) {
//       const filtered = bills.filter(bill => {
//         const billDate = new Date(bill.date);
//         const selected = new Date(selectedDate);
//         // Set the time to 00:00:00 for both dates to compare only the date part
//         billDate.setHours(0, 0, 0, 0);
//         selected.setHours(0, 0, 0, 0);
//         return billDate.getTime() === selected.getTime();
//       });
//       setFilteredBills(filtered);
//     } else {
//       setFilteredBills(bills);     
//     }
//   };

//   return (
//     <div>
//       <h1>Billing History</h1>

//       {/* Date filter input */}
//       <div className="filter">
//         <label>
//           Select Date: 
//           <input 
//             type="date" 
//             value={selectedDate} 
//             onChange={(e) => setSelectedDate(e.target.value)} 
//           />
//         </label>
//       </div>

//       {filteredBills.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Items</th>
//               <th>Total</th>
//               <th>GST</th>
//               <th>Final Total</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredBills.map((bill, index) => (
//               <tr key={index}>
//                 <td>{bill.orderId}</td>
//                 <td>
//                   <ul>
//                     {bill.items.map((item, idx) => (
//                       <li key={idx}>
//                         {item.itemName} - Qty: {item.quantity}, Price: {item.price}
//                       </li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td>{bill.total}</td>
//                 <td>{bill.gst}</td>
//                 <td>{bill.finalTotal}</td>
//                 <td>{new Date(bill.date).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No billing history available.</p>
//       )}
//     </div>
//   );
// };

// export default History;



// --------------with name and contact---------


import React, { useEffect, useState } from 'react';
import './History.css';

const History = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    fetchBills();
  }, []);

  useEffect(() => {
    filterBills();
  }, [selectedDate, bills]);

  const fetchBills = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/allbills', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        }
      });

      const textResponse = await response.text();
      console.log('Raw response:', textResponse);

      try {
        const data = JSON.parse(textResponse);
        setBills(data);
        setFilteredBills(data);  // Set initial filtered bills to all bills
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
      }
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };

  const filterBills = () => {
    if (selectedDate) {
      const filtered = bills.filter(bill => {
        const billDate = new Date(bill.date);
        const selected = new Date(selectedDate);
        // Set the time to 00:00:00 for both dates to compare only the date part
        billDate.setHours(0, 0, 0, 0);
        selected.setHours(0, 0, 0, 0);
        return billDate.getTime() === selected.getTime();
      });
      setFilteredBills(filtered);
    } else {
      setFilteredBills(bills);     
    }
  };

  return (
    <div>
      <h1>Billing History</h1>

      {/* Date filter input */}
      <div className="filter">
        <label>
          Select Date: 
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)} 
          />
        </label>
      </div>

      {filteredBills.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Items</th>
              <th>Total</th>
              <th>GST</th>
              <th>Final Total</th>
              <th>Date</th>
              <th>Customer Name</th>  {/* New Customer Name column */}
              <th>Contact Number</th>  {/* New Contact Number column */}
            </tr>
          </thead>
          <tbody>
            {filteredBills.map((bill, index) => (
              <tr key={index}>
                <td>{bill.orderId}</td>
                <td>
                  <ul>
                    {bill.items.map((item, idx) => (
                      <li key={idx}>
                        {item.itemName} - Qty: {item.quantity}, Price: {item.price}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{bill.total}</td>
                <td>{bill.gst}</td>
                <td>{bill.finalTotal}</td>
                <td>{new Date(bill.date).toLocaleDateString()}</td>
                <td>{bill.customerName}</td> {/* Display customer name */}
                <td>{bill.contactNumber}</td> {/* Display contact number */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No billing history available.</p>
      )}
    </div>
  );
};

export default History;

