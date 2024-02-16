import express, { Request, Response } from 'express';
import mongoose from 'mongoose'; // Import mongoose
import fs from 'fs';
import path from 'path';

import { errorHandler } from '../handlers/errorHandler';
import User, { UserDocument } from '../models/User'; // Import your user model

const router = express.Router();

function writeToCSV(data: any[], headers?: string[]): string {
    if (!data || data.length === 0) {
        return ''; 
    }

    if (!headers) {
        const plainObject = data[0].toObject();
        headers = Object.keys(plainObject);
    }
    
    const csvHeader = headers.join(',') + '\n';
    const csvRows = data.map((row) => {
        const values = headers!.map((header) => row[header]);
        return values.join(',');
    });
    
    const csvContent = csvHeader + csvRows.join('\n');
    return csvContent;
}

// Route for exporting data to CSV
router.post('/exportcsv', async (req: Request, res: Response) => {
    try {
        const { collectionName, headers } = req.body;
    
        if (!mongoose.models[collectionName]) {
            return res.status(404).json({ message: 'Model not found for collection' });
        }
    
        const Model = mongoose.model(collectionName);
        const data = await Model.find({});
    
        const csvData = writeToCSV(data, headers);
    
        // Set the Content-Type header to indicate CSV data
        res.set('Content-Type', 'text/csv');
    
        // Escape characters that have special meaning in HTML
        const sanitizedCsvData = csvData.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;');
    
        res.attachment(`${collectionName}.csv`);
        res.send(sanitizedCsvData);
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.get('/getAllCollectionNames', async (req: Request, res: Response) => {
    try {
        // Get all registered model names
        const modelNames = Object.keys(mongoose.models);

        // Send the model names in the response
        res.json(modelNames);
    } catch (error) {
        console.error('Error fetching collection names:', error);
        res.status(500).json({ error: 'Error fetching collection names' });
    }
});

router.get('/getAllHeaders', async (req: Request, res: Response) => {
    try {
        const collectionName = req.query.collectionName as string; // Explicitly cast to string

        if (!collectionName) {
            return res.status(400).json({ message: 'collectionName parameter is required' });
        }

        if (!mongoose.models[collectionName]) {
            return res.status(404).json({ message: 'Model not found for collection' });
        }

        const Model = mongoose.model(collectionName);
        const data = await Model.find({});

        if (!data || data.length === 0) {
            return res.send(''); // Return empty response if no data found
        }

        const plainObject = data[0].toObject();
        const csvHeader = Object.keys(plainObject);
        res.send(csvHeader);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
export default router;