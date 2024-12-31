<!--<template>-->
<!--  <q-page padding>-->
<!--  <div class="flex justify-between">-->
<!--    <div class="tw-text-[18px] tw-font-[700] tw-text-[#444444] tw-leading-[25px] ">User</div>-->
<!--    <div class="tw-inline-block">-->
<!--      <div class="tw-bg-[#0f75bc] tw-mx-1 tw-rounded-[4px]  tw-inline-block tw-p-2 tw-text-[#ffffff]">-->
<!--        <img src="../../assets/images/add.svg" alt="" class="tw-inline-block">-->
<!--        <span class="tw-text-[16px] tw-leading-[24px] tw-font-[500] tw-mx-1">User</span>-->
<!--      </div>-->
<!--      <div class=" tw-mx-1 tw-border-[1px] tw-border-[#0f75bc] tw-rounded-[4px] tw-inline-block tw-p-2 tw-text-[#0f75bc]">-->
<!--        <img src="../../assets/images/setting.svg" alt="" class="tw-inline-block">-->
<!--        <span class="tw-text-[16px] tw-leading-[24px] tw-font-[500] tw-mx-1">Customize</span>-->
<!--      </div>-->
<!--      <div class="tw-inline-block tw-px-1 tw-py-2 tw-rounded-[4px] tw-ml-1 tw-bg-[#d2e7f3]">-->
<!--        <img src="../../assets/images/menu.svg" alt="" class="tw-inline-block">-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--<pre>-->

<!--</pre>-->
<!--      <q-card class="tw-overflow-auto tw-mt-4">-->
<!--        &lt;!&ndash; Filters and Search Section &ndash;&gt;-->
<!--        <div class="tw-flex tw-items-center tw-justify-between tw-mb-4">-->
<!--          <div class="tw-flex tw-gap-4 tw-mt-4 tw-mx-2">-->

<!--            <q-select-->
<!--              v-model="selectedRole"-->
<!--              :options="roles"-->
<!--              label="Filter by Role"-->
<!--              style="width: 250px"-->
<!--              outlined-->
<!--              dense-->
<!--            />-->
<!--            <q-select-->


<!--              v-model="selectedOffice"-->
<!--              :options="offices"-->

<!--              label="Filter by Office"-->
<!--              style="width: 250px"-->
<!--              outlined-->
<!--              dense-->
<!--            />-->
<!--            <q-select-->
<!--              v-model="selectedOfficeCategory"-->
<!--              :options="officeCategories"-->
<!--              label="Filter by Office Category"-->
<!--              style="width: 250px"-->
<!--              outlined-->
<!--              dense-->
<!--            />-->
<!--            <div class="tw-text-[#0f75bc] ">-->
<!--              <img src="../../assets/images/cross.svg" alt="" class="tw-inline-block">-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="tw-flex tw-items-center tw-gap-2 tw-mr-2" >-->
<!--            <q-icon name="filter_list" size="md" class="tw-text-primary tw-cursor-pointer" />-->
<!--            <q-input-->
<!--              v-model="searchTerm"-->
<!--              label="Search"-->
<!--              outlined-->
<!--              dense-->
<!--              clearable-->
<!--              class="tw-w-[250px]"-->
<!--            >-->
<!--              <template v-slot:append>-->
<!--                <q-icon name="search" />-->
<!--              </template>-->
<!--            </q-input>-->
<!--          </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; Table &ndash;&gt;-->
<!--        <q-table-->
<!--          flat-->
<!--          dense-->
<!--          :rows="filteredUsers"-->
<!--          :columns="columns"-->
<!--          row-key="id"-->
<!--          :rows-per-page-options="[10,20,25]"-->

<!--        >-->
<!--          <template v-slot:body-cell-office="props">-->
<!--            <q-td>{{ props.row.office_name || 'null' }}</q-td>-->
<!--          </template>-->


<!--          <template v-slot:body-cell-role="props">-->

<!--            <q-td>{{ props.row.roles[0]}}</q-td>-->
<!--          </template>-->

<!--          <template v-slot:body-cell-email="props">-->

<!--            <q-td style="color: #0f75bc">{{ props.row.email}}</q-td>-->
<!--          </template>-->




<!--          &lt;!&ndash; Actions Column &ndash;&gt;-->
<!--          <template v-slot:body-cell-actions="props">-->
<!--            <q-td :props="props" class="tw-text-center">-->
<!--              <q-btn flat dense color="primary" @click="editUser(props.row)">-->
<!--                <q-icon name="edit" />-->
<!--              </q-btn>-->
<!--              <q-btn flat dense color="negative" @click="deleteUser(props.row)">-->
<!--                <q-icon name="delete" />-->
<!--              </q-btn>-->
<!--            </q-td>-->
<!--          </template>-->
<!--        </q-table>-->


<!--      </q-card>-->

<!--    </q-page>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref, computed,onMounted } from 'vue';-->
<!--import {useUserStore} from 'src/stores/users.js'-->

<!--const userStore = useUserStore();-->

<!--// Filters-->
<!--const selectedRole = ref(null);-->
<!--const selectedOffice = ref(null);-->
<!--const selectedOfficeCategory = ref(null);-->
<!--const searchTerm = ref('');-->
<!--const currentPage = ref(1);-->
<!--const rowsPerPage = 20;-->

<!--onMounted(()=>{-->
<!--  userStore.fetchUsers()-->

<!--})-->

<!--// Table Columns-->
<!--const columns = [-->
<!--  { name: 'id', label: 'SN', align: 'left', field: 'id', sortable: true },-->
<!--  { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true },-->
<!--  { name: 'mobile', label: 'Mobile', align: 'left', field: 'mobile', sortable: true },-->
<!--  { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true },-->
<!--  { name: 'username', label: 'Username', align: 'left', field: 'username', sortable: true },-->
<!--  { name: 'office', label: 'Office', align: 'left', field: 'office', sortable: true },-->
<!--  { name: 'role', label: 'Role', align: 'left', field: 'role', sortable: true },-->
<!--  { name: 'actions', label: 'Actions', align: 'center' },-->
<!--];-->

<!--// Filter Data-->
<!--const roles = ref(['System Monitoring', 'User', 'Manager']);-->
<!--const offices = ref(['Office of Prime Ministers', 'Finance Department']);-->
<!--const officeCategories = ref(['Category 1', 'Category 2']);-->

<!--// Filtered and Paginated Users-->
<!--const filteredUsers = computed(() => {-->
<!--  let data = userStore.users;-->
<!--  console.log('usersdata',data)-->

<!--  if (selectedRole.value) {-->
<!--    data = data.filter((user) => user.role === selectedRole.value);-->
<!--  }-->
<!--  if (selectedOffice.value) {-->
<!--    data = data.filter((user) => user.office === selectedOffice.value);-->
<!--  }-->
<!--  if (selectedOfficeCategory.value) {-->
<!--    data = data.filter((user) => user.officeCategory === selectedOfficeCategory.value);-->
<!--  }-->
<!--  if (searchTerm.value) {-->
<!--    data = data.filter((user) =>-->
<!--      Object.values(user)-->
<!--        .join(' ')-->
<!--        .toLowerCase()-->
<!--        .includes(searchTerm.value.toLowerCase())-->
<!--    );-->
<!--  }-->

<!--  const start = (currentPage.value - 1) * rowsPerPage;-->
<!--  const end = start + rowsPerPage;-->
<!--  return data.slice(start, end);-->
<!--});-->

<!--// Actions-->
<!--const editUser = (row) => {-->
<!--  console.log('Edit User:', row);-->
<!--};-->
<!--const deleteUser = (row) => {-->
<!--  console.log('Delete User:', row);-->
<!--};-->
<!--</script>-->
<!--<style>-->

<!--</style>-->




<template>
  <q-page padding>
    <!-- Page Header -->
    <div class="flex justify-between">
      <div class="tw-text-[18px] tw-font-[700] tw-text-[#444444] tw-leading-[25px]">User</div>
      <div class="tw-inline-block">
        <div class="tw-bg-[#0f75bc] tw-mx-1 tw-rounded-[4px] tw-inline-block tw-p-2 tw-text-[#ffffff]">
          <img src="../../assets/images/add.svg" alt="" class="tw-inline-block" />
          <span class="tw-text-[16px] tw-leading-[24px] tw-font-[500] tw-mx-1">User</span>
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

    <!-- Filters Section -->
    <div class="tw-flex tw-items-center tw-justify-between tw-mb-4">
      <div class="tw-flex tw-gap-4 tw-mt-4 tw-mx-2">
        <q-select
          v-model="selectedRole"
          :options="roles"
          label="Filter by Role"
          style="width: 250px"
          outlined
          dense
        />
        <q-select
          v-model="selectedOffice"
          :options="offices"
          label="Filter by Office"
          style="width: 250px"
          outlined
          dense
        />
        <q-select
          v-model="selectedOfficeCategory"
          :options="officeCategories"
          label="Filter by Office Category"
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
<!--<pre>{{userStore.links}}</pre>-->
    <!-- User Table -->
    <q-card class="tw-overflow-auto tw-mt-4">
<!--      <q-table-->
<!--        flat-->
<!--        dense-->
<!--        :rows="filteredUsers"-->
<!--        :columns="columns"-->
<!--        row-key="id"-->
<!--        :rows-per-page-options="[10, 20, 25]"-->
<!--      >-->
<!--        <template v-slot:body-cell-office="props">-->
<!--          <q-td>{{ props.row.office_name || 'null' }}</q-td>-->
<!--        </template>-->
<!--        <template v-slot:body-cell-role="props">-->
<!--          <q-td>{{ props.row.roles[0] }}</q-td>-->
<!--        </template>-->
<!--        <template v-slot:body-cell-email="props">-->
<!--          <q-td style="color: #0f75bc">{{ props.row.email }}</q-td>-->
<!--        </template>-->
<!--        <template v-slot:body-cell-actions="props">-->
<!--          <q-td :props="props" class="tw-text-center">-->
<!--            <q-btn flat dense color="primary" @click="editUser(props.row)">-->
<!--              <q-icon name="edit" />-->
<!--            </q-btn>-->
<!--            <q-btn flat dense color="negative" @click="deleteUser(props.row)">-->
<!--              <q-icon name="delete" />-->
<!--            </q-btn>-->
<!--          </q-td>-->
<!--        </template>-->

<!--      </q-table>-->
      <q-table
        flat
        dense
        :rows="filteredUsers"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[10, 20, 25]"
      >
        <!-- Custom Cell Templates -->
        <template v-slot:body-cell-sn="props">
          <q-td>{{ props.rowIndex + 1 }}</q-td> <!-- Display SN as the index + 1 -->
        </template>


        <template v-slot:body-cell-office="props">
          <q-td>{{ props.row.office_name || 'null' }}</q-td>
        </template>
        <template v-slot:body-cell-role="props">
          <q-td>{{ props.row.roles[0] }}</q-td>
        </template>
        <template v-slot:body-cell-email="props">
          <q-td style="color: #0f75bc">{{ props.row.email }}</q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="tw-text-center">
            <q-btn flat dense color="primary" @click="editUser(props.row)">
              <q-icon name="edit" />
            </q-btn>
            <q-btn flat dense color="negative" @click="deleteUser(props.row)">
              <q-icon name="delete" />
            </q-btn>
          </q-td>
        </template>

<!--        &lt;!&ndash; Custom Footer &ndash;&gt;-->
<!--        <template v-slot:bottom>-->
<!--          <div class="tw-p-4 tw-bg-gray-100 tw-flex tw-justify-between tw-items-center">-->
<!--            <div>Total Records: {{ filteredUsers.length }}</div>-->
<!--            <div class="tw-flex tw-gap-2">-->
<!--              <q-btn flat label="Previous Page" color="primary" :disabled="!prevPage" @click="goToPrevPage" />-->
<!--              <q-btn flat label="Next Page" color="primary" :disabled="!nextPage" @click="goToNextPage" />-->
<!--            </div>-->
<!--          </div>-->
<!--        </template>-->
      </q-table>

    </q-card>

    <!-- Pagination Controls -->
    <div class="tw-flex tw-justify-between tw-items-center tw-mt-4">
      <q-btn
        label="Previous"
        color="primary"
        flat
        :disabled="!prevPage"
        @click="goToPrevPage"
      />
      <q-btn
        label="Next"
        color="primary"
        flat
        :disabled="!nextPage"
        @click="goToNextPage"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from 'src/stores/users.js';

const userStore = useUserStore();

// Pagination State
const currentPage = ref(1);
const nextPage = ref(null);
const prevPage = ref(null);

// Fetch Users with Pagination
const fetchUsers = async (url = null) => {
  await userStore.fetchUsers(url);
  nextPage.value = userStore.pagination.next;
  prevPage.value = userStore.pagination.prev;
};

// Filters and UI State
const selectedRole = ref(null);
const selectedOffice = ref(null);
const selectedOfficeCategory = ref(null);
const searchTerm = ref('');
const rowsPerPage = 20;

// Computed Property for Filtered Users
const filteredUsers = computed(() => {
  let data = userStore.users;

  if (selectedRole.value) {
    data = data.filter((user) => user.role === selectedRole.value);
  }
  if (selectedOffice.value) {
    data = data.filter((user) => user.office === selectedOffice.value);
  }
  if (selectedOfficeCategory.value) {
    data = data.filter((user) => user.officeCategory === selectedOfficeCategory.value);
  }
  if (searchTerm.value) {
    data = data.filter((user) =>
      Object.values(user)
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase())
    );
  }

  const start = (currentPage.value - 1) * rowsPerPage;
  return data.slice(start, start + rowsPerPage);
});

// Pagination Actions
const goToNextPage = () => {
  if (nextPage.value) {
    fetchUsers(nextPage.value);
  }
};
const goToPrevPage = () => {
  if (prevPage.value) {
    fetchUsers(prevPage.value);
  }
};

// Table Columns
const columns = [
  { name: 'sn', label: 'SN', align: 'left', field: 'sn', sortable: true },
  { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true },
  { name: 'mobile', label: 'Mobile', align: 'left', field: 'mobile', sortable: true },
  { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true },
  { name: 'username', label: 'Username', align: 'left', field: 'username', sortable: true },
  { name: 'office', label: 'Office', align: 'left', field: 'office', sortable: true },
  { name: 'role', label: 'Role', align: 'left', field: 'role', sortable: true },
  { name: 'actions', label: 'Actions', align: 'center' },
];

// Filters
const roles = ref(['System Monitoring', 'User', 'Manager']);
const offices = ref(['Office of Prime Ministers', 'Finance Department']);
const officeCategories = ref(['Category 1', 'Category 2']);

onMounted(() => {
  fetchUsers();
});

// Actions
const editUser = (row) => {
  console.log('Edit User:', row);
};
const deleteUser = (row) => {
  console.log('Delete User:', row);
};
</script>

<style>
/* Add any custom styles here */
</style>
