import express from 'express';
import path from 'path';
import { getMetamaskPath } from './pathResolver.js';
import { isDev } from './utils.js';
import { app } from 'electron';

export function startMetamaskServer() {
    const server = express();
    const PORT = 8080;

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

    // Start the server
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}
