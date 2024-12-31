<!--<template>-->
<!--  <q-page>-->
<!--    <Suspense>-->
<!--      <template #default>-->
<!--        <q-table-->
<!--          v-model:pagination="store.serverPagination"-->
<!--          v-model:selected="store.selected"-->
<!--          :columns="columns"-->
<!--          @request="onRequest"-->
<!--          :loading="store.loading"-->
<!--          :rows="store.all"-->
<!--          :rows-per-page-options="store.rowsPerPageOptions"-->
<!--          binary-state-sort-->
<!--          bordered-->
<!--          flat-->
<!--          row-key="id"-->
<!--        >-->
<!--          <template v-if="hasTopSlot" #top>-->
<!--            <slot name="top"></slot>-->
<!--          </template>-->

<!--          <template #bottom-row>-->
<!--            <slot name="bottom-row"></slot>-->
<!--          </template>-->

<!--          <template v-if="hasPaginationSlot" #pagination>-->
<!--            <slot name="pagination"></slot>-->
<!--          </template>-->

<!--          <template #top-left>-->
<!--            <div class="flex">-->
<!--              <div>-->
<!--                <slot name="back-button"></slot>-->
<!--              </div>-->
<!--              <div class="text-h6 q-mb-md">-->
<!--                {{ title }}-->
<!--              </div>-->
<!--            </div>-->
<!--            <slot name="top-left"></slot>-->
<!--          </template>-->

<!--          <template v-slot:body-cell-office_categories="props">-->
<!--            <q-td>-->
<!--              <template v-for="category in props.row.office_categories" :key="'office'+category">-->
<!--                <q-badge class="q-py-xs q-px-sm q-mb-xs" color="blue-9" :label="category.name" />-->
<!--                <br />-->
<!--              </template>-->
<!--            </q-td>-->
<!--          </template>-->

<!--          <template v-slot:body-cell-sn="props">-->
<!--            <q-td>-->
<!--              {{-->
<!--                store.all.indexOf(props.row) + 1 +-->
<!--                store.serverPagination.rowsPerPage * (store.serverPagination.page - 1)-->
<!--              }}-->
<!--            </q-td>-->
<!--          </template>-->

<!--          <template-->
<!--            v-for="(col, i) in columnsToReplace"-->
<!--            :key="i"-->
<!--            v-slot:[`body-cell-${col?.name}`]="props"-->
<!--          >-->
<!--            <q-td>-->
<!--              <slot :name="`body-cell-${col?.name}`" :props="props"></slot>-->
<!--            </q-td>-->
<!--          </template>-->

<!--          <template v-if="hasBodySlot" #body="props">-->
<!--            <slot :props="props" name="body"></slot>-->
<!--          </template>-->
<!--        </q-table>-->
<!--      </template>-->
<!--      <template #fallback>-->
<!--        Table data is loading...-->
<!--      </template>-->
<!--    </Suspense>-->
<!--  </q-page>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref, onMounted, computed, useSlots, toRefs } from "vue";-->
<!--import { useRouter } from "vue-router";-->

<!--const props = defineProps({-->
<!--  title: {-->
<!--    type: String,-->
<!--    default: "Lists",-->
<!--  },-->
<!--  store: {-->
<!--    type: Object,-->
<!--    required: true,-->
<!--  },-->
<!--  columns: {-->
<!--    type: Array,-->
<!--    required: true,-->
<!--  },-->
<!--  bodyCellColumns: {-->
<!--    type: [Array],-->
<!--    default: () => [],-->
<!--  },-->
<!--  qTdToReplace: {-->
<!--    type: [Array],-->
<!--    default: () => [],-->
<!--  },-->
<!--  resetCreateFormData: {-->
<!--    type: Boolean,-->
<!--    default: false,-->
<!--  },-->
<!--  editRedirectRoute: String,-->
<!--  addRedirectRoute: String,-->
<!--  viewRedirectRoute: String,-->
<!--});-->

<!--const emit = defineEmits(["request", "row-click", "edit:click", "delete:click", "update:pagination"]);-->

<!--const { formDialog, confirmDelete } = toRefs(props.store);-->

<!--const columnsToReplace = ref([]);-->
<!--const route = useRouter();-->
<!--const slots = useSlots();-->

<!--const hasTopSlot = computed(() => slots.top);-->
<!--const hasPaginationSlot = computed(() => slots.pagination);-->
<!--const hasBodySlot = computed(() => slots.body);-->

<!--const onRequest = ({ pagination }) => {-->
<!--  props.store.serverPagination = pagination;-->
<!--  props.store.fetchPaged();-->
<!--};-->

<!--const handleFormDialogue = () => {-->
<!--  if (props.resetCreateFormData && typeof props.store.resetFormData === "function") {-->
<!--    props.store.resetFormData();-->
<!--  }-->
<!--  props.store.formDialog = !props.store.formDialog;-->
<!--};-->

<!--onMounted(() => {-->
<!--  if (props.bodyCellColumns.length) {-->
<!--    columnsToReplace.value = props.bodyCellColumns;-->
<!--  } else if (props.qTdToReplace.length) {-->
<!--    columnsToReplace.value = props.qTdToReplace.map((col) =>-->
<!--      props.columns.find((colInner) => colInner.name === col.name)-->
<!--    );-->
<!--  }-->
<!--  props.store.fetchPaged();-->
<!--});-->
<!--</script>-->

<!--<style scoped>-->
<!--/* Add any necessary styles here */-->
<!--</style>-->

<template>
  <h1>hello</h1>
</template>
