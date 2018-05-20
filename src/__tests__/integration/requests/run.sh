#!/bin/sh

yarn install
pipenv install --dev --skip-lock
pipenv run yarn test