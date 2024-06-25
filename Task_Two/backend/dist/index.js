import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import blogRoutes from './routes/blog.routes.js';
import unAuthRoutes from './routes/unAuthUser.routes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api', unAuthRoutes);
if (!process.env.DB_URI) {
    throw new Error('DB_URI environment variable is not defined');
}
mongoose.connect(process.env.DB_URI)
    .then(() => {
    app.listen(PORT, () => {
        console.log('connected to db');
        console.log(`server running in port ${PORT}`);
    });
})
    .catch((err) => {
    console.log('error connecting to database ' + err);
});
//# sourceMappingURL=index.js.map