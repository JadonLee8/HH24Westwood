import asyncio
import random
import string
import socketio
from aiohttp import web
from utils.utils import generate_lobby_code

# Create a Socket.IO server
sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins='*')
app = web.Application()
sio.attach(app)

# In-memory storage for lobbies
lobbies = {}

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



@sio.event
async def create_lobby(sid):
    lobby_code = generate_lobby_code()
    while lobby_code in lobbies:
        lobby_code = generate_lobby_code()
        
    lobbies[lobby_code] = []
    await sio.emit('lobby_created', {'lobby_code': lobby_code}, room=sid)
    print(f"Lobby '{lobby_code}' created by {sid}")

# Join a lobby
@sio.event
async def join_lobby(sid, data):
    lobby_name = data['lobby_name']
    if lobby_name in lobbies:
        lobbies[lobby_name].append(sid)
        sio.enter_room(sid, lobby_name)  # Enter the Socket.IO room for the lobby
        await sio.emit('joined_lobby', {'lobby_name': lobby_name}, room=sid)
        await sio.emit('lobby_message', {'message': f'{sid} has joined the lobby'}, room=lobby_name)
        print(f"Client {sid} joined lobby '{lobby_name}'")
    else:
        await sio.emit('error', {'message': 'Lobby not found'}, room=sid)

# Leave a lobby
@sio.event
async def leave_lobby(sid, data):
    lobby_name = data['lobby_name']
    if lobby_name in lobbies and sid in lobbies[lobby_name]:
        lobbies[lobby_name].remove(sid)
        sio.leave_room(sid, lobby_name)  # Leave the Socket.IO room
        await sio.emit('lobby_message', {'message': f'{sid} has left the lobby'}, room=lobby_name)
        await sio.emit('left_lobby', {'lobby_name': lobby_name}, room=sid)
        print(f"Client {sid} left lobby '{lobby_name}'")
    else:
        await sio.emit('error', {'message': 'Lobby not found or you are not in the lobby'}, room=sid)

# Send a message within a lobby
@sio.event
async def lobby_message(sid, data):
    lobby_name = data['lobby_name']
    message = data['message']
    if lobby_name in lobbies and sid in lobbies[lobby_name]:
        await sio.emit('lobby_message', {'message': f'{sid}: {message}'}, room=lobby_name)
        print(f"Message from {sid} in lobby '{lobby_name}': {message}")
    else:
        await sio.emit('error', {'message': 'Lobby not found or you are not in the lobby'}, room=sid)

# Get list of lobbies
@sio.event
async def get_lobbies(sid):
    await sio.emit('lobbies_list', {'lobbies': list(lobbies.keys())}, room=sid)

# Start the server
if __name__ == '__main__':
    web.run_app(app, host='localhost', port=8765)