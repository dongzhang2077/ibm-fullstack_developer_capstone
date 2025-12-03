#!/bin/sh

# Make migrations and migrate the database.
echo "Making migrations and migrating the database. "
python manage.py makemigrations --noinput
python manage.py migrate --noinput
python manage.py collectstatic --noinput

# Populate initial data
echo "Populating initial car data..."
python manage.py shell <<EOF
from djangoapp.populate import initiate
try:
    initiate()
    print("Initial data populated successfully")
except Exception as e:
    print(f"Data already exists or error: {e}")
EOF

exec "$@"
