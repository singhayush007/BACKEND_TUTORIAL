// import React from "react";
// import "./App.css";

// function App() {
//   // Async function inside component
//   async function getRes() {
//     try {
//       const response = await fetch("http://localhost:3000/");
//       const data = await response.json(); // await here
//       console.log(data);
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   return (
//     <>
//       <button onClick={getRes}>FETCH METHOD SEND</button>
//     </>
//   );
// }

// export default App;

// import React from "react";
// import "./App.css";
// import axios from "axios";
// function App() {
//   // Async function inside component
//   async function getRes() {
//     try {
//       const response = await axios("http://localhost:3000/");
//       const data = response.data;
//       console.log(data);
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   return (
//     <>
//       <button onClick={getRes}>AXIOS METHOD SEND</button>
//     </>
//   );
// }

// export default App;

import React, { useState } from "react";
import axios from "axios";
const App = () => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/", {
        username,
        age,
        email,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>SUBMIT DATA BY POST METHOD</button>
    </div>
  );
};

export default App;
