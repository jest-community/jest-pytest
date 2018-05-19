#!/bin/sh

pip install pipenv
pipenv install --dev
pipenv run yarn test