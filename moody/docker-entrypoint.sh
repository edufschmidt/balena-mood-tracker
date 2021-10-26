#! /usr/bin/sh

cd api && npx mikro-orm schema:update --run

exec "$@"
