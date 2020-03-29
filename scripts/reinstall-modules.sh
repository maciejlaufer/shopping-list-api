#!/bin/bash

sudo docker-compose down

sudo docker rmi api_nest

sudo docker volume rm api_sa-modules

sudo docker-compose up