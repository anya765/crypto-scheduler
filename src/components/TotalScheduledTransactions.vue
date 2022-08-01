<template>
  <h1>Total Scheduled Transactions: {{ totalTransactions }}</h1>
</template>
<script>
export default {
  data() {
    return {
      totalTransactions: 0,
    }
  },
  async mounted() {
    console.log(this.$contracts.Catapults)

    this.totalTransactions = await this.$contracts.Catapults.methods
      .getAllTransactionsLength()
      .call()
  },
}
</script>
