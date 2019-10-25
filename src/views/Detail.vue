<template>
  <div>
    <div>
      <div class="breadcrumb-wrap">
        <router-link :to="`/history?page=${$route.params.page}`" class="breadcrumb">История</router-link>
        <a class="breadcrumb" v-if="!loading && Object.keys(record).length">{{record.type === 'outcome' ? 'Расход' : 'Доход'}}</a>
      </div>
      <Loader v-if='loading'/>
      <p class="center" v-else-if="!Object.keys(record).length">Данные записи не обнаружены</p>
      <div class="row" v-else>
        <div class="col s12 m6">
          <div class="card" :class="record.color">
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p>Сумма: {{record.amount | currency}}</p>
              <p>Категория: {{record.categoryName}}</p>

              <small>{{new Date(record.date) | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";

export default {
  name: "detail",

  components: {
    Loader
  },

  data() {
    return {
      loading: true,
      record: {}
    };
  },

  async mounted() {
    try {
      const record = await this.$store.dispatch('recordById', this.$route.params.id);
      const category = await this.$store.dispatch('categoryById', record.categoryId);
      this.record = {
        ...record,
        categoryName: category.title,
        color: record.type === 'outcome' ? 'red' : 'green'
      } || {}
      this.loading = false;
    } catch (e) {}
  }
};
</script>