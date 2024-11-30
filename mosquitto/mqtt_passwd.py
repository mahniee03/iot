import hashlib
import base64
import os
import sys

SALT_LENGTH = 12  # Length of the salt in bytes
PWD_FILE = 'E:\Hoc Code cung Manh\iotprj\mosquitto\pwd'

def generate_salt(length=SALT_LENGTH):
    """
    Generates a random salt.
    :param length: The length of the salt in bytes.
    :return: The generated salt in base64 encoding.
    """
    return base64.b64encode(os.urandom(length)).decode('utf-8')


def sha512_hash(password, salt):
    """
    Hashes a password using SHA-512 with a salt.
    :param password: The password to hash.
    :param salt: The salt to use.
    :return: The base64-encoded hash.
    """
    password = password.encode('utf-8')
    salt = base64.b64decode(salt)
    hash_object = hashlib.sha512(password + salt)
    hash_bytes = hash_object.digest()
    return base64.b64encode(hash_bytes).decode('utf-8')


def sha512_verify(password, salt, stored_hash):
    """
    Verifies a password against a stored SHA-512 hash with a salt.
    :param password: The password to verify.
    :param salt: The salt used in the hash.
    :param stored_hash: The stored hash to verify against.
    :return: True if the password matches, False otherwise.
    """
    hashed_password = sha512_hash(password, salt)
    return hashed_password == stored_hash


def read_pwd_file(filename):
    """
    Reads the pwd file and returns a dictionary mapping usernames to their hashes.
    :param filename: The file to read.
    :return: A dictionary with usernames as keys and hashes as values.
    """
    pwd_map = {}
    try:
        with open(filename, 'r') as file:
            for line in file:
                if line.strip():
                    username, hash_value = line.strip().split(':', 1)
                    pwd_map[username] = hash_value
    except FileNotFoundError:
        print(f"File {filename} not found.")
    return pwd_map


def save_to_file(filename, pwd_map):
    """
    Saves the updated pwd_map to the file.
    :param filename: The file to save to.
    :param pwd_map: The dictionary to save.
    """
    with open(filename, 'w') as file:
        for username, hash_value in pwd_map.items():
            file.write(f"{username}:{hash_value}\n")


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python script.py <username> <password>")
        sys.exit(1)

    username = sys.argv[1]
    password = sys.argv[2]

    pwd_map = read_pwd_file(PWD_FILE)
    salt = generate_salt()
    hashed_password = sha512_hash(password, salt)
    new_hash = f"$6${salt}${hashed_password}"
    pwd_map[username] = new_hash
    save_to_file(PWD_FILE, pwd_map)
