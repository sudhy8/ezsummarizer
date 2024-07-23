export default async function handler(req, res) {
    const { video } = req.query;

    try {
        const response = await fetch(`https://ez-summarizer-youtube-caption-fetcher.vercel.app/content/${video}`);
        if (!response.ok) {
            throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: error.message });
    }
}