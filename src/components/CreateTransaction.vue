<template>
  <form>
    <div class="ide-container">
      <div class="ide">
        <!-- line number div -->
        <div class="lines">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
        </div>
        <!-- function looking form div -->
        <!--
                        consolas-style font
                        [red]function [magenta]createTransaction(
                            address receiver = [userInput]
                            address ERC20TokenAddress = [userInput]
                            uint 256 amount = [userInput]
                            uint 256 deadline = [userInput]
                            uint 256 tip = [userInput]
                        )
                    -->
        <div class="code">
          <div>
            <span class="function">function </span
            ><span class="function-name">createTransaction</span>(
          </div>
          <div class="form-field">
            <label
              ><span class="data-type">address</span>&nbsp;receiver<span
                class="code"
                >&nbsp;=</span
              ></label
            >
            <input
              v-model="recieverAddress"
              type="text"
              placeholder="Enter receiver address_"
            />;
          </div>
          <div class="form-field">
            <label
              ><span class="data-type">address</span
              >&nbsp;ERC20TokenAddress<span class="code">&nbsp;=</span></label
            >
            <select
              id="ERC20Token"
              v-model="selectedToken"
              name="ERC20Token"
              class="py-0 pr-7 pl-2 h-full bg-transparent border-transparent focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option>USDC</option>
              <option>CTAG</option>
              <option>MATIC</option>
            </select>
            <!-- <input type="text" value="Ethereum ;" disabled> -->
          </div>
          <div class="form-field">
            <label
              ><span class="data-type">uint 256</span>&nbsp;amount<span
                class="code"
                >&nbsp;=</span
              ></label
            >
            <input
              v-model="amount"
              type="number"
              placeholder="Amount to be Sent"
            />;
          </div>
          <div class="form-field">
            <label
              ><span class="data-type">uint 256</span>&nbsp;deadline<span
                class="code"
                >&nbsp;=</span
              ></label
            >
            <date-pick
              v-model="deadline"
              :pick-time="false"
              :use12-hour-clock="true"
              :format="'YYYY-MM-DD HH:mm'"
              :display-format="'YYYY.MM.DD H:mm A'"
              type="date"
            />;
          </div>
          <div class="form-field">
            <label
              ><span class="data-type">uint 256</span>&nbsp;tip<span
                class="code"
                >&nbsp;=</span
              ></label
            >
            <input
              v-model="tip"
              type="number"
              placeholder="Enter Tip Amount"
            />;
          </div>
          <div>) <span class="function">public</span> {</div>
          <div class="ml-5 text-base text-gray-500">...<br /></div>
          <div class="ml-5 text-base text-gray-500">//click to try!<br /></div>
          <div class="form-field">
            <button
              class="motion-reduce:animate-bounce"
              @click.prevent="createTransaction"
            >
              transactionsList.<span class="function">push</span
              >(newTransaction);
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import DatePick from 'vue-date-pick'
import 'vue-date-pick/dist/vueDatePick.css'
import { differenceInSeconds } from 'date-fns'
import { mapState } from 'vuex'

export default {
  components: { DatePick },

  data() {
    return {
      recieverAddress: '',
      selectedToken: '0xc69F4eF2138764A52e7dd7Ec2931d1CdD7B32d0f',
      amount: 0,
      deadline: '2022.04.20 04:20 PM',
      tip: 0,
      // slectedToken: {
      //   USDC: 0x12345,
      //   CTAG: 0x12345,
      //   MATIC: 0x12345,
      // },
    }
  },
  computed: {
    ...mapState(['chainId', 'selectedAccount', 'selectedAccountEnsName']),
  },

  async mounted() {},

  methods: {
    getUnixTime(date) {
      const futureTime = Date.parse(date)
      const currentTime = new Date()
      console.log(currentTime)
      // eslint-disable-next-line prettier/prettier
      const diff = differenceInSeconds(futureTime, currentTime)
      return 60
      // return diff
    },
    async createTransaction() {
      console.log(
        'reciever:',
        this.recieverAddress,
        '\ntoken address:',
        this.selectedToken,
        '\namount:',
        this.amount,
        '\ndeadline:',
        this.getUnixTime(this.deadline),
        '\ntip',
        this.tip
      )
      console.log(this.$contracts.Catapults)

      this.totalTransactions = await this.$contracts.Catapults.methods
        .createTransaction(
          this.recieverAddress,
          this.selectedToken,
          this.$web3.utils.toWei(this.amount),
          this.getUnixTime(this.deadline),
          this.tip
        )
        .send({ from: this.selectedAccount })
    },
  },
}
</script>

<style>
.ide-container {
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
}
.ide {
  display: grid;
  grid-template-columns: auto 1fr;
  background-color: #2e303b;
  /* padding: 30px; */
  font-family: 'Roboto Mono', monospace;
  transition: all 0.25s ease-in-out;
}

/* .ide:hover {
  transform: scale(1.1);
} */

.lines {
  display: flex;
  flex-flow: column nowrap;
  padding: 0 24px 10px 12px;
  color: rgb(173, 173, 173);
  text-align: right;
  justify-content: space-evenly;
}

.code {
  color: rgb(238, 238, 238);
  display: flex;
  flex-flow: column nowrap;
}

.function {
  color: rgb(252, 126, 126);
}
.function-name {
  color: rgb(184, 97, 255);
}

.form-field {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
}

.data-type {
  color: rgb(72, 136, 255);
  text-align: right;
}

.form-field label {
  display: flex;
  flex-direction: row;
  margin-left: 32px;
  color: rgb(201, 171, 0);
}

.form-field input {
  background: none;
  padding: 0 5px;
  color: rgb(238, 238, 238);
  width: auto;
  justify-self: flex-end;
}

.form-field button {
  margin-left: 32px;
  transition: all 0.2s ease-in-out;
}

.form-field button:hover {
  text-decoration: underline;
  transform: scale(1.1);
}

.vdpComponent.vdpWithInput input {
  @apply text-lg;
}
</style>
