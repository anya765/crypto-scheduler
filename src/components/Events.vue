<template></template>
<script>
export default {
  mounted() {
    this.$contracts.CatapultsSocket.events
      .TransferExecuted()
      .on('data', (event) => {
        console.log(event)
        this.$buefy.toast.open({
          duration: 3000,
          message: `<p class="text-xl">${
            event.returnValues.receiver
          } has received a scheduled transfer of ${
            event.returnValues.amount / 10 ** 18
          } tokens.</p>`,
          position: 'is-bottom',
          type: 'is-success',
        })
      })
      .on('error', function (error, receipt) {
        console.log(`error`, error, receipt)
      })
  },
}

//     "address": "0x90647e2337708BacDF0ECa1747feB6A0a9Dc7C98",
//     "blockNumber": 26414399,
//     "transactionHash": "0x6954780487d7fba02f6482875ca0fb2f268d3cafbb7a27a5335b0f179315707e",
//     "transactionIndex": 39,
//     "blockHash": "0x6b14322771e290f3fcfa6c5c2695ff36afb42d6b06b131b5eed86508281b2f31",
//     "logIndex": 119,
//     "removed": false,
//     "id": "log_156df4c5",
//     "returnValues": {
//         "0": "0x54e51feF99fFcCDCE4a7391a7c81FB0087A376de",
//         "1": "0xc69F4eF2138764A52e7dd7Ec2931d1CdD7B32d0f",
//         "2": "30000000000000000000",
//         "3": "1653188228",
//         "4": "0",
//         "receiver": "0x54e51feF99fFcCDCE4a7391a7c81FB0087A376de",
//         "ERC20TokenAddress": "0xc69F4eF2138764A52e7dd7Ec2931d1CdD7B32d0f",
//         "amount": "30000000000000000000",
//         "deadline": "1653188228",
//         "tip": "0"
//     },
//     "event": "TransferExecuted",
//     "signature": "0xd0c07fef3d265bc041a9f9783f6625cc43fd963deb30f6e46abecc6b49a64ea0",
//     "raw": {
//         "data": "0x00000000000000000000000054e51fef99ffccdce4a7391a7c81fb0087a376de000000000000000000000000c69f4ef2138764a52e7dd7ec2931d1cdd7b32d0f000000000000000000000000000000000000000000000001a055690d9db80000000000000000000000000000000000000000000000000000000000006289a6840000000000000000000000000000000000000000000000000000000000000000",
//         "topics": [
//             "0xd0c07fef3d265bc041a9f9783f6625cc43fd963deb30f6e46abecc6b49a64ea0"
//         ]
//     }
// }
</script>
