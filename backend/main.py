import asyncio
import socketio
from aiohttp import web
from utils.utils import generate_lobby_code
import lobby_manager

# Create a Socket.IO server
sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins='*')
app = web.Application()
sio.attach(app)

# Connection: Add to user list
# Disconnection: Disconnect from lobby (if in one) and remove from user list

l_manager = lobby_manager.LobbyManager()

@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")
    print(l_manager.lobbies)
    l_manager.create_user(sid)

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")  
    l_manager.remove_user(sid)

@sio.event
async def create_lobby(sid):
    lobby_code = None
    if l_manager.has_lobby(sid):
        lobby_code = l_manager.get_lobby(sid)
    else: 
        lobby_code = l_manager.create_lobby()
        join_lobby(sid, lobby_code)
    await sio.emit('lobby_created', {'lobby_code': lobby_code}, room=sid)

@sio.event
async def join_lobby(sid, data):
    lobby_code = data['lobby_code']
    if l_manager.join_lobby(sid, lobby_code):
        sio.enter_room(sid, lobby_code)
        await sio.emit('lobby_joined', {'lobby_code': lobby_code}, room=lobby_code)
    else:
        await sio.emit('error', {'message': 'Lobby not found'}, room=sid)

@sio.event
async def get_lobby_list(sid, data):
    lobby_list = l_manager.get_lobby_list(data.lobby_code)
    await sio.emit('lobby_list', {'players': lobby_list}, room=sid)

def join_lobby(sid, code):
    l_manager.join_lobby(sid, code)
    sio.enter_room(sid, code)

def leave_lobby(sid, code):
    l_manager.leave_lobby(sid, code)
    sio.leave_room(sid, code)

# Start the server
if __name__ == '__main__':
    web.run_app(app, host='localhost', port=8765)