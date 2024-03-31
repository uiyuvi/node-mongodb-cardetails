// src/routers/cars.js

const express = require('express');
const carsRouter = express.Router();
const Car = require('../mongoose/models/cars');

// Create a new car
carsRouter.post('/cars', async (req, res) => {
    try {
        const { name, type, price, manufacturer, capacity } = req.body;
        const newCar = new Car({ name, type, price, manufacturer, capacity });
        await newCar.save();
        res.status(201).json({ message: "Added a new car successfully" });
    } catch (error) {
        console.error('Error creating car:', error);
        res.status(400).json({ error: 'Failed to create car' });
    }
});
// Fetch car data
// src/routers/cars.js

// ...

// Fetch car data
carsRouter.get('/cars', async (req, res) => {
    try {
        const { price, manufacturer, capacity, search } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { manufacturer: { $regex: search, $options: 'i' } }
            ];
        }

        if (capacity) {
            query.capacity = capacity;
        }

        if (manufacturer) {
            query.manufacturer = manufacturer;
        }

        let sortDirection = 1; // Default: ascending
        if (price === 'desc') {
            sortDirection = -1; // Descending
        }
        let cars = []
        if (capacity) {
            if (price) {
                cars = await Car.find({ capacity: { $eq: capacity } }).sort({ price: sortDirection });
            } else {
                cars = await Car.find({ capacity: { $eq: capacity } })
            }
        } else if (manufacturer) {
            cars = await Car.find({ manufacturer: { $eq: manufacturer } });
        } else if (price || search) {
            cars = await Car.find(query).sort({ price: sortDirection });
        } else {
            cars = await Car.find()
        }
        res.json(cars);
    } catch (error) {
        console.error('Error fetching car data:', error);
        res.status(500).json({ error: 'Failed to fetch car data' });
    }
});

// ...
// src/routers/cars.js

// ...

// Update car data by ID
carsRouter.patch('/cars/:id', async (req, res) => {
    try {
        const carId = req.params.id;
        const { price } = req.body;

        // Validate carId (you can use mongoose.Types.ObjectId.isValid(carId))
        // Update the price of the car with the specified ID
        const updatedCar = await Car.updateOne({ _id: carId }, req.body);

        if (!updatedCar) {
            return res.status(400).json({ error: 'Car not found' });
        }

        res.status(200).json({message: "Updated successfully"});
    } catch (error) {
        console.error('Error updating car data:', error);
        res.status(400).json({ error: 'Failed to update car data' });
    }
});

// ...
// src/routers/cars.js

// ...

// Delete car data by ID
carsRouter.delete('/cars/:id', async (req, res) => {
    try {
        const carId = req.params.id;

        // Validate carId (you can use mongoose.Types.ObjectId.isValid(carId))
        const deletedCar = await Car.findByIdAndDelete(carId);

        if (!deletedCar) {
            return res.status(400).json({ error: 'Car not found' });
        }

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Error deleting car data:', error);
        res.status(400).json({ error: 'Failed to delete car data' });
    }
});

// ...




//exporting the router
module.exports = carsRouter;