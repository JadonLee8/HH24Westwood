import string
from utils.utils import generate_lobby_code
import random
from enum import Enum

class User:
    def __init__(self, username=None, sid=None):
        self.username = username
        self.lobbyCode = None
        self.sid = sid
        self.role = None # TODO: randomly assign roles after game starts. When game starts


class Role(Enum):
    OUTLAW = "outlaw"
    WITNESS = "witness"
    CITIZEN = "citizen"
class Lobby:
    def __init__(self, code):
        self.code = code
        self.users = []
        self.game_state = 0
        self.images = {}
        self.image_ratings = {}
        self.img_r_amt = 0
        self.image_url = ""
        self.prompt = ""
        self.witness_account = ""

    def start_lobby(self):
        self.game_state = 1

        random.shuffle(self.users)

        # Assign the first user as OUTLAW
        self.users[0].role = Role.OUTLAW

        # Assign the second user as SHERIFF
        self.users[1].role = Role.WITNESS

        # Assign the rest of the users as CITIZEN
        for user in self.users[2:]:
            user.role = Role.CITIZEN

        # Print the users and their assigned roles
        for user in self.users:
            print(user.username, user.role)

    def next_game_state(self):
        if self.game_state < 6:
            self.game_state += 1
            return self.game_state
        return -1

    def add_user(self, User):
        self.users.append(User)

    def remove_user(self, User):
        self.users.remove(User)

    def add_image(self, sid, image):
        self.images[sid] = image
        return len(self.images) == len(self.users) - 2



# TODO: replace username with sid for the identifier. Consider rest of code tho. Might be easier to just prevent duplicate usernames
# TODO: prevent duplicate usernames

class LobbyManager:
    def __init__(self):
        self.lobbies = {} # maps lobby code to lobby object
        self.users = {} # maps username to user object
        self.max_state = 8

    # Create new user
    def create_user(self, sid, username, code=None):
        if code:
            self.lobbies[code].add_user(User(username, sid))
            self.users[username] = self.lobbies[code].users[-1]
        else:
            self.users[username] = User(username, sid)
        return self.users[username]

    def find_user_by_sid(self, sid):
        for user in self.users:
            if self.users[user].sid == sid:
                return user
        return None

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
        if code in self.lobbies:
            self.lobbies[code].game_state = 1
            self.lobbies[code].start_lobby()
            return True
        return False

    def get_sids_in_lobby(self, code):
        return [u.sid for u in self.lobbies[code].users]

    def get_usernames_in_lobby(self, code):
        if code in self.lobbies:
            users = self.lobbies[code].users
            return [user.username for user in users]
        else:
            return []

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
            print(self.lobbies[lobby_code].game_state)
            return self.lobbies[lobby_code].game_state
        return -1

    def get_usernames_to_roles(self, code):
        if code in self.lobbies:
            print({user.username: user.role.value for user in self.lobbies[code].users})
            return {user.username: user.role.value for user in self.lobbies[code].users}
        return {}

    def set_image_url(self, code, prompt):
        if code in self.lobbies:
            self.lobbies[code].prompt = prompt

    def set_prompt(self, code, prompt):
        if code in self.lobbies:
            self.lobbies[code].prompt = prompt

    def set_witness_account(self, code, witness_account):
        if code in self.lobbies:
            self.lobbies[code].witness_account = witness_account

    def has_lobby(self, code):
        return code in self.lobbies
