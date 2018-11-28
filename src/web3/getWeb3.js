import Web3 from 'web3'
let web3
if (typeof web3 !== 'undefined') {
  // Use Mist/MetaMask's provider
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8800'))
}
let getWeb3 = web3.version ? web3 : null
export default getWeb3
