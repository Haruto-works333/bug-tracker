import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bugRoutes from './routes/bugRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Bug Tracker API is running' });
});

app.use('/api/bugs', bugRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});