#!/bin/bash

# Define variables
CHAINCODE_NAME="chaincodes"
CHANNEL_NAME="channelname"
VERSION="1"
SEQUENCE="1"
ORDERER_CA="/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"
PEER0_ORG1_ADDRESS="10.239.54.32:7051"
PEER0_ORG1_TLS_ROOTCERT="/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1Name.example.com/peers/peer0.org1Name.example.com/tls/ca.crt"
PEER1_ORG1_ADDRESS="10.239.54.36:8051"
PEER1_ORG1_TLS_ROOTCERT="/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1Name.example.com/peers/peer1.org1Name.example.com/tls/ca.crt"
PEER0_ORG2_ADDRESS="10.239.54.38:9051"
PEER0_ORG2_TLS_ROOTCERT="/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2Name.example.com/peers/peer0.org2Name.example.com/tls/ca.crt"

# Commit chaincode
docker exec cli peer lifecycle chaincode commit -o orderer.example.com:7050 --tls --cafile $ORDERER_CA \
  --peerAddresses $PEER0_ORG1_ADDRESS --tlsRootCertFiles $PEER0_ORG1_TLS_ROOTCERT \
  --peerAddresses $PEER1_ORG1_ADDRESS --tlsRootCertFiles $PEER1_ORG1_TLS_ROOTCERT \
  --peerAddresses $PEER2_ORG2_ADDRESS --tlsRootCertFiles $PEER0_ORG2_TLS_ROOTCERT \
  --channelID $CHANNEL_NAME --name $CHAINCODE_NAME --version $VERSION --sequence $SEQUENCE
