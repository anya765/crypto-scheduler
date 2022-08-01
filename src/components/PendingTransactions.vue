<template>
  <div class="">
    <h1>Pending Transactions</h1>
    <div>
      <b-table
        :data="data"
        :columns="columns"
        :default-sort="['id', 'asc']"
        default-sort-direction="asc"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      totalTransactions: 0,
      data: [],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '80',
          numeric: true,
          sortable: true,
        },
        {
          field: 'amount',
          label: 'Amount',
          centered: true,
          sortable: false,
        },
        {
          field: 'dueBy',
          label: 'Due By',
          width: '205',
          sortable: true,
          defaultSortDirection: 'asc',
        },
        {
          field: 'pending',
          label: 'Delivered',
        },
      ],
    }
  },
  async mounted() {
    console.log(this.$contracts.Catapults)

    this.totalTransactions = await this.$contracts.Catapults.methods
      .getAllTransactions()
      .call()
    console.log(this.totalTransactions)
    this.parseData(this.totalTransactions)
  },

  methods: {
    parseData(array) {
      const newData = []
      array.map((dataArray) => {
        newData.push({
          id: dataArray[0],
          sender: dataArray[1],
          receiver: dataArray[2],
          dueBy: this.timeConverter(dataArray[3]),
          ERC20TokenAddress: dataArray[4],
          amount: Number(dataArray[5] / 10 ** 18),
          tip: dataArray[6],
          pending: !dataArray[7],
        })
      })
      console.log(newData)
      this.data = newData
    },
    timeConverter(UNIX_timestamp) {
      const a = new Date(UNIX_timestamp * 1000)
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      const year = a.getFullYear()
      const month = months[a.getMonth()]
      const date = a.getDate()
      const hour = a.getHours()
      const min = a.getMinutes()
      const sec = a.getSeconds()
      const time =
        date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
      return time
    },
  },
}
</script>
