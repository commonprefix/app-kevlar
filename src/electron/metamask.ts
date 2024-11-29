import express from 'express';
import path from 'path';
import cors from 'cors';
import { getMetamaskPath } from './pathResolver.js';
import { isDev } from './utils.js';
import { app } from 'electron';

export function startMetamaskServer(addedToMetamask: () => void) {
    const server = express();
    const PORT = 8080;

    server.use(cors());

    // Serve static assets
    server.use('/assets', express.static(path.join(app.getAppPath(), 'dist-react/assets')));

    // Route to serve your HTML file or redirect to URL
    server.get('/', (req, res) => {
        const metamaskPath = getMetamaskPath();
        if (!isDev()) {
            res.sendFile(metamaskPath);
        } else {
            res.redirect(metamaskPath);
        }
    });

    server.post('/', (req, res) => {
        try {
            addedToMetamask();
            res.send('OK');
        } catch (error) {
            console.error('Error in /:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    // Start the server
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}
