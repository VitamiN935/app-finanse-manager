<template>
  <div>
    <div class="page-title">
      <h3>{{"MenuPlanning" | localize}}</h3>
      <h4>{{info.money | currency}}</h4>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      {{"Categories_not_found" | localize}} ->
      <router-link to="/categories">{{"Add_category" | localize}}</router-link>
    </p>
    <section v-else>
      <div v-for="category of categories" :key="category.id">
        <p>
          <strong>{{category.title}}:</strong>
          {{category.spend | currency}} из {{category.limit | currency}}
        </p>
        <div class="progress" v-tooltip='category.balance'>
          <div 
          class="determinate" 
          :class="category.color"
          :style="`width:${category.currentPercent}%`"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import { mapGetters } from "vuex";
import currencyFilter from '@/filters/currency.filter';
import localizeFilter from '@/filters/localize.filter'

export default {
  name: "planning",

  metaInfo: {
    title: `${localizeFilter("MenuPlanning")} | ${process.env.VUE_APP_TITLE}`
  },

  components: {
    Loader
  },

  computed: {
    ...mapGetters(['info'])
  },

  data() {
    return {
      loading: true,
      categories: []
    };
  },

  async mounted() {
    try {
      const categories = await this.$store.dispatch("fetchCategories");
      const records = await this.$store.dispatch("fetchRecords");

      this.categories = categories.map(category => {
        const spend = records
          .filter(record => record.type === "outcome")
          .filter(record => record.categoryId === category.id)
          .reduce((total, rec) => (total += rec.amount), 0);

        const percent = (spend * 100) / category.limit;
        const currentPercent = percent > 100 ? 100 : percent;
        const color = percent >= 100 ? "red" : percent >= 60 ? "green" : "blue";
        const balance = currencyFilter(category.limit - spend);

        return { ...category, currentPercent, color, spend, balance };
      });

      this.loading = false;

    } catch (e) {}
  }
};
</script>