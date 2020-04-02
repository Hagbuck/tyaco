#!/bin/sh

mkdir keys
openssl genrsa -out keys/tyaco-private.pem 2048
#openssl rsa -in keys/tyaco-private.pem -pubout -out tyaco-public.pem
