<h1>Backend</h1>

### Crear un archivo .env en Backend con los siguientes parámetros:
## Llenar con cuenta de mailtrap

```
PORT=3000

DATABASE_NAME='light_it_challenge'
DATABASE_USER='root'
DATABASE_PASSWORD=1234
DATABASE_HOST='localhost'

MAILTRAP_HOST='sandbox.smtp.mailtrap.io'
MAILTRAP_USER=
MAILTRAP_PASS=
MAILTRAP_RECEIVER=
```

### Crear un archivo .env en Frontend con los siguientes parámetros:

```
VITE_BACKEND_URL="http://localhost:3000"
```

### Correr los siguientes comandos para docker desde el root:

```
docker pull mysql:latest
```

```
docker build --file=Backend/backend.dockerfile -t backend .
```

```
docker build --file=Frontend/frontend.dockerfile -t frontend .
```

```
docker-compose -f docker-compose.yml up
```