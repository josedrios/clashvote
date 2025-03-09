require('dotenv').config();

exports.getPlayer = async (req, res) => {
  const { tag } = req.params;
  try {
    const response = await fetch(
      `https://api.clashofclans.com/v1/players/%23${tag}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${process.env.VITE_API_TOKEN}` },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.log(response.status);
        return res.status(404).json({ error: 'Player not found' });
      } else if (response.status === 403) {
        console.log(response.status);
        return res.status(403).json({ error: 'Forbidden - Invalid API token' });
      } else if (response.status === 429) {
        console.log(response.status);
        return res
          .status(429)
          .json({ error: 'Too many requests - Rate limit exceeded' });
      }

      return res
        .status(response.status)
        .json({ error: 'Failed to fetch player data' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch player data' });
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

    if (!response.ok) {
      if (response.status === 404) {
        console.log(response.status);
        return res.status(404).json({ error: 'Clan not found' });
      } else if (response.status === 403) {
        console.log(response.status);
        return res.status(403).json({ error: 'Forbidden - Invalid API token' });
      } else if (response.status === 429) {
        console.log(response.status);
        return res
          .status(429)
          .json({ error: 'Too many requests - Rate limit exceeded' });
      }

      return res
        .status(response.status)
        .json({ error: 'Failed to fetch clan data' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clan data' });
  }
};

exports.getClans = async (req, res) => {
  const { name } = req.params;
  try {
    const response = await fetch(
      `https://api.clashofclans.com/v1/clans?name=${encodeURIComponent(
        name
      )}&limit=25`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${process.env.VITE_API_TOKEN}` },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.log(response.status);
        return res.status(404).json({ error: 'Clan(s) not found' });
      } else if (response.status === 403) {
        console.log(response.status);
        return res.status(403).json({ error: 'Forbidden - Invalid API token' });
      } else if (response.status === 429) {
        console.log(response.status);
        return res
          .status(429)
          .json({ error: 'Too many requests - Rate limit exceeded' });
      }

      return res
        .status(response.status)
        .json({ error: 'Failed to fetch clan(s) data' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clan(s) data' });
  }
};
