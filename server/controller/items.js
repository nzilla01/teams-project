const item = require('../modules/items');

//get all items
const getAllItems = async(req, res) => {
    try{
        const items = await item.find();
        res.status(200).json(items);
        res.send(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//getting item by id
const getItemsById =async(req, res) => {

    const itemsid = req.params;
    try{
        const itemsData = await item.findById(itemsid.id);
        if (!itemsData){
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(itemsData);
    } catch (error) {
        console.error('Error fetching item by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//adding new item
const addNewItem = async(req, res) => {
    const newItem = new item(req.body);
    try{
        const savedItem = await newItem.save();
        if (!savedItem) {
            return res.status(400).json({ message: 'Error saving item' });
        }
        res.status(201).json(savedItem);
        console.log('New item added:', savedItem);
    } catch (error) {
        console.error('Error adding new item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }   
}

//updating item by id
const updateItemById = async(req, res) => {
    const itemsid = req.params;
    try{
        const updatedItem = await item.findByIdAndUpdate(
            itemsid.id,
            req.body,
            { new: true, runValidators: true }
        );      
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(updatedItem);
        console.log('Item updated:', updatedItem);
    }
    catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//deleting item by id
const deleteItemById = async(req, res) => {
    const itemsid = req.params;
    try{
        const deletedItem = await item.findByIdAndDelete(itemsid.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
        console.log('Item deleted:', deletedItem);
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Exporting the functions
module.exports = {
    getAllItems,
    getItemsById,
    addNewItem,
    updateItemById,
    deleteItemById
};

