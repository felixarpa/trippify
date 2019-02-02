#!/usr/bin/env bash
echo '[Trippify] Shutting down last containers'
docker-compose down
echo '[Trippify] Building and kicking off containers'
docker-compose up -d --build