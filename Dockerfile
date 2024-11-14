# Use an official Python runtime as a parent image
FROM python:3.11-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Instala dependencias del sistema necesarias
RUN apk update && \
    apk add --no-cache gcc musl-dev libffi-dev openssl-dev cargo python3-dev postgresql-dev

# Install pipenv
RUN pip install pipenv

# Copy the Pipfile and Pipfile.lock to the container
COPY Pipfile Pipfile.lock /app/

# Install project dependencies
RUN pipenv install --deploy --ignore-pipfile --skip-lock

# Copy the current directory contents into the container at /app/
COPY ./gestion_filas /app/gestion_filas/

# Copia el script entrypoint
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh


# Expose port 8000 for Django
EXPOSE 8000

# Usa el script de entrypoint
ENTRYPOINT ["/entrypoint.sh"]
