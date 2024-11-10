#!/bin/bash
# Generate CCP
function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORGNAME}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        template/ccp-template.json
}

ORGNAME=${ORG1_NAME}
P0PORT=${PEER0_ORG1_PORT}
CAPORT=${HOST1_CAPORT}
PEERPEM=./crypto-config/peerOrganizations/${ORG1_DOMAIN}/tlsca/tlsca.${ORG1_DOMAIN}-cert.pem
CAPEM=./crypto-config/peerOrganizations/${ORG1_DOMAIN}/ca/ca.${ORG1_DOMAIN}-cert.pem

echo "$(json_ccp $ORGNAME $P0PORT $CAPORT $PEERPEM $CAPEM)" > ./crypto-config/peerOrganizations/${ORG1_DOMAIN}/connection-${ORG1_NAME}.json

ORGNAME=${ORG2_NAME}
P0PORT=${PEER0_ORG2_PORT}
CAPORT=${HOST3_CAPORT}
PEERPEM=./crypto-config/peerOrganizations/${ORG2_DOMAIN}/tlsca/tlsca.${ORG2_DOMAIN}-cert.pem
CAPEM=./crypto-config/peerOrganizations/${ORG2_DOMAIN}/ca/ca.${ORG2_DOMAIN}-cert.pem

echo "$(json_ccp $ORGNAME $P0PORT $CAPORT $PEERPEM $CAPEM)" > ./crypto-config/peerOrganizations/${ORG2_DOMAIN}/connection-${ORG2_NAME}.json