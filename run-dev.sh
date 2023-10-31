#!/bin/bash

# Navigate to server directory
cd server

# Start the server in the background
python run.py &

# Capture the PID of the server process
SERVER_PID=$!

# Give the server a few seconds to start up
sleep 5

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
