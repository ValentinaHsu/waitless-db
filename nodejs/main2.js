import { getFoodWithPrisma, getAllFoodWithPrisma, createFoodWithPrisma } from '../index.js';

module.exports = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const menu = await getAllFoodWithPrisma();
            res.json({ message: 'Success', data: menu });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'POST') {
        const { title, contents } = req.body;
        try {
            const nuevoPedido = await createFoodWithPrisma(title, contents);
            res.status(201).json(nuevoPedido);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

module.exports = async (req, res) => {
    const { id } = req.query;
    if (req.method === 'GET' && id) {
        try {
            const menu = await getFoodWithPrisma(parseInt(id));
            if (!menu) {
                res.status(404).json({ message: 'Menu not found' });
            } else {
                res.json(menu);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(400).json({ error: 'Bad request' });
    }
};
