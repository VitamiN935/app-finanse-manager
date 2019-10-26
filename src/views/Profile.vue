<template>
  <div>
    <div class="page-title">
      <h3>{{"Profile" | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="updateInfo">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        />
        <label for="description">{{"Name" | localize}}</label>
        <span
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{"Valid_Name" | localize}}</span>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="locale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{"Update" | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/src/validators";
import localizeFilter from '@/filters/localize.filter'

export default {
  name: "profile",

  metaInfo: {
    title: `${localizeFilter("MetaProfile")} | ${process.env.VUE_APP_TITLE}`
  },

  computed: {
    ...mapGetters(["info"])
  },

  data() {
    return {
      name: "",
      locale: ""
    };
  },

  mounted() {
    this.locale = this.info.locale === "ru-RU";
    this.name = this.info.name;
    setTimeout(() => M.updateTextFields(), 0);
  },

  validations: {
    name: { required }
  },

  methods: {
    async updateInfo() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        name: this.name,
        locale: this.locale ? "ru-RU" : "en-US"
      };

      try {
        await this.$store.dispatch("updateInfo", formData);
        this.$message("Персональные данные обновлены");
      } catch (e) {}
    }
  }
};
</script>