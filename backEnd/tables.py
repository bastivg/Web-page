#define aca las tablas de la base de datos
import psycopg2
import time

while True:
    try:
        conn = psycopg2.connect(
            host="postgres",
            database="isw",
            user="user",
            password="pass")
        break
    except:
        print("Waiting for postgres to be ready")
        time.sleep(1)

cur = conn.cursor()

def createTables():

    # create table users
    cur.execute("""CREATE TABLE IF NOT EXISTS cliente (
        id_entrada serial PRIMARY KEY,
        Nombre varchar(50) NOT NULL,
        Clave varchar(50) NOT NULL,
        Email varchar(50) NOT NULL,
        Phone bigserial );""")
    conn.commit()
    cur.execute("""CREATE TABLE IF NOT EXISTS Administrador (
        id_administrador serial PRIMARY KEY,
        Nombre varchar(50) NOT NULL,
        Clave varchar(50) NOT NULL,
        Email varchar(50) NOT NULL,
        Phone bigserial);""")
    conn.commit()
    cur.execute("""CREATE TABLE IF NOT EXISTS Juego (
        id_juego serial PRIMARY KEY,
        Nombre varchar(50) NOT NULL,
        Tiempo_juego integer NOT NULL,
        Ubicacion varchar(50) NOT NULL,
        Estado varchar(10) NOT NULL);""")
    conn.commit()
    cur.execute("""CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        username varchar(50) NOT NULL,
        password varchar(50) NOT NULL,
        email varchar(50) NOT NULL,
        name varchar(50) NOT NULL);""")
    conn.commit()
    cur.execute("""CREATE TABLE IF NOT EXISTS Cola (
        id_entradas serial PRIMARY KEY,
        id_juegos varchar(20) NOT NULL);""")
    conn.commit()
