<template>
  <router-view />
</template>

<script setup>
import { useAuthStore } from './stores/auth';
import {onMounted} from "vue";
const auth = useAuthStore();

onMounted(()=>{
    auth.loadUserFromStorage();
  console.log('user data',useAuthStore().user)

})
defineOptions({
  name: 'App'
});
</script>
<style>
thead tr:first-child th {
  /* bg color is important for th; just specify one */
  background-color: #E5ECFF;
  color:#777777;
  padding: 10px !important;
  font-size: 14px;
  line-height: 19px;
  align-items: center;
  font-weight: 500;

}
.q-table td {
  border: none;
  padding: 10px !important;
  font-size: 14px !important;
  line-height: 19px ;
  align-items: center;
  font-weight: 500;
  color:#444444 ;
}
tr:nth-child(even) {
  background: #d3f6e3;
}

tr:nth-child(odd) {
  background:  #ffffff;
}
</style>
