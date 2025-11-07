import express from "express";
import cors from "cors";
let app = express();
app.use(express.json());
// Ye line bolti hai:
// “Express, agar koi request body me JSON data bheje (like { "name": "Ayush" }),
// to usko parse (samjho/convert) karke req.body me available kara de.”
app.use(cors());

let password = "Ayush@123";
app.use((req, res, next) => {
  if (req.body.pass !== password) {
      res.set({
        "x-name": "Ayush Singh",
        "x-age": 23
    })
    res.removeHeader("x-age");
    res.send("Password does not match");
  } else {
    next();
  }
});

const PORT = 3000;
app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ success: true, message: "Data received successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
