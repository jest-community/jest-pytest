#!/bin/sh
cd simple && ./run.sh && cd .. && cd requests && ./run.sh && cd .. && cd flask && make test && cd .. && cd home-assistant && ./run.sh