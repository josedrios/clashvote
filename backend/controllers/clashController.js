require('dotenv').config();

exports.getPlayer = async (req, res) => {
  const { tag } = req.params;
  try {
    const response = await fetch(
      `https://api.clashofclans.com/v1/players/%23${tag}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${process.env.VITE_API_TOKEN}` },
      }
    );

    if (!response.ok) throw new Error('Failed to fetch player data');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch player data' });
  }
};

exports.getClans = async (req, res) => {
  const { name } = req.params;
  try {
    const response = await fetch(
      `https://api.clashofclans.com/v1/clans?name=${encodeURIComponent(
        name
      )}&limit=20`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${process.env.VITE_API_TOKEN}` },
      }
    );

    if (!response.ok) throw new Error('Failed to fetch clan data');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clan data' });
  }
};

exports.getClanInfo = async (req, res) => {
  const { tag } = req.params;
  try {
    const response = await fetch(
      `https://api.clashofclans.com/v1/clans/%23${tag}`,
      {
        headers: { Authorization: `Bearer ${process.env.VITE_API_TOKEN}` },
      }
    );

    if (!response.ok) throw new Error('Failed to fetch clan data');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clan data' });
  }
};
