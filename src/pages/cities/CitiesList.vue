<template>
  <pre>{{citiesStore.cities}}</pre>
</template>
<script setup>
import {useCitiesStore} from 'src/stores/cities.js'
import {onMounted} from "vue";
const citiesStore =useCitiesStore();
onMounted(()=>{
  citiesStore.fetchCities()
})

</script>
