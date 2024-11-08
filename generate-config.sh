#!/bin/bash

# Load environment variables from .env
source ./export-env.sh
# Process .env file and clean variables

envsubst < ./template/crypto-config-template.yaml | sed 's/[[:space:]]*$//' > crypto-config.yaml
envsubst < ./template/configtx-template.yaml | sed 's/[[:space:]]*$//' > configtx.yaml