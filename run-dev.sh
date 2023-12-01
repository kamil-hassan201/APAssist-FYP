#!/bin/bash

# Kill process on port 5000 if exists
PORT=5000
PID=$(lsof -t -i:$PORT)
if [ -n "$PID" ]; then
    echo "Killing process on port $PORT..."
    kill $PID
    sleep 2 # Give it some time to release the port
fi

# Navigate to server directory
cd server

# Start the server in the background
python run.py &

# Capture the PID of the server process
SERVER_PID=$!

# Give the server a few seconds to start up
sleep 7

# Check if the server process is still running
if ps -p $SERVER_PID > /dev/null; then
    echo "Server started successfully. Starting the client..."

    # Navigate to the client directory
    cd ../client

    # Start the client in the foreground
    yarn dev
else
    echo "Failed to start the server. Exiting."
    exit 1
fi
