// import express from "express";

// const app = express();
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({
//     message: "This is Level 3 of my backend learning journey!",
//     name: "Ayush",
//     age: 24,
//   });
// });

// app.post("/data", (req, res) => {
//   const receivedData = req.body;
//   console.log("Received data:", receivedData);
//   // res.send({ message: "Data received successfully" });
//   let body = req.body;
//   console.log(body);
//   res.send(body);
// });

// app.listen(5000, () => {
//   console.log("Server is listening on port 5000");
// });

import express from "express";

const users = [
  {
    id: 101,
    name: "Ayush Singh",
    email: "ayush@example.com",
    position: "Software Developer",
    department: "IT",
    salary: 50000,
    joiningDate: "2024-07-01",
  },
  {
    id: 102,
    name: "Pankhudi Sharma",
    email: "pankhudi@example.com",
    position: "Frontend Developer",
    department: "IT",
    salary: 45000,
    joiningDate: "2024-08-15",
  },
  {
    id: 103,
    name: "Rohit Verma",
    email: "rohit@example.com",
    position: "Backend Developer",
    department: "IT",
    salary: 48000,
    joiningDate: "2023-12-10",
  },
  {
    id: 104,
    name: "Sneha Kapoor",
    email: "sneha@example.com",
    position: "UI/UX Designer",
    department: "Design",
    salary: 40000,
    joiningDate: "2024-03-20",
  },
  {
    id: 105,
    name: "Ankit Mehra",
    email: "ankit@example.com",
    position: "QA Engineer",
    department: "QA",
    salary: 42000,
    joiningDate: "2024-01-05",
  },
];

const app = express();
app.use(express.json());

// Get all users
app.get("/user", (req, res) => {
  res.json(users);
});

// Get user by id
app.get("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existingUser = users.find((user) => user.id === id);

  if (existingUser) {
    res.json(existingUser);
  } else {
    res.json({ message: "User not found" });
  }
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});

app.get("/search", (req, res) => {
  console.log(req.query);
  res.json(req.query);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});


