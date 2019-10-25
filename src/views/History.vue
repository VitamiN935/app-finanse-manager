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
        <canvas ref="canvas"></canvas>
      </div>

      <section>
        <HistoryTable :records="items" :page='page'/>
        <Pagination
          v-model='page'
          :page-count="pageCount"
          :click-handler="changePageHandler"
          :prev-text="'Назад'"
          :next-text="'Вперед'"
          :container-class="'pagination pg'"
        />
      </section>
    </template>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import HistoryTable from "@/components/HistoryTable";
import { Pie, mixins } from "vue-chartjs";
import Pagination from "vuejs-paginate";
import PaginationMixin from "@/mixins/paginate.mixin";

export default {
  name: "history",

  mixins: [Pie, PaginationMixin],

  components: {
    Loader,
    HistoryTable,
    Pagination
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

      this.records = records.map(record => {
        const category = categories.find(c => c.id === record.categoryId);
        return {
          ...record,
          categoryName: category.title,
          color: record.type === "outcome" ? "red" : "green",
          typeText: record.type === "outcome" ? "Расход" : "Доход"
        };
      });

      this.setupPagination(this.records);
      setTimeout(() => {
        this.createPie(categories)
      }, 0);
      this.loading = false;
      
    } catch (e) {}
  },

  methods: {
    createPie(categories) {
      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [
          {
            label: "Расходы по категориям",
            data: categories.map(category => {
              return this.records.reduce((total, record) => {
                return record.type === "outcome" &&
                  record.categoryId === category.id
                  ? (total += record.amount)
                  : total;
              }, 0);
            }),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      });
    },

  }
};
</script>