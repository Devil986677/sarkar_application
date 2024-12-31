<template>
  <pre>{{complaintFormStore.complaints}}</pre>
</template>
<script setup>
import {useComplaintFormStore} from 'src/stores/complain.js'
import {onMounted} from "vue";
const complaintFormStore =useComplaintFormStore();
onMounted(()=>{
  complaintFormStore.fetchComplaints()
})

</script>
