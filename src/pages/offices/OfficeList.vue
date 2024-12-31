<template>
  <pre>{{officesStore.offices}}</pre>
</template>
<script setup>
import {useOfficesStore} from 'src/stores/offices.js'
import {onMounted} from "vue";
const officesStore =useOfficesStore();
onMounted(()=>{
  officesStore.fetchOffices()
})

</script>
