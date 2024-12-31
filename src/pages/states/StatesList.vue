<template>
  <pre>{{statesStore.states}}</pre>
</template>
<script setup>
import {useStatesStore} from 'src/stores/states.js'
import {onMounted} from "vue";
const statesStore =useStatesStore();
onMounted(()=>{
  statesStore.fetchStates()
})

</script>
