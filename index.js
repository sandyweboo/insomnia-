import express from 'express'
import { signup , signin} from './controller/authController.js';
import mongoose from 'mongoose';


mongoose.connect('mongodb://localhost:27017/mern-blog').then(()=>{
    console.log("db connection succesfull")
})
const app = express();
app.use(express.json());
app.use('/api/user/signup', signup);
app.use('/api/user/signin', signin);

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
  console.log("App running on port 3000!");
});