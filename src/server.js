require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// POST /report endpoint
app.post('/report', async (req, res) => {
  const { title, location, description, tags } = req.body;
  if (!title || !location || !description || !tags) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data, error } = await supabase
    .from('reports')
    .insert([{ title, location, description, tags }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(201).json({ message: 'Report saved', data });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
