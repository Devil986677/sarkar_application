<template>
  <pre>{{countryStore.countries}}</pre>
</template>
<script setup>
import {useCountriesStore} from 'src/stores/countries.js'
import {onMounted} from "vue";
const countryStore =useCountriesStore();
onMounted(()=>{
  countryStore.fetchData()
})

</script>

