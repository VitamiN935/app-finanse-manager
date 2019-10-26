<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line" v-for="cur of currency" :key="cur">
          <span>{{getCurrency(cur) | currency(cur)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "homeyoumoney",

  props: {
    rates: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      currency: ["RUB", "USD", "EUR"]
    };
  },

  computed: {
    ...mapGetters(['info']),

    base() {
      return this.info.money * (this.rates['EUR'] / this.rates['RUB']);
    }
  },

  methods: {
    getCurrency(cur) {
      return this.base * this.rates[cur];
    }
  },
};
</script>