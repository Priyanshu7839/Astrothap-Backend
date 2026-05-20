import dotenv from "dotenv";
dotenv.config();




import express from 'express'
import routes from './routes.js'
import cors from 'cors'


const app = express();
const PORT = 8002;

const corsOptions = {
  origin: [
    'https://astrothap.com',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());
app.use('/api/v1',routes)




app.listen(PORT,()=>{
    console.log(`Server Started at port ${PORT}`);
})