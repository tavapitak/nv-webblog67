const { Tent } = require('../models'); // Adjust the path as necessary

// Create a new Tent
exports.createTent = async (req, res) => {
    try {
        const { title, pictures, content, category, status } = req.body;
        const newTent = await Tent.create({ title, pictures, content, category, status });
        return res.status(201).json(newTent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating Tent', error });
    }
};

// Get all Tents
exports.getAllTents = async (req, res) => {
    try {
        const tents = await Tent.findAll();
        return res.status(200).json(tents);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving Tents', error });
    }
};

// Get a single Tent by ID
exports.getTentById = async (req, res) => {
    const { id } = req.params;
    try {
        const tent = await Tent.findByPk(id);
        if (!tent) {
            return res.status(404).json({ message: 'Tent not found' });
        }
        return res.status(200).json(tent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving Tent', error });
    }
};

// Update a Tent by ID
exports.updateTent = async (req, res) => {
    const { id } = req.params;
    try {
        const tent = await Tent.findByPk(id);
        if (!tent) {
            return res.status(404).json({ message: 'Tent not found' });
        }
        const updatedTent = await tent.update(req.body);
        return res.status(200).json(updatedTent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating Tent', error });
    }
};

// Delete a Tent by ID
exports.deleteTent = async (req, res) => {
    const { id } = req.params;
    try {
        const tent = await Tent.findByPk(id);
        if (!tent) {
            return res.status(404).json({ message: 'Tent not found' });
        }
        await tent.destroy();
        return res.status(204).json(); // No content
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting Tent', error });
    }
};
