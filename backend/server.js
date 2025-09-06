import express from 'express' // Express → framework to build backend APIs
import mongoose from 'mongoose' // Mongoose → to connect & interact with MongoDB
import cors from 'cors' // CORS → allow frontend (React) to talk with backend
import dotenv from 'dotenv' // Dotenv → load environment variables from .env file
import authRoutes from './routes/authRoutes.js'
import bookRoutes from './routes/bookRoutes.js'

// Load environment variables (like PORT, Mongo URI) from .env file
dotenv.config(); 

// create an express application
const app = express();

//Middlewares
app.use(cors()) // enable CORS so frontend can make API requests
app.use(express.json()) // parse incoming JSON request bodies

// A simple test route → just to check server is working
app.get('/', (req, res) => {
    res.send('Book Tracker Backend Running');
})

// choose port from .env or 8000
const PORT = process.env.PORT || 8000;

// Connect to MongoDB using mongoose
mongoose.connect(process.env.MONGO_URI, {dbName: "book-tracker"})
.then(() => {
    console.log("MongoDB Connected")
    
    //start the server only after DB connection success
    app.listen(PORT, () => {
        console.log(`Server Running on PORT: ${PORT}`);
    })
})
.catch((err)=>{
    console.error("MongoDB Connection failed: ", err);
    process.exit(1); //exit app if DB fails
})

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);


