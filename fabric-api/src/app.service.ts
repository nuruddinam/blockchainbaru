import { BadRequestException, Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { UpdateStatusDoDto } from './dto/update-status-do.dto';

const execPromisify = promisify(exec);

@Injectable()
export class AppService {
  async requestDo(data: string) {
    const parsedData = data.replace(/"/g, '\\"');
    const command = `docker exec cli peer chaincode invoke -o 10.239.54.32:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C dochannel -n chaincodes --peerAddresses 10.239.54.32:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses peer0.org2.co.com:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt --peerAddresses 10.239.54.38:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.sl.com/peers/peer0.org3.sl.com/tls/ca.crt --peerAddresses 10.239.54.39:10051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.to.com/peers/peer0.org4.to.com/tls/ca.crt --peerAddresses 10.239.54.33:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.inaport.com/peers/peer0.org5.inaport.com/tls/ca.crt --peerAddresses 10.239.54.23:12051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org6.bank.com/peers/peer0.org6.bank.com/tls/ca.crt -c '{\"Args\": [\"DOContract:requestDO\", \"${parsedData}\"]}'`;
    try {
      const {stdout, stderr} = await execPromisify(command)
      if (stderr.includes('Chaincode invoke successful')) {
        // Extract the payload
        const resultMatch = stderr.match(/payload:"(.*)"/);
        // Parse the payload JSON
        const resultJson = JSON.parse(resultMatch[1].replace(/\\"/g, '"'));
        return resultJson;
      } else {
        throw new Error(stderr);
      }
    } catch (error) {
      throw new BadRequestException("Failed to Request DO:", error.message)
    }
  }

  async getAllDo() {
    const command = `docker exec cli peer chaincode query -n chaincodes -C dochannel -c '{"Args": ["DOContract:queryAllOrders", "{}"]}'`
    try {
      const {stdout, stderr} = await execPromisify(command);
      if (stderr) {
        throw new Error(stderr)
      }
      return JSON.parse(stdout);
    } catch (error) {
      throw new BadRequestException('Failed to query all DO', error.message)
    }
  }

  async getStatusDo(orderId: string) {
    const command = `docker exec cli peer chaincode query -n chaincodes -C dochannel -c '{"Args": ["DOContract:getStatusDO", \"${orderId}\"]}'`
    try {
      const {stdout, stderr} = await execPromisify(command);
      if (stderr) {
        throw new Error(stderr)
      }
      return JSON.parse(stdout);
    } catch (error) {
      throw new BadRequestException("Failed to get status DO", error.message)
    }
  }

  async updateStatusDoCo(orderId: string, data: UpdateStatusDoDto) {
    const {status, note} = data
    const command = `docker exec cli peer chaincode invoke -o 10.239.54.32:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C dochannel -n chaincodes --peerAddresses 10.239.54.32:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses peer0.org2.co.com:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt --peerAddresses 10.239.54.38:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.sl.com/peers/peer0.org3.sl.com/tls/ca.crt --peerAddresses 10.239.54.39:10051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.to.com/peers/peer0.org4.to.com/tls/ca.crt --peerAddresses 10.239.54.33:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.inaport.com/peers/peer0.org5.inaport.com/tls/ca.crt --peerAddresses 10.239.54.23:12051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org6.bank.com/peers/peer0.org6.bank.com/tls/ca.crt -c '{\"Args\": ["DOContract:updateStatusDO", \"${orderId}\", \"${status}\", \"${note}\"]}'`;
    try {
      const {stdout, stderr} = await execPromisify(command)
      if (stderr.includes('Chaincode invoke successful')) {
        // Extract the payload
        const resultMatch = stderr.match(/payload:"(.*)"/);
        // Parse the payload JSON
        const resultJson = JSON.parse(resultMatch[1].replace(/\\"/g, '"'));
        return resultJson;
      } else {
        throw new Error(stderr);
      }
    } catch (error) {
      throw new BadRequestException("Failed to Update Status DO:", error.message)
    }
  }

  async updateStatusDoSl(orderId: string, data: UpdateStatusDoDto) {
    const {status, note} = data
    const command = `docker exec cli peer chaincode invoke -o 10.239.54.32:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C dochannel -n chaincodes --peerAddresses 10.239.54.32:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses 10.239.54.36:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt --peerAddresses peer0.org3.sl.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.sl.com/peers/peer0.org3.sl.com/tls/ca.crt --peerAddresses 10.239.54.39:10051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.to.com/peers/peer0.org4.to.com/tls/ca.crt --peerAddresses 10.239.54.33:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.inaport.com/peers/peer0.org5.inaport.com/tls/ca.crt --peerAddresses 10.239.54.23:12051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org6.bank.com/peers/peer0.org6.bank.com/tls/ca.crt -c '{"Args": ["DOContract:updateStatusDO", \"${orderId}\", \"${status}\", \"${note}\"]}'`
    try {
      const {stdout, stderr} = await execPromisify(command)
      if (stderr.includes('Chaincode invoke successful')) {
        // Extract the payload
        const resultMatch = stderr.match(/payload:"(.*)"/);
        // Parse the payload JSON
        const resultJson = JSON.parse(resultMatch[1].replace(/\\"/g, '"'));
        return resultJson;
      } else {
        throw new Error(stderr);
      }
    } catch (error) {
      throw new BadRequestException("Failed to Update Status DO:", error.message)
    }
  }

  async updateDoCo(orderId: string, data: string) {
    const parsedData = data.replace(/"/g, '\\"');
    const command = `docker exec cli peer chaincode invoke -o 10.239.54.32:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C dochannel -n chaincodes --peerAddresses 10.239.54.32:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses peer0.org2.co.com:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt --peerAddresses 10.239.54.38:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.sl.com/peers/peer0.org3.sl.com/tls/ca.crt --peerAddresses 10.239.54.39:10051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.to.com/peers/peer0.org4.to.com/tls/ca.crt --peerAddresses 10.239.54.33:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.inaport.com/peers/peer0.org5.inaport.com/tls/ca.crt --peerAddresses 10.239.54.23:12051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org6.bank.com/peers/peer0.org6.bank.com/tls/ca.crt -c '{\"Args\": [\"DOContract:updateDO\", \"${orderId}\",\"${parsedData}\"]}'`;
    try {
      const {stdout, stderr} = await execPromisify(command)
      if (stderr.includes('Chaincode invoke successful')) {
        // Extract the payload
        const resultMatch = stderr.match(/payload:"(.*)"/);
        // Parse the payload JSON
        const resultJson = JSON.parse(resultMatch[1].replace(/\\"/g, '"'));
        return resultJson;
      } else {
        throw new Error(stderr);
      }
    } catch (error) {
      throw new BadRequestException("Failed to Update DO:", error.message)
    }
  }
  
  async updateDoSl(orderId: string, data: string) {
    const parsedData = data.replace(/"/g, '\\"');
    const command = `docker exec cli peer chaincode invoke -o 10.239.54.32:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C dochannel -n chaincodes --peerAddresses 10.239.54.32:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses 10.239.54.36:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt --peerAddresses peer0.org3.sl.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.sl.com/peers/peer0.org3.sl.com/tls/ca.crt --peerAddresses 10.239.54.39:10051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.to.com/peers/peer0.org4.to.com/tls/ca.crt --peerAddresses 10.239.54.33:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.inaport.com/peers/peer0.org5.inaport.com/tls/ca.crt --peerAddresses 10.239.54.23:12051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org6.bank.com/peers/peer0.org6.bank.com/tls/ca.crt -c '{"Args": ["DOContract:updateDO", \"${orderId}\", \"${parsedData}\"]}'`
    try {
      const {stdout, stderr} = await execPromisify(command)
      if (stderr.includes('Chaincode invoke successful')) {
        // Extract the payload
        const resultMatch = stderr.match(/payload:"(.*)"/);
        // Parse the payload JSON
        const resultJson = JSON.parse(resultMatch[1].replace(/\\"/g, '"'));
        return resultJson;
      } else {
        throw new Error(stderr);
      }
    } catch (error) {
      throw new BadRequestException("Failed to Update DO:", error.message)
    }
  } 

  async releaseDo(orderId: string) {
    const command = `docker exec cli peer chaincode invoke -o 10.239.54.32:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C dochannel -n chaincodes --peerAddresses 10.239.54.32:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses 10.239.54.36:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt --peerAddresses peer0.org3.sl.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.sl.com/peers/peer0.org3.sl.com/tls/ca.crt --peerAddresses 10.239.54.39:10051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.to.com/peers/peer0.org4.to.com/tls/ca.crt --peerAddresses 10.239.54.33:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.inaport.com/peers/peer0.org5.inaport.com/tls/ca.crt --peerAddresses 10.239.54.23:12051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org6.bank.com/peers/peer0.org6.bank.com/tls/ca.crt -c '{"Args": ["DOContract:releaseDO", \"${orderId}\"]}'`
    try {
      const {stdout, stderr} = await execPromisify(command)
      if (stderr.includes('Chaincode invoke successful')) {
        // Extract the payload
        const resultMatch = stderr.match(/payload:"(.*)"/);
        // Parse the payload JSON
        const resultJson = JSON.parse(resultMatch[1].replace(/\\"/g, '"'));
        return resultJson;
      } else {
        throw new Error(stderr);
      }
    } catch (error) {
      throw new BadRequestException("Failed to Release DO:", error.message)
    }
  }

  async rejectDo(orderId: string) {
    const command = `docker exec cli peer chaincode invoke -o 10.239.54.32:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C dochannel -n chaincodes --peerAddresses 10.239.54.32:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses 10.239.54.36:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt --peerAddresses peer0.org3.sl.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.sl.com/peers/peer0.org3.sl.com/tls/ca.crt --peerAddresses 10.239.54.39:10051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.to.com/peers/peer0.org4.to.com/tls/ca.crt --peerAddresses 10.239.54.33:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.inaport.com/peers/peer0.org5.inaport.com/tls/ca.crt --peerAddresses 10.239.54.23:12051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org6.bank.com/peers/peer0.org6.bank.com/tls/ca.crt -c '{"Args": ["DOContract:rejectDO", \"${orderId}\"]}'`
    try {
      const {stdout, stderr} = await execPromisify(command)
      if (stderr.includes('Chaincode invoke successful')) {
        // Extract the payload
        const resultMatch = stderr.match(/payload:"(.*)"/);
        // Parse the payload JSON
        const resultJson = JSON.parse(resultMatch[1].replace(/\\"/g, '"'));
        return resultJson;
      } else {
        throw new Error(stderr);
      }
    } catch (error) {
      throw new BadRequestException("Failed to Reject DO:", error.message)
    }
  }

  async getDoByOrderId(orderId: string) {
    const command = `docker exec cli peer chaincode query -n chaincodes -C dochannel -c '{"Args": ["DOContract:queryOrderById", \"${orderId}\"]}'`
    try {
      const {stdout, stderr} = await execPromisify(command);
      if (stderr) {
        throw new Error(stderr)
      }
      return JSON.parse(stdout);
    } catch (error) {
      throw new BadRequestException("Failed to Get DO Data By Order Id", error.message)
    }
  }

  async getDoRelease() {
    const command = `docker exec cli peer chaincode query -n chaincodes -C dochannel -c '{"Args": ["DOContract:queryAllOrdersRelease", "{}"]}'`
    try {
      const {stdout, stderr} = await execPromisify(command);
      if (stderr) {
        throw new Error(stderr)
      }
      return JSON.parse(stdout);
    } catch (error) {
      throw new BadRequestException("Failed to Get DO Release", error.message)
    }
  }

  async getAllDoCo(coName: string) {
    const command = `docker exec cli peer chaincode query -n chaincodes -C dochannel -c '{"Args": ["DOContract:queryAllOrdersCO", \"${coName}\"]}'`
    try {
      const {stdout, stderr} = await execPromisify(command);
      if (stderr) {
        throw new Error(stderr)
      }
      return JSON.parse(stdout);
    } catch (error) {
      throw new BadRequestException('Failed to query all DO CO', error.message)
    }
  }

  async getAllDoSl(slName: string) {
    const parsedData = slName.replace(/"/g, '\\"');
    const command = `docker exec cli peer chaincode query -n chaincodes -C dochannel -c '{"Args": ["DOContract:queryAllOrdersSL", \"${parsedData}\"]}'`
    try {
      const {stdout, stderr} = await execPromisify(command);
      if (stderr) {
        throw new Error(stderr)
      }
      return JSON.parse(stdout);
    } catch (error) {
      throw new BadRequestException('Failed to query all DO SL', error.message)
    }
  }
}
