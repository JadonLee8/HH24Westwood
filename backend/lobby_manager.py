import string 
from utils.utils import generate_lobby_code

class User:
    def __init__(self, username):
        self.username = username
        self.lobbyCode = None

class LobbyManager:
    users = {}
    lobbies = {}

    # Create new user
    def create_user(self, sid):
        self.users[sid] = User(sid)
    
    # Delete user and remove from lobby if in one
    def remove_user(self, sid):
        print("REMOVE USER", sid)
        if self.users[sid].lobbyCode:
            self.remove_lobby_list(sid, self.users[sid].lobbyCode)
            print("REMOVED FROM LOBBY", self.users[sid].lobbyCode)
        del self.users[sid]

    def remove_lobby_list(self, sid, code):
        if code in self.lobbies:
            self.lobbies[code].remove(sid)
            self.users[sid].lobbyCode = None
        if len(self.lobbies[code]) == 0:
            print("REMOVING LOBBY", code)
            del self.lobbies[code]
    
    # Generate random unique lobby code
    def create_lobby(self) -> string:
        lobby_code = generate_lobby_code()
        while lobby_code in self.lobbies:
            lobby_code = generate_lobby_code()
        
        # Create empty lobby
        self.lobbies[lobby_code] = []
        return lobby_code
    
    def has_lobby(self, sid):
        return self.users[sid].lobbyCode != None
    
    def get_lobby(self, sid):
        return self.users[sid].lobbyCode
    
    # Clear all users from lobby
    def clear_lobby(self, code):
        if code in self.lobbies:
            self.lobbies[code] = []

    def join_lobby(self, sid, code):
        if code in self.lobbies and sid not in self.lobbies[code]:
            self.lobbies[code].append(sid)
            self.users[sid].lobbyCode = code
            return True
        return False
    
    def get_lobby_list(self, code):
        return self.lobbies[code]


    def leave_lobby(self, sid, code):
        print("LEAVE LOBBY", sid, code)
        if code in self.lobbies:
            self.lobbies[code].remove(sid)
            self.users[sid].lobbyCode = None
            return True
        return False