# Grupo 06

Este es el repositorio del grupo 6, cuyos integrantes son:

- Integrante 1: Esteban Carrasco
- Integrante 2: Francisco Muñoz
- Integrante 3: Bastian Varas
- Tutor: Pablo Ulloa

# Wiki

Puede acceder a la wiki mediante el siguiente enlace.

https://gitlab.inf.utfsm.cl/pulloa/inf225-2022-2-grupo-06/-/wikis/Wiki

# Videos

- Reunion con el Cliente: https://aula.usm.cl/mod/resource/view.php?id=3659567

- Presentación Grupo: https://youtu.be/F4jWcW9U8R4

## Clonar el repositorio

Lo primero es generar una llave ssh (el siguiente tutorial se realizó en macOS, pero deberia funcionar con linux sin problemas)

* Abre un terminal y ejecuta el comando `ssh-keygen -t ed25519 -C "<comment>"`  
* presiona enter tres veces para dejar el nombre del archivo por defecto
* Te aparecera un mensaje como el siguiente `Your public key has been saved in /Users/javierperez/.ssh/id_ed25519.pub`
* Luego ejecuta `nano /Users/javierperez/.ssh/id_ed25519.pub` (cambiar el nombre de usuario por el tuyo)
* Copiar el contenido del archivo y pegarlo en tu perfil de gitlab en la sección de ssh keys
* Ahora ya puedes clonar sin problemas

Lo siguiente es clonar el repositorio, para ello debes hacer click en el botón de arriba a la derecha que dice clone, y copiar la url que aparece junto a Clone with SSH.

Ahora en tu computador debes abrir la terminal y ejecutar el siguiente comando:  

```bash
# remplaza nombreDeUsuario por tu nombre de usuario de gitlab
git clone git@gitlab.inf.utfsm.cl:javier.perez/codebase-isw-2022-2.git
```

## Trabajando con docker

Para trabajar con docker debes tener instalado docker y docker-compose en tu computador, para ello puedes seguir las instrucciones de la página oficial de docker.

Una vez instalado docker y docker-compose debes ejecutar el siguiente comando en la raíz del proyecto:

```bash
docker-compose up
```

## Git y sus ramas

Les recomendamos trabajar con ramas de la siguiente forma

* main: rama principal, solo se debe hacer merge de ramas de dev, nunca hacer commits directamente en esta rama.
* dev: rama de desarrollo, se debe hacer merge de las ramas de feature, nunca hacer commits directamente en esta rama. Cuando tengan una versión estable de su proyecto y lista para presentar en sus entregables, deben hacer un merge de dev a main.
* feature: Por cada feature que se vaya a implementar se debe crear una rama de feature, una vez que se termine la feature se debe hacer merge a la rama de dev.  

De esta forma, cuando revisemos sus tareas, unicamente revisaremos el merge mas reciente a la rama main.  

## Trabajando de forma simultanea

Muchas veces ocurrira que esten trabajando en varias features al mismo tiempo, esto provocara que se generen conflictos al momento de hacer merge a la rama dev. Para evitar esto, les recomendamos que trabajen de la siguiente forma:

* Cuando vayan a trabajar en una feature, deben hacer un pull de la rama dev, para tener los ultimos cambios.

* Cuando terminen de trabajar en una feature, deben hacer un push de la rama feature, para que sus compañeros puedan tener los ultimos cambios.

* Cuando terminen de trabajar en una feature, deben hacer un merge de la rama feature a la rama dev, para que sus compañeros puedan tener los ultimos cambios.

* Cuando terminen de trabajar en una feature, deben hacer un pull de la rama dev, para tener los ultimos cambios.

* Ahora en las otras ramas de feature, deben hacer un pull de la rama dev, para tener los ultimos cambios.

* Luego deben ejecutar un rebase de la rama feature, para que sus cambios se apliquen sobre los ultimos cambios de la rama dev, esto se hace con el siguiente comando: git rebase dev

* Se les recomienda encarecidamente que realicen los rebase desde vs code, para poder tener una GUI al momendo de resolver conflictos, vs code les mostrará todos los conflictos por cada archivo modificado y deberán elegir que cambios se mantienen y cuales se descartan.

* Luego hacer commit de los cambios y push de la rama feature.

## Datos db 
```py
host="postgres",
database="isw",
user="user",
password="pass"

```
