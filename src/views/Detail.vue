<template>
  <div>
    <div>
      <div class="breadcrumb-wrap">
        <router-link :to="`/history?page=${$route.params.page}`" class="breadcrumb">{{"History" | localize}}</router-link>
        <a class="breadcrumb" v-if="!loading && Object.keys(record).length">{{record.recordText}}</a>
      </div>
      <Loader v-if='loading'/>
      <p class="center" v-else-if="!Object.keys(record).length">{{"RecordDataNotFound" | localize}}</p>
      <div class="row" v-else>
        <div class="col s12 m6">
          <div class="card" :class="record.color">
            <div class="card-content white-text">
              <p>{{"Description" | localize}}: {{record.description}}</p>
              <p>{{"Amount" | localize}}: {{record.amount | currency}}</p>
              <p>{{"Category" | localize}}: {{record.categoryName}}</p>

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
import localizeFilter from '@/filters/localize.filter'

export default {
  name: "detail",

  metaInfo: {
    title: `${localizeFilter("MetaDetail")} | ${process.env.VUE_APP_TITLE}`
  },

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
        color: record.type === 'outcome' ? 'red' : 'green',
        recordText: record.type === 'outcome' ? localizeFilter("Outcome") : localizeFilter("Income")
      } || {}
      this.loading = false;
    } catch (e) {}
  }
};
</script>