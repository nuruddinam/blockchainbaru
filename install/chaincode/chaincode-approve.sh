#!/bin/bash

# Define variables
CHAINCODE_NAME="chaincodes"
CHANNEL_NAME="channelname"
VERSION="1"
SEQUENCE="1"
PACKAGE_ID="chaincodesv1:eaf28f1364bbe18784c4f585136529ff82e26d2a0e63207bbd46c0a53a0c082f"
ORDERER_CA="/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"

# Approve Chaincode on peer0.org1Name.example.com Host
docker exec cli peer lifecycle chaincode approveformyorg --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name $CHAINCODE_NAME --version $VERSION --sequence $SEQUENCE --waitForEvent --package-id $PACKAGE_ID

# Approve chaincode on peer1.org1Name.example.com Host
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1Name.example.com/users/Admin@org1Name.example.com/msp -e CORE_PEER_ADDRESS=10.239.54.36:8051 -e CORE_PEER_LOCALMSPID="Org1NameMSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1Name.example.com/peers/peer1.org1Name.example.com/tls/ca.crt cli peer lifecycle chaincode approveformyorg --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name $CHAINCODE_NAME --version $VERSION --sequence $SEQUENCE --waitForEvent --package-id $PACKAGE_ID

# Approve chaincode on peer0.org2Name.example.com Host
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2Name.example.com/users/Admin@org2Name.example.com/msp -e CORE_PEER_ADDRESS=10.239.54.38:9051 -e CORE_PEER_LOCALMSPID="Org2NameMSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2Name.example.com/peers/peer0.org2Name.example.com/tls/ca.crt cli peer lifecycle chaincode approveformyorg --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name $CHAINCODE_NAME --version $VERSION --sequence $SEQUENCE --waitForEvent --package-id $PACKAGE_ID
