#!/bin/sh

# Aplica las migraciones
pipenv run python ./gestion_filas/manage.py migrate

# Crea el superusuario solo si no existe
pipenv run python -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', '1234')
"

# Inicia el servidor
pipenv run python ./gestion_filas/manage.py runserver 0.0.0.0:8000
