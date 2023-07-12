import express from 'express';
import "dotenv/config";
import cors from 'cors';
import AdminRoutes from './routes/admin.routes.js';
//initialized express
const app = express();

// SERVER PORT
const PORT = process.env.PORT || 5000;

// CORS
app.use(cors());

// accept JSONS
app.use(express.json());

// config the urlEncoded middleware
app.use(express.urlencoded({extended : false}));

app.use((req,res,next)=>{
    console.log(`${req.method} =====> URL: ${req.url}`);
    next();
});

// root end point
app.get("/",(req,res)=>{
    res.send("Welcome to Battery Shop!"); 
});

app.use('/admin',AdminRoutes);

app.listen(PORT,()=>{
    console.log(`🚀 Server is started on port ${PORT}!`);
});
