// Import necessary modules
import express from 'express';
import { create, list, getDetails,listofallevents } from '../controllers/eventController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router(); // Create an Express router

// Route to create a new event, protected by authentication middleware
router.post('/create_events', authenticate, create);
//Rpute to see all events
router.get('/listofallevents', listofallevents);

// Route to list all events with optional filters by place
router.get('/', list);

// Route to get details of a specific event by its ID
router.get('/:id', getDetails);

export default router; // Export the router
