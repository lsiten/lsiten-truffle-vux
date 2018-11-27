import * as types from '../types/web3'
import getWeb3 from '../../units/getWeb3'
const state = {
  instance: () => {},
  address: '',
  coinbase: '',
  networkId: '',
  error: '',
  isInjected: '',
  isDAppReady: false
}

const getters = {
  web3_isDAppReady: state => state.isDAppReady
}

const mutations = {
  // 更改web3相关信息
  [types.WEB3_REGISTER_WEB3_INSTANCE] (state, payload) {
    const result = payload.result
    state.instance = () => result.web3
    state.address = result.address ? result.address.toString() : state.address
    state.coinbase = result.coinbase ? result.coinbase.toString() : state.coinbase
    state.networkId = result.networkId ? result.networkId.toString() : state.networkId
    state.error = result.web3Error ? result.web3Error : state.error
    state.isInjected = result.hasInjectedWeb3 ? result.hasInjectedWeb3 : state.isInjected

    if (payload.callback) payload.callback(state)
  },
  // 更改Dapp状态
  [types.WEB3_UPDATE_DAPP_READINESS] (state, isReady) {
    state.isDAppReady = isReady
  }
}

const actions = {
  // 初始化web3网络
  web3_init_network_status ({ commit }) {
    return new Promise((resolve, reject) => {
      getWeb3
      .then((result) => {
        commit(types.WEB3_REGISTER_WEB3_INSTANCE, {
          result,
          callback: (state) => {
            resolve({ state })
          }
        })
      })
      .catch((error) => {
        if (!(state && state.web3 && state.web3.instance)) {
          const result = error.result
          commit(types.WEB3_REGISTER_WEB3_INSTANCE, {
            result: {
              web3: (result && result.hasInjectedWeb3 ? result.web3 : null),
              hasInjectedWeb3: (result && result.hasInjectedWeb3 ? result.hasInjectedWeb3 : false),
              web3Error: error.error
            },
            callback: (state) => {
              let errorMsg = { state, error }
              reject(errorMsg)
            }
          })
        }
      })
    })
  },
  // 更新Dapp状态
  web3_update_dapp_status ({ commit }, isReady) {
    commit(types.WEB3_UPDATE_DAPP_READINESS, isReady)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
