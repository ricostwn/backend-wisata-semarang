import express from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = express.Router();

// 1. GET All Destinations
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('destinations')
            .select(`*, categories ( name )`);
        
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. GET Detail Destination by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('destinations')
            .select(`*, categories ( name )`)
            .eq('id', id)
            .single();

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

export default router;