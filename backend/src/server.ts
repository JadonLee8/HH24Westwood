import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { mRouter } from './routes/multiplayer';

const init = async () => {
    const app = express();
    const server = createServer();
    const io = new Server(server);

    app.use(express.json());

    app.use('/api', mRouter); // Use the multiplayer router

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        // Handle custom events
        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        });
    });

    return app;
}

export { init };
