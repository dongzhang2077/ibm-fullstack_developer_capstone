FROM python:3.12.0-slim-bookworm

# Install Node.js for building React frontend
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV PYTHONBUFFERED 1
ENV PYTHONWRITEBYTECODE 1
ENV APP=/app

# Change the workdir.
WORKDIR $APP

# Copy and install Python requirements
COPY requirements.txt $APP
RUN pip3 install -r requirements.txt

# Copy the rest of the files
COPY . $APP

# Build React frontend
WORKDIR $APP/frontend
RUN npm install && npm run build

# Go back to app directory
WORKDIR $APP

# Create directory for database and set permissions
RUN mkdir -p /app/data && \
    chmod 777 /app/data && \
    chmod +x /app/entrypoint.sh

# Collect static files
RUN python manage.py collectstatic --noinput

EXPOSE 8000

ENTRYPOINT ["/bin/bash","/app/entrypoint.sh"]
CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "djangoproj.wsgi"]
