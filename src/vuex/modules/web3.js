import * as types from '../types/web3'
import getWeb3 from '../../web3/getWeb3'
const state = {
  instance: () => { return null }
}

const getters = {
  web3_get_instance: state => state.instance
}

const mutations = {
  // 更改web3相关信息
  [types.WEB3_REGISTER_WEB3_INSTANCE] (state, payload) {
    const result = payload.result
    state.instance = () => result
    if (payload.callback) payload.callback(result)
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
      commit(types.WEB3_REGISTER_WEB3_INSTANCE, {
        result: getWeb3,
        callback: (web3) => {
          resolve({ web3 })
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
