<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{"Exchange_Rates" | localize}}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{"Сurrency" | localize}}</th>
              <th>{{"Rate" | localize}}</th>
              <th>{{"Date" | localize}}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur of currency" :key="cur">
              <td>{{cur}}</td>
              <td>{{rates[cur].toFixed(5)}}</td>
              <td>{{new Date(date) | date}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homecurrency',

  props: {
    rates: {
      type: Object,
      required: true
    },

    date: String
  },

  data() {
    return {
      currency: ["RUB", "USD", "EUR"]
    }
  },
}
</script>