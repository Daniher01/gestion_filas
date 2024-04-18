#!/bin/sh
pipenv run python ./gestion_filas/manage.py migrate
pipenv run python ./gestion_filas/manage.py runserver 0.0.0.0:8000