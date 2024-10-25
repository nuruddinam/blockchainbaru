# Create channel
docker exec cli peer channel create -o orderer.example.com:7050 -c dochannel -f ./channel-artifacts/channel.tx --outputBlock ./channel-artifacts/dochannel.block --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

sleep 5

# menambahkan peer0.org1Name.example.com ke dalam channel
docker exec cli peer channel join -b ./channel-artifacts/dochannel.block
# update peer0.org1Name.example.com 
docker exec cli peer channel update -o orderer.example.com:7050 -c dochannel -f ./channel-artifacts/Org1MSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

# menambahkan peer1.org1Name.example.com ke dalam channel
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1Name.example.com/users/Admin@org1Name.example.com/msp -e CORE_PEER_ADDRESS=10.239.54.36:8051 -e CORE_PEER_LOCALMSPID="Org1NameMSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1Name.example.com/peers/peer1.org1Name.example.com/tls/ca.crt cli peer channel join -b ./channel-artifacts/dochannel.block
# update peer1.org1Name.example.com
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1Name.example.com/users/Admin@org1Name.example.com/msp -e CORE_PEER_ADDRESS=10.239.54.36:8051 -e CORE_PEER_LOCALMSPID="Org1NameMSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1Name.example.com/peers/peer1.org1Name.example.com/tls/ca.crt cli peer channel update -o orderer.example.com:7050 -c dochannel -f ./channel-artifacts/Org1NameMSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

# menambahkan peer0.org2Name.example.com ke dalam channel
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2Name.example.com/users/Admin@org2Name.example.com/msp -e CORE_PEER_ADDRESS=10.239.54.38:9051 -e CORE_PEER_LOCALMSPID="Org2NameMSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2Name.example.com/peers/peer0.org2Name.example.com/tls/ca.crt cli peer channel join -b ./channel-artifacts/dochannel.block
# update peer0.org2Name.example.com
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2Name.example.com/users/Admin@org2Name.example.com/msp -e CORE_PEER_ADDRESS=10.239.54.38:9051 -e CORE_PEER_LOCALMSPID="Org2NameMSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2Name.example.com/peers/peer0.org2Name.example.com/tls/ca.crt cli peer channel update -o orderer.example.com:7050 -c dochannel -f ./channel-artifacts/Org2NameMSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem