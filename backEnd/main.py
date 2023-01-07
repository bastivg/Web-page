from tables import createTables
from re import S
import time
import psycopg2
import json
from pydantic import BaseModel

from fastapi import FastAPI, Response, status, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

description = """
Este es el backend del codigo base para el curso de isw

## **Integrantes**

"""

tags_metadata = [
    {
        "name": "users",
        "description": "Operations with users. The **login** logic is also here.",
    },
]
app = FastAPI(title="BackEnd grupo XX",
              description=description,
              version="0.1", openapi_tags=tags_metadata)

origins = ["*"]
#origins = ["http://localhost:4000"] . ToDo borrar
#origins = ["http://localhost:4000/juego"] ToDo borrar
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# connect to database
while True:
    try:
        conn = psycopg2.connect(
            host="postgres",
            database="isw",
            user="user",
            password="pass")
        createTables()
        break
    except:
        print("Waiting for postgres to be ready")
        time.sleep(1)

# create a cursor
cur = conn.cursor()


# creando clases


class Register(BaseModel):
    username: str
    password: str
    email: str
    name: str

class Registerjuego(BaseModel):
    nombre: str
    tiempo_juego: int
    ubicacion: str
    estado: str

class Login(BaseModel):
    username: str
    password: str

class Juego(BaseModel):
    id: int
    nombre: str
    tiempo_juego: int
    ubicacion: str
    estado: str

class Cola(BaseModel):
    id_entradas: int
    id_juegos: str

class Registercola(BaseModel):
    id_entradas: int
    id_juegos: str


#Get usuarios 
 

@app.get("/users", tags=["users"], status_code=200, responses={
    200: {
        "description": "List of users",
        "content": {
            "application/json": {
                "example": {
                    "message": [{
                        "id": 1,
                        "username": "user",
                        "password": "pass",
                        "email": "user@usm.cl",
                        "name": "user",
                    }]
                }
            }
        }
    }})
def read_users():
    # execute query
    cur.execute('SELECT * FROM users')
    # fetch the result
    result = cur.fetchall()
    return {"message": result}



    
def query_db(query, args=(), one=False):
    cur.execute(query, args)
    r = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
    #cur.connection.close()
    return (r[0] if r else None) if one else r


#lectura de juegos
@app.get("/Getjuego", tags=["juego"], status_code=200, responses={
    200: {
        "description": "List of juego",
        "content": {
            "application/json": {
                "example": {
                    "message": [{
                        "id": 1,
                        "nombre": "Tazita",
                        "tiempo_juego": 1,
                        "ubicacion": "12,13",
                        "estado": "bueno",
                    }]
                }
            }
        }
    }})
async def read_juego():
    result = query_db('SELECT * FROM juego',())
    output = json.dumps(result) 
    return {"message": output}


#Lectura de juegos por id
@app.get("/Getjuego_id/{id_juego}", status_code=200, responses={
    200: {
        "description": "List of juego",
        "content": {
            "application/json": {
                "example": {
                    "message": [{
                        "id": 1,
                        "nombre": "Tazita",
                        "tiempo_juego": 1,
                        "ubicacion": "12,13",
                        "estado": "bueno",
                    }]
                }
            }
        }
    }})
async def read_juego(id_juego: int):
    result = query_db('SELECT * FROM juego where id_juego = %s',(id_juego,))
    output = json.dumps(result) 
    return {"message": output}




# Borrar Juegos.
@app.delete("/Deletejuego/{id_juego}", status_code=200)
async def delete_juego(id_juego: int):
    cur.execute('DELETE from juego where id_juego = %s;',(id_juego,))
    return('message: result')



'''
@app.delete("/Deletejuego/{eventid}")
async def delete_juego(eventid):
    # execute query
    cur.execute('DELETE from juego where id_juego = %s;',(eventid))
    result = cur.fetchone()
    return {result}
'''






@app.post("/register", status_code=201, tags=["users"], responses={
    201: {
        "description": "User created successfully",
        "content": {
            "application/json": {
                "example": {
                    "message": "User created successfully"
                }
            }
        }
    },
    400: {
        "description": "User already exists",
        "content": {
            "application/json": {
                "example": {
                    "message": "User already exists"
                }
            }
        }
    },
    500: {
        "description": "User created successfully",
        "content": {
            "application/json": {
                "example": {
                    "message": "Internal server error"
                }
            }
        }
    }


})
async def register_user(item: Register):
    # execute query
    try:
        # check if user exists
        cur.execute('SELECT * FROM users WHERE username = %s',
                    (item.username,))
        result = cur.fetchone()
        if result:
            return JSONResponse(status_code=400, content={"message": "User already exists"})
        cur.execute('INSERT INTO users (username, password, email, name) VALUES (%s, %s, %s, %s)',
                    (item.username, item.password, item.email, item.name))
        # TODO: encrypt password
        conn.commit()
        return JSONResponse(status_code=201, content={"message": "User created successfully"})
    except Exception as e:
        print(e)
        return JSONResponse(status_code=500, content={"message": "Internal server error"})

@app.post("/register_juego", status_code=200, tags=["juego"], responses={
    200: {
        "description": "User logged in successfully",
        "content": {
            "application/json": {
                "example": {
                    "message": "User logged in successfully"
                }
            }
        }
    },
    400: {
        "description": "User not found",
        "content": {
            "application/json": {
                "example": {
                    "message": "User not found"
                }
            }
        }
    },
    500: {
        "description": "Internal server error",
        "content": {
            "application/json": {
                "example": {
                    "message": "Internal server error"
                }
            }
        }
    }
})
async def register_juego(item: Registerjuego):
    # execute query
    try:
        # check if juego exists
        cur.execute('SELECT * FROM juego WHERE nombre = %s',
                    (item.nombre,))
        result = cur.fetchone()
        if result:
            return JSONResponse(status_code=400, content={"message": "juego already exists"})
        cur.execute('INSERT INTO juego (nombre, tiempo_juego, ubicacion, estado) VALUES (%s, %s, %s, %s)',
                    (item.nombre, item.tiempo_juego, item.ubicacion, item.estado))
        # TODO: encrypt password
        conn.commit()
        return JSONResponse(status_code=201, content={"message": "User created successfully"})
    except Exception as e:
        print(e)
        return JSONResponse(status_code=500, content={"message":  "Internal server error"})


@app.post("/login", status_code=200, tags=["users"], responses={
    200: {
        "description": "User logged in successfully",
        "content": {
            "application/json": {
                "example": {
                    "message": "User logged in successfully"
                }
            }
        }
    },
    400: {
        "description": "User not found",
        "content": {
            "application/json": {
                "example": {
                    "message": "User not found"
                }
            }
        }
    },
    500: {
        "description": "Internal server error",
        "content": {
            "application/json": {
                "example": {
                    "message": "Internal server error"
                }
            }
        }
    }
})
async def login_user(item: Login, response: Response):
    # execute query
    try:
        # check if user exists
        cur.execute('SELECT * FROM users WHERE username = %s AND password = %s',
                    (item.username, item.password))
        result = cur.fetchone()
        if result:
            return {"message": "User logged in successfully"}
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": "User not found"}
    except Exception as e:
        print(e)
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {"message": "error"}
    


@app.post("/register_cola", status_code=200)

async def register_cola(item: Registercola):
    # execute query
    try:
        # check if juego exists
        cur.execute('SELECT * FROM Cola WHERE id_entradas = %s AND id_juegos = %s',
                    (item.id_entradas,item.id_juegos))
        result = cur.fetchone()
        if result:
            return JSONResponse(status_code=400, content={"message": "Cola already exists"})
        cur.execute('INSERT INTO Cola (id_entradas, id_juegos) VALUES (%s, %s)',
                    (item.id_entradas, item.id_juegos))
        # TODO: encrypt password
        conn.commit()
        return JSONResponse(status_code=201, content={"message": "Cola created successfully"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"message":  "Internal server error"})









#Update juego.
@app.put("/update_juego", status_code=200, tags=["juego"])
async def create_or_update_juego(item: Juego):
    result = query_db('UPDATE juego SET nombre = %s, tiempo_juego = %s, ubicacion = %s, estado = %s where id_juego = %s;',((item.nombre, item.tiempo_juego, item.ubicacion, item.estado, item.id)))
    return('message: result')