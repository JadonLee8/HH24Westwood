import socketio
from aiohttp import web
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

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")
    # TODO: remove user from lobby if in one

@sio.event
async def create_lobby(sid, data):
    lobby_code = None
    user = l_manager.create_user(sid, data['username'])
    # TODO: check if the user is already in a lobby
    lobby_code = l_manager.create_lobby()
    print("Lobby created with code: ", lobby_code)
    await join_lobby(sid, data['username'], lobby_code)
    await sio.enter_room(sid, lobby_code)
    await sio.emit('lobby_created', {'lobby_code': lobby_code}, room=sid)

async def update_lobby(sid, code):
    sio.emit('lobby_players', {'players': l_manager.get_users_in_lobby(code)}, room=code)

@sio.event
async def join_lobby(sid, data):
    lobby_code = data['lobby_code']
    user = l_manager.create_user(sid, data['username'])
    if l_manager.join_lobby(data['username'], lobby_code):
        print("User joined lobby: ", data['username'], lobby_code)
        await sio.enter_room(sid, lobby_code)
        await sio.emit('lobby_joined', {'lobby_code': lobby_code}, room=lobby_code)
        # Update all users in lobby of new user
        await update_lobby(sid, lobby_code)
    else:
        await sio.emit('lobby_error', {'message': 'Invalid join code'}, room=sid)

@sio.event
async def start_lobby(sid, data):
    lobby_code = data['lobby_code']
    print('Starting lobby')
    if l_manager.start_lobby(lobby_code):
        print('Lobby started')
        await sio.emit('lobby_started', { 'lobby_code': lobby_code, 'game_state': l_manager.get_game_state(lobby_code)}, room=lobby_code)
    else:
        await sio.emit('error', {'message': 'Lobby not found'}, room=sid)

@sio.event
async def lobby_players(sid, data):
    lobby_list = l_manager.get_usernames_in_lobby(data['lobby_code'])
    print("Lobby players requested: ", lobby_list)
    await sio.emit('lobby_players', {'players': lobby_list}, room=sid)

async def join_lobby(sid, username, code):
    l_manager.join_lobby(username, code)
    await sio.enter_room(sid, code)

async def leave_lobby(sid, code):
    l_manager.leave_lobby(sid, code)
    await sio.leave_room(sid, code)

@sio.event
async def get_game_state(sid, data):
    lobby_code = data['lobby_code']
    if l_manager.has_lobby(lobby_code):
        game_state = l_manager.get_lobby(lobby_code).game_state
        await sio.emit('game_state', {'game_state': game_state}, room=sid)
    else:
        await sio.emit('error', {'message': 'Lobby not found'}, room=sid)

@sio.event
async def next_game_state(sid, data):
    lobby_code = data['lobby_code']
    if l_manager.has_lobby(lobby_code):
        print("Going to next game state")
        l_manager.next_game_state(lobby_code)
        await sio.emit('next_game_state', {'game_state': l_manager.lobbies[lobby_code].game_state}, room=lobby_code)
    else:
        await sio.emit('error', {'message': 'Lobby not found'}, room=sid)

# Start the server
if __name__ == '__main__':
    web.run_app(app, host='localhost', port=8765)