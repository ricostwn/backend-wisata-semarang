import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import destinationRoutes from "./src/routes/destinationRoutes.js"; // Import rute

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Gunakan rute yang sudah dipisah tadi
app.use('/api/destinations', destinationRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Server Wisata Semarang Berjalan dengan Baik! 🚀 Silakan akses /api/destinations');
});

app.listen(port, () => {
    console.log(`Server Wisata Semarang berjalan di port ${port}`);
});