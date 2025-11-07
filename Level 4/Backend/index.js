import express from "express";
import cors from "cors";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.json({
    name: "Ayush",
    age: 24,
    message: "Hello from Express Server",
    status: "success",
  });
});

app.post("/" , (req, res)=>{
  console.log(req.body);
  res.json({success: true , message: "Data received successfully"})
})

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});
