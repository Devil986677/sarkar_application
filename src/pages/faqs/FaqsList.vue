<template>
  <pre>{{faqsStore.faqs}}</pre>
</template>
<script setup>
import {useFaqsStore} from 'src/stores/faqs.js'
import {onMounted} from "vue";
const faqsStore =useFaqsStore();
onMounted(()=>{
  faqsStore.fetchFaqs()
})

</script>
