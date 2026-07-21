import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import logRoutes from './routes/logRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app=express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://logs-dashboard-y65u.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json())

app.get('/health', (req, res)=>{
    res.json({status:'ok', timestamp:new Date()})
})

app.use('/api/logs', logRoutes);
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MongoDb conencted');
    app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
})
.catch((err)=>console.log(err))
