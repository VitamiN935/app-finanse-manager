<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />
    <div class="row" v-else>
      <HomeYouMoney :rates="currency.rates" />
      <HomeCurrency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import HomeYouMoney from "@/components/HomeYouMoney";
import HomeCurrency from "@/components/HomeCurrency";

export default {
  name: "home",

  components: {
    HomeYouMoney,
    HomeCurrency,
    Loader
  },

  metaInfo: {
    title: `Счет | ${process.env.VUE_APP_TITLE}`
  },

  data() {
    return {
      loading: true,
      currency: null
    };
  },

  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.loading = false;
  },

  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchCurrency");
      this.loading = false;
    }
  }
};
</script>