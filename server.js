import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 3001;
const API_TOKEN = process.env.VITE_API_TOKEN;

// Use CORS middleware to allow requests from localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your Vite frontend
}));

app.get('/api/players/:tag', async (req, res) => {
  const { tag } = req.params;
  try {
    const response = await fetch(`https://api.clashofclans.com/v1/players/%23${tag}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });

    if(response.status === 404) {
      const errorText = await response.text();
      console.error('Clash of Clans API Error:', errorText);
      res.status(404).json({ error: 'No player found' });
      return;
    } else if (!response.ok) {
      const errorText = await response.text();
      console.error('Clash of Clans API Error:', errorText);
      throw new Error('Failed to fetch player data');
    }

    const data = await response.json();

    console.log('Player Fetched Data', data)
    res.json(data);
  } catch (error) {
    console.error('Express Server Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch player data' });
  }
});

app.get('/api/clans/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const response = await fetch(`https://api.clashofclans.com/v1/clans?name=${encodeURIComponent(name)}&limit=20`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });

    if(response.status === 404) {
      const errorText = await response.text();
      console.error('Clash of Clans API Error:', errorText);
      res.status(404).json({ error: 'No clans found' });
      return;
    } else if (!response.ok) {
      const errorText = await response.text();
      console.error('Clash of Clans API Error:', errorText);
      res.status(response.status).json({ error: 'Failed to fetch clan data' })
      return;
    }

    const data = await response.json();

    console.log('Fetched Clans Data:', data)
    res.json(data);
  } catch (error) {
    console.error('Express Server Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch clans data' });
  }
});

app.get('/api/clan-info/:tag', async (req, res) => {
  const { tag } = req.params;
  try {
    const response = await fetch(`https://api.clashofclans.com/v1/clans/%23${tag}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });

    if(response.status === 404) {
      const errorText = await response.text();
      console.error('Clash of Clans API Error:', errorText);
      res.status(404).json({ error: 'No clan found' });
      return;
    } else if (!response.ok) {
      const errorText = await response.text();
      console.error('Clash of Clans API Error:', errorText);
      res.status(response.status).json({ error: 'Failed to fetch clan data' })
      return;
    }

    const data = await response.json();

    console.log('Fetched Clan Data:', data)
    res.json(data);
  } catch (error) {
    console.error('Express Server Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch clan data' });
  }
});

app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));