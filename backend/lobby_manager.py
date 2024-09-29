import string
from utils.utils import generate_lobby_code

class User:
    def __init__(self, username=None, sid=None):
        self.username = username
        self.lobbyCode = None
        self.sid = sid
        self.role = None # TODO: randomly assign roles after game starts. When game starts


class Lobby:
    def __init__(self, code):
        self.code = code
        self.users = []
        self.game_state = 0

    def start_lobby(self):
        self.game_state = 1

    def next_game_state(self):
        if self.game_state < 6:
            self.game_state += 1
            return self.game_state
        return -1

    def add_user(self, User):
        self.users.append(User.sid)

    def remove_user(self, User):
        self.users.remove(User.sid)

# TODO: replace username with sid for the identifier. Consider rest of code tho. Might be easier to just prevent duplicate usernames
# TODO: prevent duplicate usernames

class LobbyManager:
    def __init__(self):
        self.lobbies = {} # maps lobby code to lobby object
        self.users = {} # maps username to user object
        self.max_state = 6

    # Create new user
    def create_user(self, sid, username, code=None):
        if code:
            self.lobbies[code].add_user(User(username, sid))
            self.users[username] = self.lobbies[code].users[-1]
        else:
            self.users[username] = User(username, sid)
        return self.users[username]

    # Delete user and remove from lobby if in one
    def remove_user(self, code, username):
        user = self.users[username]
        print("REMOVE USER", user.username, "WITH SID", user.sid)
        if code in self.lobbies and len(self.lobbies[code].users) > 0:
            if self.lobbies[code].users.contains(user):
                self.lobbies[code].remove_user(user)
                print("REMOVED FROM LOBBY", user.username)
        else:
            print("Invalid lobby or user")

    # Generate random unique lobby code and lobby object and add to lobbies
    def create_lobby(self) -> string:
        lobby_code = generate_lobby_code()
        while lobby_code in self.lobbies:
            lobby_code = generate_lobby_code()

        # Create empty lobby
        self.lobbies[lobby_code] = Lobby(lobby_code)
        self.lobbies[lobby_code].game_state = 0
        return lobby_code

    # Clear all users from lobby
    def clear_lobby(self, code):
        if code in self.lobbies:
            self.lobbies[code].users = []

    def join_lobby(self, username, code):
        user = self.users[username]
        if code in self.lobbies and user not in self.lobbies[code].users:
            self.lobbies[code].add_user(user)
            user.lobbyCode = code
            return True
        return False

    def start_lobby(self, code):
        print(code)
        print(self.lobbies)
        if code in self.lobbies:
            self.lobbies[code].game_state = 1
            return True
        return False

    def get_users_in_lobby(self, code):
        return self.lobbies[code].users

    def leave_lobby(self, user, code):
        print("LEAVE LOBBY", user.username, code)
        if code in self.lobbies:
            self.lobbies[code].remove_user(user)
            user.lobbyCode = None
            return True
        return False

    def get_game_state(self, lobby_code):
        return self.lobbies[lobby_code].game_state

    def next_game_state(self, lobby_code):
        if self.lobbies[lobby_code].game_state < self.max_state:
            self.lobbies[lobby_code].game_state += 1
            return self.lobbies[lobby_code].game_state
        return -1

    def has_lobby(self, code):
        return code in self.lobbies
