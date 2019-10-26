<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{"Create" | localize}}</h4>
      </div>

      <form @submit.prevent="createCategory">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="title"
            :class="$v.title.$dirty && !$v.title.required"
          />
          <label for="name">{{"Title" | localize}}</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >{{"ValidTitle" | localize}}</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="$v.limit.$dirty && !$v.limit.minValue"
          />
          <label for="limit">{{"Limit" | localize}}</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >{{"ValidminValue" | localize}} {{$v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{"Create" | localize}}
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
  name: "categorycreate",

  data() {
    return {
      title: "",
      limit: ct.MIN_VALUE_CATEGORY_CREATE
    };
  },

  validations: {
    title: { required },
    limit: { minValue: minValue(ct.MIN_VALUE_CATEGORY_CREATE) }
  },

  mounted() {
    setTimeout(() => M.updateTextFields(), 0);
  },

  methods: {
    async createCategory() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        title: this.title,
        limit: this.limit
      };

      try {
        const category = await this.$store.dispatch('createCategory', formData);
        
        this.$emit('addCategory', category);
        this.title = ''
        this.limit = ct.MIN_VALUE_CATEGORY_CREATE;
        this.$v.$reset();
        this.$message('Категория создана');
      } catch (e) {}
    }
  }
};
</script>