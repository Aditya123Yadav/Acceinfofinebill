// import React, { useState } from "react";
// import "./LoginSignup.css";
// import user_icon from "../Components/assests/person.jpg";
// import email_icon from "../Components/assests/gmaillogo.jpg";
// import password_icon from "../Components/assests/passward.jpg";
// import GST_icon from "../Components/assests/gst-icon.jpg";
// import {useNavigate} from 'react-router-dom';
// import { HttpStatusCode } from "axios";
// <link href="https://fonts.googleapis.com/css?family=Bungee+Inline" rel="stylesheet"></link>

// const LoginSignup = () => {
//   const [username, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate()

//   const handleLogin = async (e) => {
//     e.preventDefault();
//    try {
//     const response = await fetch('http://localhost:8080/login', {
//         method:'Post',
//         headers:{
//             'Content-Type' :'application/json'
//         },
//         body:JSON.stringify({username,password})
//     })



//   //   const data= await response.Json
//   //   console.log("hi",data)
//   //   if(HttpStatusCode.ok){
//   //       navigate('/Service')
        
//   //   }
//   //   else
//   //   {console.log(error)}
  

//   //  } catch (error) {
//   //   console.log('error',TypeError)
//   //  }
//   // };



//   if (response.ok) {
//     const data = await response.json();
//     console.log("hi", data);
//     navigate('/Service');
//   } else {
//     console.log("Login failed:", response.status);
//   }
// } catch (error) {
//   console.log('Error:', error);
// }
// };




//   return (
//     <div className="Container">
//       <div className="header">
//         <div className="text">Login Page</div>
//         <div className="underline"></div>
//       </div>

//       <form onSubmit={handleLogin}>
//       <div>
//         <label>Email:</label>
//         <input
//           type="email"
//           value={username}
//           onChange={(e) => setUserName(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Login</button>
//     </form>
//     </div>
//   );
// };

// export default LoginSignup;



import React, { useState } from "react";
import "./LoginSignup.css";
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });


      if (response.ok) {
        const token = await response.text(); // JWT token is plain text
        console.log("Login successful:", token);
        localStorage.setItem('jwtToken', token); // Store the token
        navigate('/Service');

      // if (response.ok) {
      //   const data = await response.json();
      //   console.log("Login successful:", data);
      //   navigate('/Service');
      
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Login failed");
      }
    } catch (error) {
      console.log('Error:', error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="Container">
      <div className="header">
        <div className="text">Login Page</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginSignup;







