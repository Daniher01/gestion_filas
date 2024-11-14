# Usa una imagen oficial de Python como imagen base
FROM python:3.11-alpine

# Establece variables de entorno
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Define el directorio de trabajo en el contenedor
WORKDIR /app

# Instala dependencias del sistema necesarias
RUN apk update && \
    apk add --no-cache gcc musl-dev libffi-dev openssl-dev cargo python3-dev postgresql-dev

# Instala pipenv
RUN pip install pipenv

# Copia el Pipfile y Pipfile.lock al contenedor
COPY Pipfile Pipfile.lock /app/

# Instala las dependencias del proyecto
RUN pipenv install --deploy --ignore-pipfile --skip-lock

# Copia el contenido del directorio gestion_filas en el contenedor
COPY ./gestion_filas /app/gestion_filas/

# Expone el puerto 8000 para Django
EXPOSE 8000

# Ejecuta las migraciones, crea el superusuario si no existe y arranca el servidor
CMD /bin/sh -c "pipenv run python ./gestion_filas/manage.py migrate && \
pipenv run python -c \"from django.contrib.auth import get_user_model; User = get_user_model(); if not User.objects.filter(username='admin').exists(): User.objects.create_superuser('admin', 'admin@example.com', '1234')\" && \
pipenv run python ./gestion_filas/manage.py runserver 0.0.0.0:8000"
