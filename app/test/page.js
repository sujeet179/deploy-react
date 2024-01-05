// 'use client'

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import PaymentModal from '../payment/page';


// const Billing = ({ tableId }) => {
//   const [categories, setCategories] = useState([]);
//   const [menus, setMenus] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [currentOrder, setCurrentOrder] = useState([]);
//   const [tableInfo, setTableInfo] = useState(null); // New state for table information
//   const [hotelInfo, setHotelInfo] = useState(null); // New state for hotel information
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
//   const [searchInput, setSearchInput] = useState('');
//   const searchInputRef = useRef(null); // Create a ref for the search input element
//   const firstMenuItemRef = useRef(null);
//   const menuItemRefs =useRef([])

//   const router = useRouter()

//   const handleKeyDown = useCallback((event) => {
//     if (event.key === 'Escape') {
//       // Redirect to the dashboard or any desired location
//       router.push('/bill');
//     }
//   }, [router]);

//   const handleSearchInputKeyDown = (event) => {
//     if (event.key === 'Tab') {
//       event.preventDefault(); // Prevent default tab behavior

//       // Set focus on the first menu item
//       const firstMenuItem = document.querySelector('.grid.grid-cols-3.gap-4.px-5.mt-5.overflow-scroll.h-1\\/3 > div:first-child');
//       if (firstMenuItem) {
//         firstMenuItem.focus();
//       }
//     }
//   };

//   const [paymentMethods, setPaymentMethods] = useState({
//     cash: false,
//     credit: false,
//     debit: false,
//     phonepay: false,
//     upi: false,
//   });

//   const handleCheckboxChange = (method) => {
//     setPaymentMethods((prevMethods) => ({
//       ...prevMethods,
//       [method]: !prevMethods[method],
//     }));
//   };

//   const filterMenus = (menu) => {
//     const searchTerm = searchInput.toLowerCase().trim();

//     // If the search term is empty, show all menus
//     if (searchTerm === '') {
//       return true;
//     }

//     // Check if the search term is a number
//     const searchTermIsNumber = !isNaN(searchTerm);

//     // If the search term is a number, filter based on menu's uniqueId
//     if (searchTermIsNumber) {
//       return menu.uniqueId === searchTerm;
//     }

//     // If the search term is not a number, filter based on menu's name
//     return menu.name.toLowerCase().includes(searchTerm);
//   };



//   const openPaymentModal = () => {
//     setIsPaymentModalOpen(true);
//   };


//   const saveBill = async () => {
//     try {
//       const orderData = {
//         tableId,
//         items: currentOrder.map((orderItem) => ({
//           name: orderItem.name,
//           quantity: orderItem.quantity,
//           price: orderItem.price,
//         })),
//         subtotal: calculateTotal().subtotal,
//         CGST: calculateTotal().CGST,
//         SGST: calculateTotal().SGST,
//         total: calculateTotal().total,
//       };

//       // Check if there's an existing bill for the current table
//       const existingBillResponse = await axios.get(`http://localhost:5000/api/order/order/${tableId}`);
//       const existingBill = existingBillResponse.data;

//       if (existingBill && existingBill.length > 0) {
//         // If an existing bill is found, get the orderId
//         const orderIdToUpdate = existingBill[0]._id;

//         // Update the existing order by orderId
//         const updateResponse = await axios.patch(`http://localhost:5000/api/order/update-order-by-id/${orderIdToUpdate}`, orderData);
//         console.log('Update Response:', updateResponse.data);
//       } else {
//         // If no existing bill is found, create a new one
//         const createResponse = await axios.post(`http://localhost:5000/api/order/order/${tableId}`, orderData);
//         console.log('Create Response:', createResponse.data);
//       }

//       // Save order to the local storage
//       const savedBills = JSON.parse(localStorage.getItem(`savedBills_${tableId}`)) || [];
//       savedBills.push(orderData);
//       localStorage.setItem(`savedBills_${tableId}`, JSON.stringify(savedBills));

//       // Optionally, you can reset the current order or perform other actions
//       setCurrentOrder([]);
//       router.push('/bill');
//     } catch (error) {
//       console.error('Error saving bill:', error);
//     }
//   };


//   const handlePrintBill = async () => {
//     try {
//       // Check if there's an existing bill for the current table
//       const existingBillResponse = await axios.get(`http://localhost:5000/api/order/order/${tableId}`);
//       const existingBill = existingBillResponse.data;

//       // Find the index of the first temporary order (if any)
//       const temporaryOrderIndex = existingBill.findIndex((order) => order.isTemporary);

//       // Use the tableId from the order data
//       const orderData = {
//         tableId: existingBill.tableId,
//         items: currentOrder.map((orderItem) => ({
//           name: orderItem.name,
//           quantity: orderItem.quantity,
//           price: orderItem.price,
//         })),
//         subtotal: calculateTotal().subtotal,
//         CGST: calculateTotal().CGST,
//         SGST: calculateTotal().SGST,
//         total: calculateTotal().total,
//         isTemporary: false, // Set isTemporary to false explicitly
//       };

//       if (temporaryOrderIndex !== -1) {
//         // If an existing temporary order is found, update it
//         const orderIdToUpdate = existingBill[temporaryOrderIndex]._id;
//         await axios.patch(`http://localhost:5000/api/order/update-order-by-id/${orderIdToUpdate}`, {
//           ...orderData,
//           isTemporary: false, // Ensure isTemporary is set to false in the update request
//         });
//       } else {
//         // If no existing temporary order is found, create a new one
//         await axios.post(`http://localhost:5000/api/order/order/${tableId}`, orderData);
//       }

//       // Remove the local storage item for the specific table
//       localStorage.removeItem(`savedBills_${tableId}`);

//       // await new Promise((resolve) => setTimeout(resolve, 500));
//       console.log("document ready for printing")

//       const printWindow = window.open('', '_blank');

//       if (!printWindow) {
//         alert("Please allow pop-ups to print the bill.");
//         return;
//       }

//       const printContent = `
//       <html>
//       <head>
//       <title>Bill</title>
//       <style>
//         body {
//           font-family: 'Arial', sans-serif;
//           margin: 0;
//           padding: 0;
//           background-color: #f4f4f4;
//         }
    
//         .container {
//           max-width: 800px;
//           margin: 20px auto;
//           background-color: #fff;
//           padding: 0px;
//           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//         }
    
//         .logo {
//           display: flex;
//           justify-content: center;
//           margin-bottom: 20px;
//         }
    
//         .logo img {
//           width: 100px;
//           height: 100px;
//           object-fit: cover;
//           border-radius: 50%;
//         }
    
//         .hotel-details h1 {
//           font-size: 24px;
//           font-weight: bold;
//           margin-bottom: 10px;
//         }
    
//         .hotel-details p {
//           font-size: 14px;
//           margin-bottom: 10px;
//         }
    
//         .table-details,
//         .contact-details {
//           font-size: 14px;
//           font-weight: bold;
//           margin-bottom: 10px;
//         }
    
//         .order-details {
//           margin-top: 20px;
//         }
    
//         .invoice-header {
//           text-align: center;
//           font-size: 20px;
//           font-weight: bold;
//           margin-bottom: 10px;
//         }
    
//         table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-top: 10px;
//         }
    
//         th,
//         td {
//           border: 1px solid #ddd;
//           padding: 8px;
//           text-align: left;
//         }
    
//         .total-section {
//           margin-top: 20px;
//         }
    
//         .total-section table {
//           margin-top: 10px;
//         }
    
//         .qr-code {
//           text-align: center;
//           margin-top: 20px;
//         }
    
//         .qr-code img {
//           width: 100px;
//           height: 100px;
//           object-fit: cover;
        
//         }
//         .order-details {
//           max-width: 600px;
//           margin: 0 auto;
//           padding: 20px;
//           border: 1px solid #ccc;
//           border-radius: 8px;
//           font-family: 'Arial', sans-serif;
//         }
        
//         .invoice-header {
//           color: #333;
//         }
        
//         table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-top: 20px;
//         }
        
//         table th, table td {
//           border: 2px solid black;
//           padding: 8px;
//           text-align: left;
//         }
        
//         .total-section {
//           margin: 20px auto;
//           text-align: center;
//         }
        
//         .total-section table {
//           width: 50%;
//           margin: 0 auto;
//         }
        
//         .total-section td {
//           padding: 8px;
//           font-weight: bold;
//         }
        
//         .thank-you {
//           font-weight: bold;
//           text-align: center;
//         }
     
//       </style>
//     </head>

// <body>
//   <!-- Your specific JSX code for printing -->
//   <div class="container">
//     <div class="logo">
//       ${hotelInfo && hotelInfo.hotelLogo && (
//           `<img src="http://localhost:5000/${hotelInfo.hotelLogo}" alt="Hotel Logo" />`
//         )}
//     </div>
//     <div class="hotel-details">
//       <h1>${hotelInfo ? hotelInfo.hotelName : 'Hotel Not Found'}</h1>
//       <p>${hotelInfo ? hotelInfo.address : 'Hotel Not Found'}</p>
//     </div>
//     <div class="table-details">Table No: ${tableInfo ? tableInfo.tableName : 'Table Not Found'}</div>
//     <div class="contact-details">
//       FSSAI NO: ${hotelInfo ? hotelInfo.fssaiNo : 'Fssai not found'} |
//       SAC NO: ${hotelInfo ? hotelInfo.sacNo : 'Fssai not found'} |
//       MOBILE NO: ${hotelInfo ? hotelInfo.contactNo : 'Fssai not found'}
//     </div>

//     <!-- Order Details -->
//     <div class="order-details">
//       <h2 class="invoice-header">Invoice</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Sr No</th>
//             <th>Menu Name</th>
//             <th>Qty</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${currentOrder.map((orderItem, index) => (
//           `<tr key=${orderItem._id}>
//               <td>${index + 1}</td>
//               <td>${orderItem.name}</td>
//               <td>${orderItem.quantity}</td>
//               <td>${`₹${(orderItem.price * orderItem.quantity).toFixed(2)}`}</td>
//             </tr>`
//         ))}
//         </tbody>
//       </table>

//       <!-- Total Section -->
//       <div class="total-section">
//         <table>
//           <tbody>
//             <tr>
//               <td>Subtotal</td>
//               <td>${`₹${calculateTotal().subtotal}`}</td>
//             </tr>
//             <tr>
//               <td>CGST</td>
//               <td>${`₹${calculateTotal().CGST}`}</td>
//             </tr>
//             <tr>
//               <td>SGST</td>
//               <td>${`₹${calculateTotal().SGST}`}</td>
//             </tr>
//             <tr>
//               <td>Total</td>
//               <td>${`₹${calculateTotal().total}`}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>

//     <div class="qr-code">
//       ${hotelInfo && hotelInfo.qrCode && (
//           `<img src="http://localhost:5000/${hotelInfo.qrCode}" alt="QR Code" />`
//         )}
//     </div>
//     <div class="thank-you">Thank You! Visit Again !!!</div>
//   </div>
// </body>

// </html>
//     `;

//       // Write the content to the new window or iframe
//       printWindow.document.write(printContent);

//       // Trigger the print action
//       printWindow.document.close();
//       printWindow.print();

//       // Close the print window or iframe after printing
//       printWindow.close();

//       // Open the payment modal after printing
//       openPaymentModal();
//     } catch (error) {
//       console.error('Error preparing order:', error);
//     }
//   };

//   const handleAfterPrint = () => {
//     window.removeEventListener('afterprint', handleAfterPrint)
//     window.close()
//   }


//   const generateKOTData = (product) => {
//     return `${product.name} - ${product.quantity}`;
//   };

//   const addToOrder = useCallback((product) => {
//     console.log('Adding to order:', product);

//     // Generate KOT data
//     const kotData = generateKOTData(product);
//     console.log('KOT Data:', kotData);

//     // Update the current order
//     setCurrentOrder((prevOrder) => {
//       const existingItem = prevOrder.find((item) => item.name === product.name);

//       if (existingItem) {
//         console.log('Adding to existing item:', existingItem);
//         const updatedOrder = prevOrder.map((item) =>
//           item.name === existingItem.name ? { ...item, quantity: item.quantity + 1 } : item
//         );
//         console.log('Updated Order:', updatedOrder);
//         return updatedOrder;
//       } else {
//         console.log('Adding new item:', product);
//         return [...prevOrder, { ...product, quantity: 1 }];
//       }
//     });

//     // Optionally, you can trigger the KOT print here or use the `kotData` as needed.
//   }, [setCurrentOrder]);


//   const handleKOTPrint = () => {
//     const kotData = currentOrder.map((product) => generateKOTData(product)).join('\n');

//     // Open a new window for KOT print
//     const kotPrintWindow = window.open('', '_blank');
//     kotPrintWindow.document.write('<html><head><title>KOT Print</title></head><body>');
//     kotPrintWindow.document.write('<pre>' + kotData + '</pre>');
//     kotPrintWindow.document.write('</body></html>');
//     kotPrintWindow.document.close();

//     // Optionally, you can add styles or additional content to the KOT print page.
//     kotPrintWindow.print();
//   };



//   const removeFromOrder = (product) => {
//     setCurrentOrder((prevOrder) => {
//       const existingItem = prevOrder.find((item) => item.name === product.name);

//       if (existingItem) {
//         const updatedOrder = prevOrder.map((item) =>
//           item.name === existingItem.name
//             ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 }
//             : item
//         );

//         // Filter out items with quantity greater than 0
//         const filteredOrder = updatedOrder.filter((item) => item.quantity > 0);

//         return filteredOrder;
//       } else {
//         console.log('Item not found in order:', product);
//         return prevOrder;
//       }
//     });
//   };



//   useEffect(() => {

//     if (searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//     // Fetch categories
//     axios.get('http://localhost:5000/api/main')
//       .then(response => {
//         setCategories(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching categories:', error);
//       });

//     // Fetch products
//     axios.get('http://localhost:5000/api/menu/menus/list')
//       .then(response => {
//         console.log(response.data);
//         const menusArray = response.data; // Ensure menus is an array
//         setMenus(menusArray);
//       })
//       .catch(error => {
//         console.error('Error fetching products:', error);
//       });

//     if (tableId) {
//       axios.get(`http://localhost:5000/api/table/tables/${tableId}`)
//         .then(response => {
//           setTableInfo(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching table information:', error);
//         });
//     }

//     const hotelId = '65798094e013bdaca198016c';
//     axios.get(`http://localhost:5000/api/hotel/get/${hotelId}`)
//       .then(response => {
//         console.log(response.data)
//         setHotelInfo(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching hotel information:', error);
//       });


//     const savedBills = JSON.parse(localStorage.getItem(`savedBills_${tableId}`)) || [];
//     if (savedBills.length > 0) {
//       // Assuming you want to load the latest saved bill
//       const latestOrder = savedBills[savedBills.length - 1];
//       setCurrentOrder(latestOrder.items || []); // Initialize currentOrder with the saved items
//     }

//     const handleTabPress = (event) => {
//       if (event.key === 'Tab' && firstMenuItemRef.current) {
//         event.preventDefault();
//         firstMenuItemRef.current.focus();
//       }
//     };

//     document.addEventListener('keydown', handleTabPress);

//     // Remove the event listener when the component unmounts
//     return () => {
//       document.removeEventListener('keydown', handleTabPress);
//     };
//   }, [tableId, handleKeyDown]);
//   // }, [tableId]);

//   useEffect(() => {
//     // Fetch menus based on the selected category
//     if (selectedCategory) {
//       axios.get(`http://localhost:5000/api/menu/${selectedCategory._id}`)
//         .then(response => {
//           console.log(response.data);
//           const menusArray = response.data || []; // Ensure menus is an array
//           setMenus(menusArray);
//         })
//         .catch(error => {
//           console.error('Error fetching menus:', error);
//         });
//     }
//   }, [selectedCategory]);


//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);

//     // If the category is null (All items), fetch all menus
//     if (category === null) {
//       axios.get('http://localhost:5000/api/menu/menus/list')
//         .then(response => {
//           setMenus(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching menus:', error);
//         });
//     } else {
//       // Fetch menus based on the selected category
//       axios.get(`http://localhost:5000/api/menu/menulist/${category._id}`)
//         .then(response => {
//           setMenus(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching menus:', error);
//         });
//     }
//   };

//   const calculateTotal = () => {
//     const subtotal = currentOrder.reduce((acc, orderItem) => acc + orderItem.price * orderItem.quantity, 0);
//     // const discount = 5.00; // You can replace this with your discount logic
//     const GSTRate = 0.025; // GST rate of 2.5%
//     const CGST = GSTRate * subtotal; // Central GST
//     const SGST = GSTRate * subtotal; // State GST
//     const total = subtotal + CGST + SGST;
//     const totalQuantity = currentOrder.reduce((acc, orderItem) => acc + orderItem.quantity, 0);

//     return {
//       subtotal: subtotal.toFixed(2),
//       SGST: SGST.toFixed(2),
//       CGST: CGST.toFixed(2),
//       total: total.toFixed(2),
//       totalQuantity: totalQuantity, // Add total quantity

//     };
//   };

//   const handleMenuItemKeyDown = (event, product) => {
//     if (event.key === 'Enter') {
//       addToOrder(product);

//     } else if (event.key === 'Tab') {
//       event.preventDefault();
//       const firstMenuItem = menuItemRefs.current[0];
//       if (firstMenuItem) {
//         firstMenuItem.focus();
//       }
//     } else if (event.key === 'Backspace') {
//       event.preventDefault();
//       removeFromOrder(product);
//     }
//   };


//   return (
//     <div className='bg-gray-500'>
//       {/* <!-- component --> */}
//       <div className="container mx-auto px-5 bg-white">
//         <div className="flex lg:flex-row flex-col-reverse shadow-lg">
//           {/* <!-- left section --> */}
//           <div className="w-full lg:w-3/5 min-h-screen shadow-lg ">
//             {/* <!-- header --> */}
//             <div className="flex flex-row justify-between items-center px-5 mt-5">
//               <div className="text-gray-800">
//                 <div className="font-bold text-xl">Le-Meridien</div>
//                 <span className="text-xs">Location ID#SATARA_415002</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="text-sm text-center mr-4">
//                   <div className="font-light text-gray-500">last synced</div>
//                   <span className="font-semibold">2 mins ago</span>
//                 </div>
//                 <div>
//                   <Link href={'/bill'} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded">
//                     Home
//                   </Link>

//                 </div>
//               </div>
//             </div>
//             {/* <!-- end header --> */}

//             {/* <!-- categories --> */}
//             <div className="mt-5 flex flex-row px-5 overflow-x-auto whitespace-nowrap">
//               <span
//                 key="all-items"
//                 className={`cursor-pointer px-5 py-1 rounded-2xl text-sm font-semibold mr-4 ${selectedCategory === null ? 'bg-yellow-500 text-white' : ''}`}
//                 onClick={() => handleCategoryClick(null)}
//               >
//                 All Menu
//               </span>
//               {categories.map(category => (
//                 <span
//                   key={category._id}
//                   className={`whitespace-nowrap cursor-pointer px-5 py-1 rounded-2xl text-sm font-semibold ${selectedCategory === category ? 'bg-yellow-500 text-white' : ''}`}
//                   onClick={() => handleCategoryClick(category)}
//                 >
//                   {category.name}
//                 </span>
//               ))}
//             </div>

//             <div className="mt-5 flex justify-end px-5">
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder="Search Menu..."
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//                 onKeyDown={handleSearchInputKeyDown}
//                 className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500"
//               />

//             </div>
//             {/* <!-- end categories --> */}
//             {/* <!-- products --> */}
//             <div className="cursor-pointer grid grid-cols-3 gap-4 px-5 mt-5 overflow-scroll h-96">
//               {(menus.menus || menus)
//                 .filter(filterMenus) // Apply the filterMenus function
//                 .map((product, index) => (
//                   <div
//                     key={product._id}
//                     className="px-3 py-3 flex flex-col border border-gray-200 rounded-md h-32 justify-between"
//                     onClick={() => addToOrder(product)}
//                     tabIndex={0}
//                     ref={(el) => (index === 0 ? (firstMenuItemRef.current = el) : null)}
//                     onKeyDown={(e) => handleMenuItemKeyDown(e, product)} // Handle keydown event                
//                   >
//                     <div>
//                       <div className="font-bold text-gray-800">{product.name}</div>
//                       <span className="font-light text-sm text-gray-400">{product.description}</span>
//                       <div className="font-light text-sm text-gray-400">{`UniqueId: ${product.uniqueId}`}</div>
//                     </div>
//                     <div className="flex flex-row justify-between items-center">
//                       <span className="self-end font-bold text-lg text-yellow-500">{`₹${product.price}`}</span>
//                       <img
//                         src={`/menum.jpeg`}
//                         className="h-14 w-14 object-cover rounded-md"
//                         alt=""
//                       />
//                     </div>
//                   </div>
//                 ))}
//             </div>
//             {/* <!-- end products --> */}
//           </div>
//           {/* <!-- end left section --> */}


//           {/* <!-- right section --> */}
//           <div className="w-full lg:w-2/5 mt-5">
//             {/* <!-- header --> */}
//             <div className="flex flex-row items-center justify-between px-5 mt-5">
//               <div className="font-bold text-xl">Current Order</div>
//               <div className="font-semibold">
//                 <span className="px-4 py-2 rounded-md bg-red-100 text-red-500">Clear All</span>
//                 <span className="px-4 py-2 rounded-md bg-gray-100 text-gray-800">Setting</span>
//               </div>
//             </div>
//             {/* <!-- end header --> */}
//             {/* <!-- order list --> */}
//             <div className="px-5 py-4 mt-5 overflow-y-auto h-64">
//               {currentOrder.map((orderItem) => (
//                 <div key={orderItem._id} className="flex flex-row justify-between items-center mb-4">
//                   <div className="flex flex-row items-center w-2/5">
//                     <div className="flex items-center h-full">
//                       <img
//                         // src={`http://localhost:5000/${orderItem.imageUrl}`}
//                         src={`/menum.jpeg`}
//                         className="w-10 h-10 object-cover rounded-md"
//                         alt=""
//                       />
//                       <span className="ml-4 font-semibold text-sm">{orderItem.name}</span>
//                     </div>
//                   </div>
//                   <div className="w-32 flex justify-between">
//                     <span
//                       className="px-3 py-1 rounded-md bg-gray-300 cursor-pointer"
//                       onClick={() => removeFromOrder(orderItem)}
//                     >
//                       -
//                     </span>
//                     <span className="font-semibold mx-4">{orderItem.quantity}</span>
//                     <span
//                       className="px-3 py-1 rounded-md bg-gray-300 cursor-pointer"
//                       onClick={() => addToOrder(orderItem)}
//                     >
//                       +
//                     </span>
//                   </div>
//                   <div className="font-semibold text-lg w-16 text-center">
//                     {`₹${(orderItem.price * orderItem.quantity).toFixed(2)}`}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* <!-- end order list --> */}
//             {/* <!-- totalItems --> */}
//             <div className="px-5 mt-5">
//               <div className="py-4 rounded-md shadow-lg">
//                 <div className="px-4 flex justify-between ">
//                   <span className="font-semibold text-sm">Subtotal</span>
//                   <span className="font-bold">₹{calculateTotal().subtotal}</span>
//                 </div>
//                 {/* <div className="px-4 flex justify-between ">
//                     <span className="font-semibold text-sm">Discount</span>
//                     <span className="font-bold">- ₹{calculateTotal().discount}</span>
//                   </div> */}
//                 <div className="px-4 flex justify-between ">
//                   <span className="font-semibold text-sm">CGST</span>
//                   <span className="font-bold">₹{calculateTotal().CGST}</span>
//                 </div>
//                 <div className="px-4 flex justify-between ">
//                   <span className="font-semibold text-sm">SGST</span>
//                   <span className="font-bold">₹{calculateTotal().SGST}</span>
//                 </div>
//                 <div className="border-t-2 mt-3 py-2 px-4 flex items-center justify-between">
//                   <span className="font-semibold text-2xl">Total</span>
//                   <span className="font-bold text-2xl">₹{calculateTotal().total}</span>
//                 </div>
//               </div>
//             </div>
//             {/* <!-- end total --> */}
//             <div className="px-5 mt-5 text-left text-sm text-gray-500 font-sans font-semibold">
//               Total Items: {calculateTotal().totalQuantity}
//             </div>

//             {/* <!-- button pay--> */}
//             <div className="flex px-5 mt-2 justify-between">
//               <div
//                 className="px-8 py-2 rounded-md shadow-lg text-center bg-green-500 text-white font-semibold cursor-pointer text-sm"
//                 onClick={saveBill}
//               >
//                 Waiting Bill
//               </div>
//               <div
//                 className="px-8 py-2 rounded-md shadow-lg text-center bg-green-500 text-white font-semibold cursor-pointer text-sm"
//                 onClick={handleKOTPrint}

//               >
//                 KOT
//               </div>

//               <div
//                 className="px-8 py-2 rounded-md shadow-lg text-center bg-yellow-500 text-white font-semibold cursor-pointer text-sm"
//                 onClick={handlePrintBill}
//               >
//                 Print Bill
//               </div>
//             </div>

//             {/* <PrintOnlyContent
//               hotelInfo={hotelInfo}
//               tableInfo={tableInfo}
//               currentOrder={currentOrder}
//               calculateTotal={calculateTotal}
//             /> */}

//             {isPaymentModalOpen && (
//               <PaymentModal
//                 onClose={() => setIsPaymentModalOpen(false)}
//                 tableName={tableInfo ? tableInfo.tableName : 'Table Not Found'}
//                 totalAmount={calculateTotal().total} // Pass the total amount as a prop
//                 // paymentMethods={paymentMethods} // Pass the paymentMethods state
//                 paymentMethods={['cash', 'credit', 'debit', 'phonepay', 'upi']}
//                 handleCheckboxChange={handleCheckboxChange} // Pass the handleCheckboxChange function
//                 tableId={tableId}

//               />
//             )}

//           </div>
//           {/* <!-- end right section --> */}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Billing