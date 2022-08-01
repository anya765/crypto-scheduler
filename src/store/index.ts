import { ActionTree, MutationTree } from 'vuex'
import ENS, { getEnsAddress } from '@ensdomains/ensjs'
import detectProvider from '@metamask/detect-provider'

export const INITIAL_STATE = {
  selectedAccount: null,
  selectedAccountEnsName: null,
  chainId: -1,
  networkId: -1,
  connected: false,
  isLoading: false,
}
export const state = () => ({ ...INITIAL_STATE })
export type RootState = ReturnType<typeof state>

export const strict = false

export const mutations: MutationTree<RootState> = {
  resetState(state) {
    Object.assign(state, { ...INITIAL_STATE })
  },
  setChainId(state, id) {
    state.chainId = id
  },
  setSelectedAccount(state, selectedAccount) {
    state.selectedAccount = selectedAccount
  },
  setSelectedAccountEnsName(state, ensName) {
    state.selectedAccountEnsName = ensName
  },
  setNetworkId(state, networkId) {
    state.networkId = networkId
  },
  setConnectedStatus(state, status) {
    state.connected = status
  },
  setLoadingStatus(state, status) {
    state.isLoading = status
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async reverseResolveAddress({ commit }, address) {
    if (!address) {
      commit('setSelectedAccountEnsName', null)
      return null
    }
    try {
      const ens = await new ENS({
        provider: await detectProvider(),
        ensAddress: getEnsAddress(4),
      })
      const ensName = await ens.getName(address)
      const checked = await ens.name(ensName.name).getAddress()
      if (address.toLowerCase() !== checked.toLowerCase()) {
        commit('setSelectedAccountEnsName', null)
        return null
      } else {
        commit('setSelectedAccountEnsName', ensName.name)
        return ensName.name
      }
    } catch (error: any) {
      commit('setSelectedAccountEnsName', null)
      console.warn('Resolving ENS name: ', Error(error).message)
    }
  },
  async connectToWallet({ commit, dispatch, state }) {
    try {
      const provider = await this.app.$web3Modal.connect()
      //  https://github.com/ChainSafe/web3.js/issues/3891
      //  This is a work around until web3 or walletconnect get a update.
      //  Fixes issue where minting does not return receipt on callback
      //  eslint-disable-next-line no-proto
      delete provider.__proto__.request
      // eslint-disable-next-line no-prototype-builtins
      provider.hasOwnProperty('request') && delete provider.request
      // End of workaround
      if (provider) {
        await this.app.$web3.setProvider(provider)
        await dispatch('subscribeProvider', provider)
        this.app.$web3.eth.extend({
          methods: [
            {
              name: 'chainId',
              call: 'eth_chainId',
              outputFormatter: this.app.$web3.utils.hexToNumber,
            },
          ],
        })
        const accounts = await this.app.$web3.eth.getAccounts()
        const selectedAccount = accounts[0]
        const networkId = await this.app.$web3.eth.net.getId()
        const chainId = await this.app.$web3.eth.chainId()
        commit('setChainId', chainId)
        commit('setConnectedStatus', true)
        commit('setSelectedAccount', selectedAccount)
        commit('setNetworkId', networkId)
      }
    } catch (error) {
      console.warn(error)
    }
  },
  async disconnectWallet({ commit, dispatch, state }) {
    if (state.connected) {
      console.log('DISCONNECT')
      await dispatch('resetApp')
    }
  },
  subscribeProvider({ commit, dispatch, state }, provider) {
    if (!provider.on) {
      return console.warn(
        'BAILING OUT! Provider subscription failed: ',
        provider
      )
    }
    provider.on('disconnect', () => commit('resetState'))
    provider.on('accountsChanged', async (accounts: string[]) => {
      if (accounts[0]) {
        commit('setSelectedAccount', accounts[0])
        await dispatch('reverseResolveAddress', accounts[0])
      }
    })
    provider.on('chainChanged', async (chainId: number) => {
      const networkId = await this.app.$web3.eth.net.getId()
      commit('setNetworkId', networkId)
      commit('setChainId', chainId)
      if (state.selectedAccount) {
        await dispatch('reverseResolveAddress', state.selectedAccount)
      }
    })
  },
  async resetApp({ commit }) {
    try {
      await this.app.$web3Modal.clearCachedProvider()
      commit('setLoadingStatus', true)
      if (
        this.app.$web3.currentProvider &&
        this.app.$web3.currentProvider.close
      ) {
        await this.app.$web3.currentProvider.close()
      }
      if (
        this.app.$web3.currentProvider &&
        this.app.$web3.currentProvider._handleDisconnect
      ) {
        await this.app.$web3.currentProvider._handleDisconnect()
      }
      commit('setLoadingStatus', false)
    } catch (error) {
      console.log(error)
    } finally {
      commit('resetState')
      this.$router.go(0)
    }
  },
}
