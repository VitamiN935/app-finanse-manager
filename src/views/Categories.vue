<template>
  <div>
    <div class="page-title">
      <h3>{{"CategoryTitle" | localize}}</h3>
    </div>
    <Loader v-if="loading" />
    <section v-else>
      <div class="row">
        <CategoryCreate @addCategory="addCategory" />
        <CategoryEdit
          :categories="categories"
          @updateCategory="updateCategory"
          :key="categories.length + countUpdate"
        />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";
import Loader from "@/components/app/Loader";
import localizeFilter from '@/filters/localize.filter'

export default {
  name: "categories",

  metaInfo: {
    title: `${localizeFilter("MenuCategories")} | ${process.env.VUE_APP_TITLE}`
  },

  components: {
    CategoryCreate,
    CategoryEdit,
    Loader
  },

  data() {
    return {
      loading: true,
      categories: [],
      countUpdate: 0
    };
  },

  async mounted() {
    try {
      this.categories = await this.$store.dispatch("fetchCategories");
      this.loading = false;
    } catch (e) {}
  },

  methods: {
    addCategory(category) {
      this.categories.push(category);
    },

    updateCategory(category) {
      const idx = this.categories.findIndex(cat => cat.id === category.id);
      this.categories[idx] = category;
      this.countUpdate++;
    }
  }
};
</script>