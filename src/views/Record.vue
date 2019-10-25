<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      Категории не найдены ->
      <router-link to="/categories">Добавить категорию</router-link>
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
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        />
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >Минимальное значение {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        />
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >Информация...</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import { mapGetters } from "vuex";
import { required, minValue } from "vuelidate/lib/validators";
import currencyFilter from '@/filters/currency.filter'
import ct from "@/script/const";

export default {
  name: "record",

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
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
    if (this.categories.length) this.currentSelect = this.categories[0].id;
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
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
        this.$error(`Недостаточно средств ${currencyFilter(Math.abs(this.info.money - this.amount))}`);
      } else {
        const formData = {
          categoryId: this.currentSelect,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON()
        };

        const money = this.type === 'outcome' ? this.info.money - this.amount : this.info.money + this.amount;

        try {
          await this.$store.dispatch("createRecord", formData);
          await this.$store.dispatch('updateInfo', {money});
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