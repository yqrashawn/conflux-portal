export default getBuyEthUrl

/**
 * Gives the caller a url at which the user can acquire eth, depending on the network they are in
 *
 * @param {Object} opts - Options required to determine the correct url
 * @param {string} opts.network The network for which to return a url
 * @param {string} opts.type The network type for which to return a url
 * @param {string} opts.amount The amount of ETH to buy on coinbase. Only relevant if network === '1'.
 * @param {string} opts.address The address the bought ETH should be sent to.  Only relevant if network === '1'.
 * @returns {string|undefined} - The url at which the user can access ETH, while in the given network. If the passed
 * network does not match any of the specified cases, or if no network is given, returns undefined.
 *
 */
function getBuyEthUrl ({ network, amount, address, service, type }) {
  // default service by network if not specified
  if (type && !service) {
    service = getDefaultServiceForType(type)
  }

  if (network !== undefined && !service) {
    service = getDefaultServiceForNetwork(network)
  }

  switch (service) {
    case 'conflux-main-faucet':
      return `https://wallet.confluxscan.io/faucet/dev/ask?address=${address}`
    case 'conflux-test-faucet':
      return `http://test-faucet.conflux-chain.org:18088/dev/ask?address=${address}`
    case 'wyre':
      return `https://pay.sendwyre.com/?dest=ethereum:${address}&destCurrency=ETH&accountId=AC-7AG3W4XH4N2&paymentMethod=debit-card`
    case 'coinswitch':
      return `https://metamask.coinswitch.co/?address=${address}&to=eth`
    case 'coinbase':
      return `https://buy.coinbase.com/?code=9ec56d01-7e81-5017-930c-513daa27bb6a&amount=${amount}&address=${address}&crypto_currency=CFX`
    case 'metamask-faucet':
      return 'https://faucet.metamask.io/'
    case 'rinkeby-faucet':
      return 'https://www.rinkeby.io/'
    case 'kovan-faucet':
      return 'https://github.com/kovan-testnet/faucet'
    case 'goerli-faucet':
      return 'https://goerli-faucet.slock.it/'
    default:
      throw new Error(`Unknown cryptocurrency exchange or faucet: "${service}"`)
  }
}

function getDefaultServiceForNetwork (network) {
  switch (network) {
    case '0':
      return 'conflux-main-faucet'
    case '1':
      return 'conflux-test-faucet'
    default:
      return
  }
}

function getDefaultServiceForType (type) {
  switch (type) {
    case 'mainnet':
      return 'conflux-main-faucet'
    case 'testnet':
      return 'conflux-test-faucet'
    default:
      return
  }
}
