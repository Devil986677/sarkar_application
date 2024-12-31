<template>
  <pre>{{districtsStore.districts}}</pre>
</template>
<script setup>
import {useDistrictsStore} from 'src/stores/districts.js'
import {onMounted} from "vue";
const districtsStore =useDistrictsStore();
onMounted(()=>{
  districtsStore.fetchDistricts()
})

</script>
