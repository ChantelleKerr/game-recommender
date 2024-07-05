#!/bin/bash

# Wait until Database is available before continuing
printf "\n" && echo "Checking Database is up"

# using psql
while ! pg_isready -q -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER
do
  echo "$(date) - waiting for database to start"
  sleep 1
done

echo "█████████████████████ POSTGRES IS READY █████████████████████"

echo "█████████████████████ APPLYING DB MIGRATIONS █████████████████████"
python manage.py migrate --noinput

# echo "Collecting static files"
# python manage.py collectstatic --noinput

# Create Django Superuser
echo "█████████████████████ CREATING DJANGO SUPERUSER █████████████████████"
python manage.py createsuperuser --noinput

# Run inbuilt Django server if ENV is development
if [ "${APP_ENV^^}" = "DEVELOPMENT" ]; then

    
    # Install extra non-prod packages
    printf "\n" && echo "█████████████████████ Installing dev dependencies for $APP_ENV █████████████████████"
    poetry install

    echo "█████████████████████ PRELOADING DATA OBJECTS █████████████████████"
    python manage.py preload_data
    echo "░░░░░░░░░░░░░░░░░░░░░ PRELOADING DATA OBJECTS COMPLETE ░░░░░░░░░░░░░░░░░░░░░"

    printf "\n" && echo "█████████████████████ ATTEMPTING TO RUN DJANGO SERVER █████████████████████"
    printf "\n" && echo "Starting inbuilt django webserver"
    python manage.py runserver 0.0.0.0:8000
    exit
fi