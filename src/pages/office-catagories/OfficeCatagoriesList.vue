<template>
  <q-page padding>
    <div class="flex justify-between">
      <div class="tw-text-[18px] tw-font-[700] tw-text-[#444444] tw-leading-[25px]">Office Categories</div>
      <div class="tw-inline-block">
        <div class="tw-bg-[#0f75bc] tw-mx-1 tw-rounded-[4px] tw-inline-block tw-p-2 tw-text-[#ffffff]">
          <img src="../../assets/images/add.svg" alt="" class="tw-inline-block" />
          <span class="tw-text-[16px] tw-leading-[24px] tw-font-[500] tw-mx-1">Add</span>
        </div>
        <div class="tw-mx-1 tw-border-[1px] tw-border-[#0f75bc] tw-rounded-[4px] tw-inline-block tw-p-2 tw-text-[#0f75bc]">
          <img src="../../assets/images/setting.svg" alt="" class="tw-inline-block" />
          <span class="tw-text-[16px] tw-leading-[24px] tw-font-[500] tw-mx-1">Customize</span>
        </div>
        <div class="tw-inline-block tw-px-1 tw-py-2 tw-rounded-[4px] tw-ml-1 tw-bg-[#d2e7f3]">
          <img src="../../assets/images/menu.svg" alt="" class="tw-inline-block" />
        </div>
      </div>
    </div>

    <q-card class="tw-overflow-auto tw-mt-4">
      <!-- Filters and Search Section -->
      <div class="tw-flex tw-items-center tw-justify-between tw-mb-4">
        <div class="tw-flex tw-gap-4 tw-mt-4 tw-mx-2">
          <q-select
            v-model="selectedStatus"
            :options="statusOptions"
            label="Filter by Status"
            style="width: 250px"
            outlined
            dense
          />
          <div class="tw-text-[#0f75bc]">
            <img src="../../assets/images/cross.svg" alt="" class="tw-inline-block" />
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-gap-2 tw-mr-2">
          <q-icon name="filter_list" size="md" class="tw-text-primary tw-cursor-pointer" />
          <q-input
            v-model="searchTerm"
            label="Search"
            outlined
            dense
            clearable
            class="tw-w-[250px]"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>

      <!-- Table -->
      <q-table
        flat
        dense
        :rows="filteredOfficeCategories"
        :columns="columns"
        row-key="id"
        :rows-per-page="rowsPerPage"
      >
        <template v-slot:body-cell-sn="props">
          <q-td>{{ props.rowIndex + 1 }}</q-td> <!-- Display SN as the index + 1 -->
        </template>

        <template v-slot:body-cell-name="props">
          <q-td>{{ savedLanguage === 'en' ? props.row.name : props.row.name_np }}</q-td>
        </template>



        <template v-slot:body-cell-status="props">
          <q-td>{{ props.row.status }}</q-td>
        </template>

        <!-- Actions Column -->
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="tw-text-center">
            <q-btn flat dense color="primary" @click="editCategory(props.row)">
              <q-icon name="edit" />
            </q-btn>
            <q-btn flat dense color="negative" @click="deleteCategory(props.row)">
              <q-icon name="delete" />
            </q-btn>

              <q-btn flat dense color="secondary" @click="addOffice(props.row)">
                <q-icon name="add" />
            </q-btn>
          </q-td>
        </template>
      </q-table>

      <!-- Pagination -->
      <q-pagination
        v-model="currentPage"
        :max="maxPages"
        :color="'primary'"
        class="q-mt-md"
        @update:model-value="handlePageChange"
      />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {useOfficeCategoriesStore} from 'src/stores/officeCatagories.js'


const officeCategoriesStore = useOfficeCategoriesStore();

// Filters
const selectedStatus = ref(null);
const searchTerm = ref('');
const currentPage = ref(1);
const rowsPerPage = 10;
const savedLanguage = localStorage.getItem("language");

onMounted(() => {
  officeCategoriesStore.fetchOfficeCategories();  // Ensure this fetches the correct data for pagination
  console.log('Office Categories:', officeCategoriesStore.officeCategories);
});

// Table Columns
const columns = [
  { name: 'sn', label: 'SN', align: 'left', field: 'sn', sortable: true },
  { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true },
  { name: 'office', label: 'Office', align: 'left', field: 'office', sortable: true },
  { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true },
  { name: 'actions', label: 'Actions', align: 'center' },
];

// Filter Data
const statusOptions = ref(['Active', 'Inactive']);

// Computed for filtered office categories
const filteredOfficeCategories = computed(() => {
  let data = officeCategoriesStore.officeCategories;

  if (selectedStatus.value) {
    data = data.filter((category) => category.status === selectedStatus.value);
  }
  if (searchTerm.value) {
    data = data.filter((category) =>
      Object.values(category)
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase())
    );
  }

  const start = (currentPage.value - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  return data.slice(start, end);
});

// Pagination Logic
const maxPages = computed(() => {
  return Math.ceil(officeCategoriesStore.totalCategories / rowsPerPage);  // Use the total number of categories, not the array
});

const handlePageChange = (page) => {
  currentPage.value = page;
  officeCategoriesStore.fetchOfficeCategories();  // Fetch the correct page of office categories
};

// Actions
const editCategory = (row) => {
  console.log('Edit Office Category:', row);
};
const deleteCategory = (row) => {
  console.log('Delete Office Category:', row);
};
</script>

<style>
/* Add your styles here */
</style>



