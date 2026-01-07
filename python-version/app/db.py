# app/db.py
import psycopg
from psycopg_pool import ConnectionPool

DATABASE_URL = "postgresql://postgres:Sayan_420@localhost:5432/OnlineCodepad"

pool = ConnectionPool(DATABASE_URL, min_size=1, max_size=10)

def get_conn():
    return pool.connection()
