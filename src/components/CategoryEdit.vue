<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <p v-if="!categories.length" class="span">Категорий нет</p>
      <form @submit.prevent="updateCategory" v-else>
        <div class="input-field">
          <select v-model="currentSelect" ref="select">
            <option v-for="cat of categories" :key="cat.id" :value="cat.id">{{cat.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="title"
            :class="$v.title.$dirty && !$v.title.required"
          />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >Введите название категории</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="$v.limit.$dirty && !$v.limit.minValue"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >Минимальное значение {{$v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import ct from "@/script/const";

export default {
  name: "categoryedit",

  props: {
    categories: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      title: "",
      limit: ct.MIN_VALUE_CATEGORY_CREATE,
      currentSelect: null,
      select: null
    };
  },

  watch: {
    currentSelect(id) {
      const category = this.categories.find(c => c.id === id);
      this.title = category.title;
      this.limit = category.limit;
    }
  },

  validations: {
    title: { required },
    limit: { minValue: minValue(ct.MIN_VALUE_CATEGORY_CREATE) }
  },

  created() {
    if (this.categories.length) {
      this.currentSelect = this.categories[0].id;
    }
  },

  mounted() {
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },

  beforeDestroy() {
    if (this.select && this.select.destroy) this.select.destroy();
  },

  methods: {
    async updateCategory() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        id: this.currentSelect,
        title: this.title,
        limit: this.limit
      };

      try {
        const category = await this.$store.dispatch('updateCategory', formData);
        this.$emit('updateCategory', category)
        this.currentSelect = this.categories[0].id;
        this.$v.$reset();
        this.$message('Категория обновлена');
      } catch (e) {}
    }
  }
};
</script>