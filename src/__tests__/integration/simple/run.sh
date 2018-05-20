#!/bin/sh

yarn install
pipenv install --dev
pipenv run yarn test