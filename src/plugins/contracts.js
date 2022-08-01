import {
  abi as ROCKET_FACTORY_ABI,
  networks as ROCKET_FACTORY_NETWORK,
} from '../../build/contracts/Catapults.json'

let _contracts
export default function (
  { $web3, $web3Socket, $config: { NETWORK_ID, ROCKET_FACTORY_CONTRACT } },
  inject
) {
  _contracts = _setupContracts($web3, $web3Socket, {
    NETWORK_ID,
    ROCKET_FACTORY_CONTRACT,
  })
  inject('contracts', _contracts)
}

export const contracts = _contracts

function _setupContracts(
  $web3,
  $web3Socket,
  { NETWORK_ID, ROCKET_FACTORY_CONTRACT }
) {
  NETWORK_ID = String(NETWORK_ID)
  console.log('NETWORK_ID: ', NETWORK_ID)
  const catapultsAddress = ROCKET_FACTORY_NETWORK[NETWORK_ID]
    ? ROCKET_FACTORY_NETWORK[NETWORK_ID].address
    : ROCKET_FACTORY_CONTRACT

  // Instantiate https providers
  const Catapults = catapultsAddress
    ? new $web3.eth.Contract(ROCKET_FACTORY_ABI, catapultsAddress)
    : null

  // Instantiate wss providers
  const CatapultsSocket = catapultsAddress
    ? new $web3Socket.eth.Contract(ROCKET_FACTORY_ABI, catapultsAddress)
    : null

  console.log({
    Catapults,
    CatapultsSocket,
  })

  return {
    Catapults,
    CatapultsSocket,
  }
}
