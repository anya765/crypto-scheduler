<template>
  <div>
    <b-loading
      class=""
      :is-full-page="true"
      :active="isLoading"
      :can-cancel="true"
    />
    <navbar />
    <nuxt />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' },
        },
      ],
    }
  },
  computed: {
    ...mapState(['selectedAccount', 'chainId', 'isLoading']),
  },
  mounted() {},
  beforeDestroy() {
    if (
      this.$web3.currentProvider &&
      this.$web3.currentProvider.removeAllListeners
    ) {
      this.$web3.currentProvider.removeAllListeners()
    }
  },
  methods: { ...mapMutations(['setLoadingStatus']) },
}
</script>

<style>
.web3modal-modal-lightbox {
  z-index: 1000;
}
</style>
