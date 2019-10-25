<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!records.length">
      Записи не найдены ->
      <router-link to="/record">Добавить запись</router-link>
    </p>
    <template v-else>
      <div class="history-chart">
        <canvas></canvas>
      </div>

      <section>
        <HistoryTable :records='records'/>
      </section>
    </template>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import HistoryTable from "@/components/HistoryTable";

export default {
  name: "history",

  components: {
    Loader,
    HistoryTable
  },

  data() {
    return {
      loading: true,
      records: []
    };
  },

  async mounted() {
    try {
      const categories = await this.$store.dispatch("fetchCategories");
      const records = await this.$store.dispatch("fetchRecords");
      this.loading = false;

      this.records = records.map(record => {
        const category = categories.find(c => c.id === record.categoryId);
        return {
          ...record,
          categoryName: category.title,
          color: record.type === 'outcome' ? 'red' : 'green',
          typeText: record.type === 'outcome' ? 'Расход' : 'Доход'
        }
      })
    } catch (e) {}
  }
};
</script>