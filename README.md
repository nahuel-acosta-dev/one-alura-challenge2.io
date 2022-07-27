# Demo sixLives (Django + MySql + React)

sixLives es un juego del ahorcado en el que podras jugar solo o invitar a
otras personas a descubrir las palabras que creaste

## Instalacion

La aplicacion fue contruida sobre python 3.9,
y React 17.

# `Django Backend`

Para instalar el backend necesitara tener instalado python en su version 3, debera tener MySql en su computadora preparado para correrlo.
Posteriormente ubicarse en la carpeta backend, activar su entorno virtual si es que desea instalar los paquetes sobre uno.
y ejecutar:

```bash
  pip install -r requirements.txt
```

# `React FrontEnd`

Debera ubicarse en la carpeta frontend y ejecutar:

```bash
  npm install
```

## Correr Aplicacion

### Django

para correr django debera tener iniciado su servidor MySql, ademas de tener creada una base de datos llamada hangman y ejecutar en su terminal:

```bash
  python manage.py runserver
```

### React

para correr react podra hacerlo ejecutando:

```bash
  npm start
```

# Caracteristicas

- Registrarse, inicar sesion y cambiar contraseña
- Crear nuevas palabras
- jugar solo con palabras aleatorias
- crear palabras para que un compañero la descubra de forma local
- invitar y recibir invitaciones de forma online

## Bugs
El juego del ahorcado tiene ciertos problemas al mostrar las imagenes svg por lo menos en edge y chrome, se recomienda usar mozilla firefox.
Los problemas estan en proceso de solucion.
