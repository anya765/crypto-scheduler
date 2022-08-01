<template>
  <b-navbar :mobile-burger="true" :close-on-click="false">
    <template #brand>
      <a href="#">
        <b-navbar-item class="brand" />
      </a>
    </template>
    <template v-if="selectedAccount || selectedAccountEnsName" #start>
      <b-navbar-item
        v-for="({ to, label, disabled }, index) in navItems"
        :key="index"
        :inverted="disabled"
        :active="$route.path === to"
        :class="{ disabled }"
        class="text-white"
        tag="nuxt-link"
        :to="disabled ? '' : to"
      >
        {{ label }}
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item tag="div" class="actions">
        <button
          class="mx-4 underline address"
          @click="
            selectedAccount
              ? copyAddressToClipboard(selectedAccount)
              : $store.dispatch('connectToWallet')
          "
        >
          <div class="text-2xl underline">{{ cBtnLabel }}</div>
        </button>
        <button
          v-if="selectedAccount"
          class="mx-4 underline address"
          @click="$store.dispatch('disconnectWallet')"
        >
          <div class="text-2xl underline">Disconnect</div>
        </button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      navItems: [{ to: '/', label: 'Home' }],
      networkData: this.$config.networkData,
    }
  },
  computed: {
    cBtnLabel() {
      return this.selectedAccount
        ? this.selectedAccountEnsName
          ? this.selectedAccountEnsName
          : this.truncateAddress(this.selectedAccount)
        : 'Connect'
    },
    ...mapState(['chainId', 'selectedAccount', 'selectedAccountEnsName']),
  },

  async mounted() {},

  methods: {
    async copyAddressToClipboard() {
      if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(this.selectedAccount)
        return
      }

      try {
        await navigator.clipboard.writeText(this.selectedAccount)
        this.$buefy.toast.open({
          duration: 6939,
          message: `<p class="text-2xl ">${this.selectedAccount} has been copied to your clipboard</p>`,
          position: 'is-top',
          type: 'is-success',
        })
      } catch (error) {
        this.$buefy.toast.open({
          duration: 6939,
          message: `<p class="text-2xl ">Could not copy to clipboard ${error}</p>`,
          position: 'is-top',
          type: 'is-warning',
        })
      }
    },

    truncateAddress(address) {
      if (address.length > 0) {
        return (
          address.substring(0, 4) +
          '....' +
          address.substring(address.length - 5, address.length)
        )
      } else {
        return address
      }
    },
  },
}
</script>

<style lang="scss" scoped>
a.navbar-item,
.navbar-link {
  @apply text-white bg-transparent;
  &:hover {
    @apply text-yellow-400;
  }

  &.is-active {
    @apply text-yellow-400;
    &:hover {
      @apply text-white;
    }
  }
}
</style>
