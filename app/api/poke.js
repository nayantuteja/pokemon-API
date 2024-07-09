import axios from 'axios';

export default async function handler(req, res) {
  const { limit } = req.query;

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching PokÃ©mon data:', error);
    res.status(500).json({ error: 'Failed to fetch PokÃ©mon data' });
  }
}