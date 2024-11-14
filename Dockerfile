# Use an official Python runtime as a parent image
FROM python:3.10-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Instala dependencias del sistema necesarias
RUN apk update && \
    apk add --no-cache gcc musl-dev libffi-dev openssl-dev cargo

# Install pipenv
RUN pip install pipenv

# Copy the Pipfile and Pipfile.lock to the container
COPY Pipfile Pipfile.lock /app/

# Install project dependencies
RUN pipenv install --deploy --ignore-pipfile

# Copy the current directory contents into the container at /app/
COPY ./gestion_filas /app/gestion_filas/

# Expose port 8000 for Django
EXPOSE 8000

# Run migrations and start the Django development server
CMD /bin/sh -c "pipenv run python ./gestion_filas/manage.py migrate && \
pipenv run python -c \"from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'admin@example.com', '1234') if not User.objects.filter(username='admin').exists() else None\" && \
pipenv run python ./gestion_filas/manage.py runserver 0.0.0.0:8000"
