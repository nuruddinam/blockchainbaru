CHAINCODE_VERSION="v1"

# Install chaincodes on peer0.org1Name.example.com host (main)
docker exec cli peer lifecycle chaincode install ./channel-artifacts/${CHAINCODE_NAME}.tar.gz
# Install chaincodes on peer1.org1Name.example.com host
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/${ORG1_DOMAIN}/users/Admin@${ORG1_DOMAIN}/msp -e CORE_PEER_ADDRESS=${PEER1_ORG1_CORE_ADDRESS} -e CORE_PEER_LOCALMSPID="${ORG1_MSPNAME}" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/${ORG1_DOMAIN}/peers/${PEER1_ORG1_DOMAIN}/tls/ca.crt cli peer lifecycle chaincode install ./channel-artifacts/${CHAINCODE_NAME}.tar.gz
# Install chaincodes on peer0.org2Name.example.com host
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/${ORG2_DOMAIN}/users/Admin@${ORG2_DOMAIN}/msp -e CORE_PEER_ADDRESS=${PEER0_ORG2_CORE_ADDRESS} -e CORE_PEER_LOCALMSPID="${ORG2_MSPNAME}" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/${ORG2_DOMAIN}/peers/${PEER0_ORG2_DOMAIN}/tls/ca.crt cli peer lifecycle chaincode install ./channel-artifacts/${CHAINCODE_NAME}.tar.gz