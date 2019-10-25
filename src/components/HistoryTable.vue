<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record,idx) of records" :key="record.id">
        <td>{{idx + 1}}</td>
        <td>{{record.amount | currency}}</td>
        <td>{{new Date(record.date) | date('datetime')}}</td>
        <td>{{record.categoryName}}</td>
        <td>
          <span 
          class="white-text badge"
          :class='record.color'
          >{{record.typeText}}</span>
        </td>
        <td>
          <router-link class="btn-small btn" tag="button" :to="{name: 'detail', params: {id: record.id, page: page}}">
            <i class="material-icons">open_in_new</i>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "historytable",

  props: {
    records: {
      type: Array,
      required: true
    },
    page: Number
  },
  
};
</script>