import random
import string

# Function to generate a random 6-character lobby code
def generate_lobby_code():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))