import asyncio
import socketio
from aiohttp import web

# Create a Socket.IO server
sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins='*')
app = web.Application()
sio.attach(app)

# Event when a client connects
@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")

# Event when a client sends a message
@sio.event
async def message(sid, data):
    print(f"Message from {sid}: {data}")
    await sio.send(f"Echo: {data}")

# Event when a client disconnects
@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

# Start the server
if __name__ == '__main__':
    web.run_app(app, host='localhost', port=8765)