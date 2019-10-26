<template>
  <div>
    <div class="page-title">
      <h3>{{"MenuNewRecord" | localize}}</h3>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      {{"Categories_not_found" | localize}} ->
      <router-link to="/categories">{{"Add_category" | localize}}</router-link>
    </p>
    <form class="form" v-else @submit.prevent="createRecord">
      <div class="input-field">
        <select ref="select" v-model="currentSelect">
          <option
            v-for="category of categories"
            :key="category.id"
            :value="category.id"
          >{{category.title}}</option>
        </select>
        <label>{{"ChoiseCategory" | localize}}</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>{{"Income" | localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>{{"Outcome" | localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        />
        <label for="amount">{{"Amount" | localize}}</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >{{"ValidminValue" | localize}} {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        />
        <label for="description">{{"Description" | localize}}</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >{{"Valid_Descr" | localize}}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{"Create" | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import { mapGetters } from "vuex";
import { required, minValue } from "vuelidate/lib/validators";
import ct from "@/script/const";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from '@/filters/localize.filter'

export default {
  name: "record",

  metaInfo: {
    title: `${localizeFilter("MenuNewRecord")} | ${process.env.VUE_APP_TITLE}`
  },

  components: {
    Loader
  },

  data() {
    return {
      loading: true,
      categories: [],
      select: null,
      currentSelect: null,
      type: "outcome",
      amount: ct.MIN_VALUE_RECORD,
      description: ""
    };
  },

  computed: {
    ...mapGetters(["info"])
  },

  validations: {
    amount: { minValue: minValue(ct.MIN_VALUE_RECORD) },
    description: { required }
  },

  async mounted() {
    try {
      this.categories = await this.$store.dispatch("fetchCategories");
      this.loading = false;
      if (this.categories.length) this.currentSelect = this.categories[0].id;
      setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select);
        M.updateTextFields();
      }, 0);
    } catch (e) {}
  },

  beforeDestroy() {
    if (this.select && this.select.destroy) this.select.destroy();
  },

  methods: {
    async createRecord() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.type === "outcome" && this.info.money - this.amount < 0) {
        this.$error(
          `Недостаточно средств ${currencyFilter(
            Math.abs(this.info.money - this.amount)
          )}`
        );
      } else {
        const formData = {
          categoryId: this.currentSelect,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON()
        };

        const money =
          this.type === "outcome"
            ? this.info.money - this.amount
            : this.info.money + this.amount;

        try {
          await this.$store.dispatch("createRecord", formData);
          await this.$store.dispatch("updateInfo", { money });
          this.$message("Запись добавлена");

          this.amount = ct.MIN_VALUE_RECORD;
          this.description = "";
          this.$v.$reset();
        } catch (e) {}
      }
    }
  }
};
</script>