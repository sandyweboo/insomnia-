import express from 'express'
import { signup } from './controller/authController.js';

const app = express();
app.use(express.json());
app.use('/api/user',signup)
app.use((err, req, res, next)=>{
const statusCode = err.statusCode || 500;
const message = err.message || "internal server error";
res.status(statusCode).json({
    success : false,
    statusCode,
    message
})
})

app.listen(3000, () => {
  console.log("App running on port 3000");
});