import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { supabase } from "./src/config/supabaseClient.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- ENDPOINTS ---

// 1. GET All Destinations (Dengan Kategori)
app.get('/api/destinations', async (req, res) => {
    try {
        // Join tabel destinations dengan categories
        const { data, error } = await supabase
            .from('destinations')
            .select(`
                *,
                categories ( name )
            `);
        
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. GET Detail Destination by ID
app.get('/api/destinations/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('destinations')
            .select(`*, categories ( name )`)
            .eq('id', id)
            .single(); // Ambil satu data saja

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('Server Wisata Semarang Berjalan dengan Baik! 🚀 Silakan akses /api/destinations');
});

// Jalankan Server
app.listen(port, () => {
    console.log(`Server Wisata Semarang berjalan di port ${port}`);
});