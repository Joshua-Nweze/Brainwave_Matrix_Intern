import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import checkAuth from './middleware/checkAuth.js';
import authRoutes from './routes/auth.routes.js';
import blogRoutes from './routes/blog.routes.js';
import unAuthRoutes from './routes/unAuthUser.routes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
    origin: ['http://localhost:5173', 'veeblog.netlify.app'],
    credentials: true
}));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api', unAuthRoutes);
app.post('/api/validate-token', checkAuth, async (req, res) => {
    return res.status(200).json({ valid: true, msg: `${res.locals.user}` });
});
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