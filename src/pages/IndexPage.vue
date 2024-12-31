<!--<template>-->
<!--  <div class="q-pa-md row items-start q-gutter-md" style="display: flex; flex-wrap: wrap; justify-content: space-between;">-->

<!--    <q-card class="my-card col-3 tw-py-2"  style="flex: 1 1 calc(25% - 16px); margin-bottom: 16px;">-->
<!--      <q-card-section class="tw-bg-[#ffffff] text-[#000000]">-->
<!--        <div class="tw-font-[400] tw-text-[18px] tw-leading-[24px] tw-text-[#777777] tw-my-1">Total Complaints</div>-->
<!--        <div class="tw-font-[700] tw-text-[24px] tw-leading-[33px] tw-text-[#222222]">255</div>-->

<!--      </q-card-section>-->
<!--    </q-card>-->
<!--    <q-card class="my-card col-3 tw-py-2"  style="flex: 1 1 calc(25% - 16px); margin-bottom: 16px;">-->
<!--      <q-card-section class="tw-bg-[#ffffff] text-[#000000]">-->
<!--        <div class="tw-font-[400] tw-text-[18px] tw-leading-[24px] tw-text-[#777777] tw-my-1">Total Complaints</div>-->
<!--        <div class="tw-font-[700] tw-text-[24px] tw-leading-[33px] tw-text-[#222222]">255</div>-->

<!--      </q-card-section>-->
<!--    </q-card>-->
<!--    <q-card class="my-card col-3 tw-py-2"  style="flex: 1 1 calc(25% - 16px); margin-bottom: 16px;">-->
<!--    <q-card-section class="tw-bg-[#ffffff] text-[#000000]">-->
<!--      <div class="tw-font-[400] tw-text-[18px] tw-leading-[24px] tw-text-[#777777] tw-my-1">Total Complaints</div>-->
<!--      <div class="tw-font-[700] tw-text-[24px] tw-leading-[33px] tw-text-[#222222]">255</div>-->

<!--    </q-card-section>-->
<!--  </q-card>-->
<!--    <q-card class="my-card col-3 tw-py-2"  style="flex: 1 1 calc(25% - 16px); margin-bottom: 16px;">-->
<!--    <q-card-section class="tw-bg-[#ffffff] ">-->
<!--      <div class="tw-font-[400] tw-text-[18px] tw-leading-[24px] tw-text-[#777777] tw-my-1">Total Complaints</div>-->
<!--      <div class="tw-font-[700] tw-text-[24px] tw-leading-[33px] tw-text-[#222222]">255</div>-->
<!--    </q-card-section>-->
<!--  </q-card>-->
<!--  </div>-->








<!--</template>-->

<!--<script setup>-->
<!--defineOptions({-->
<!--  name: 'IndexPage'-->
<!--});-->
<!--</script>-->
<!--<style scoped>-->



<!--</style>-->

<template>
  <q-page padding>
    <!-- Card Layout -->
    <div class="q-pa-md row items-start q-gutter-md " style="display: flex; flex-wrap: wrap; justify-content: space-between;">
      <q-card class="my-card col-3 tw-py-2 tw-rounded-[4px]" style="flex: 1 1 calc(25% - 16px); margin-bottom: 16px;">
        <q-card-section class="tw-bg-[#ffffff] text-[#000000] ">
          <div class="tw-flex tw-justify-between">
            <div class="tw-font-[400] tw-text-[18px] tw-leading-[24px] tw-text-[#777777] tw-my-1">
                           Today's Complaints</div>
            <div>
              <img src="../assets/images/dashboard.svg" alt="">
            </div>
          </div>
          <div class="tw-font-[700] tw-text-[24px] tw-leading-[33px] tw-text-[#222222]">{{ dashboardStore.dashboardData.todays_total }}</div>
        </q-card-section>
      </q-card>
      <q-card class="my-card col-3 tw-py-2 tw-rounded-[4px]" style="flex: 1 1 calc(25% - 16px); margin-bottom: 16px;">
        <q-card-section class="tw-bg-[#ffffff] text-[#000000]">
          <div class="tw-flex tw-justify-between">
            <div class="tw-font-[400] tw-text-[18px] tw-leading-[24px] tw-text-[#777777] tw-my-1">Total Complaints</div>
            <div>
              <img src="../assets/images/dashboard.svg" alt="">
            </div>
          </div>
          <div class="tw-font-[700] tw-text-[24px] tw-leading-[33px] tw-text-[#222222]">{{dashboardStore.dashboardData.total}}</div>
        </q-card-section>
      </q-card>
      <q-card class="my-card col-3 tw-py-2 tw-rounded-[4px]" style="flex: 1 1 calc(25% - 16px); margin-bottom: 16px;">
        <q-card-section class="tw-bg-[#ffffff] text-[#000000]">
          <div class="tw-flex tw-justify-between">
            <div class="tw-font-[400] tw-text-[18px] tw-leading-[24px] tw-text-[#777777] tw-my-1">Pending Complaints</div>
            <div>
              <img src="../assets/images/dashboard.svg" alt="">
            </div>
          </div>
          <div class="tw-font-[700] tw-text-[24px] tw-leading-[33px] tw-text-[#222222]">255</div>
        </q-card-section>
      </q-card>
      <q-card class="my-card col-3 tw-py-2 tw-rounded-[4px]" style="flex: 1 1 calc(25% - 16px); margin-bottom: 16px;">
        <q-card-section class="tw-bg-[#ffffff]">
          <div class="tw-flex tw-justify-between">
            <div class="tw-font-[400] tw-text-[18px] tw-leading-[24px] tw-text-[#777777] tw-my-1">Resolved Complaints</div>
            <div>
              <img src="../assets/images/dashboard.svg" alt="">
            </div>
          </div>
          <div class="tw-font-[700] tw-text-[24px] tw-leading-[33px] tw-text-[#222222]">{{dashboardStore.dashboardData.solved}}</div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Tables Section -->
    <div class="q-pa-md row items-start q-gutter-md" style="display: flex; justify-content: space-between;">
      <!-- First Table -->
      <q-card class="col-6" style="flex: 1 1 calc(50% - 16px); margin-bottom: 16px;">
        <q-card-section>
          <div class="tw-flex tw-justify-between">
            <div class="tw-font-[700] tw-text-[18px] tw-leading-[25px] tw-text-[#444444] tw-mb-2">AgentWise</div>
            <div class="tw-text-[#0f75bc]">See All
              <img src="../assets/images/seeAll.svg" alt="" class="tw-inline-block">
            </div>
          </div>

          <div class="tw-flex tw-justify-between tw-my-2">
            <div class="tw-font-[700] tw-text-[18px] tw-leading-[25px] tw-text-[#444444] tw-mb-2">AgentWise</div>
            <div class="tw-text-[#0f75bc]">
              <img src="../assets/images/cross.svg" alt="" class="tw-inline-block">
            </div>

          </div>
          <q-table
            dense
            flat
            :rows="agentTableData"
            :columns="agentTableColumns"
            row-key="id"
          >
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn flat color="secondary" @click="editItem(props.row)">
                  <q-icon name="visibility"></q-icon>
                </q-btn>

              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>

      <!-- Second Table -->
      <q-card class="col-6" style="flex: 1 1 calc(50% - 16px); margin-bottom: 16px;">
        <q-card-section>
          <div class="tw-flex tw-justify-between">
            <div class="tw-font-[700] tw-text-[18px] tw-leading-[25px] tw-text-[#444444] tw-mb-2">CategoryWise</div>
            <div class="tw-text-[#0f75bc]">See All
              <img src="../assets/images/seeAll.svg" alt="" class="tw-inline-block">
            </div>
          </div>

          <div class="tw-flex tw-justify-between tw-my-2">
            <div class="tw-font-[700] tw-text-[18px] tw-leading-[25px] tw-text-[#444444] tw-mb-2">AgentWise</div>
            <div class="tw-text-[#0f75bc]">
              <img src="../assets/images/cross.svg" alt="" class="tw-inline-block">
            </div>

          </div>

          <q-table
            dense
            flat
            :rows="categoryTableData"
            :columns="categoryTableColumns"
            row-key="id"
            class="tw-bg-[#ffffff]"
          >
            <template v-slot:body-cell-action="props">
              <q-td>

                <q-btn flat color="secondary" @click="editItem(props.row)">
                  <q-icon name="visibility"></q-icon>
                </q-btn>
                <q-btn flat class="tw-text-[#6c757d]" @click="confirmDelete(props.row)">
                  <q-icon name="add"></q-icon>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import {useDashboardStore} from 'stores/dashboard.js'
import {onMounted} from "vue";
const dashboardStore = useDashboardStore();
onMounted(() => {
  dashboardStore.fetchDashboardData();
});

// AgentWise Table Data
const agentTableData = [
  { id: 1, name: 'Riya Somani', complaints: 9200 },
  { id: 2, name: 'Amit Sharma', complaints: 200 },
  { id: 3, name: 'Neha Roy', complaints: 900 },
  { id: 4, name: 'Rahul Kumar', complaints: 100 },
  { id: 5, name: 'Amit Sharma', complaints: 200 },
  { id: 6, name: 'Neha Roy', complaints: 900 },
  { id: 7, name: 'Rahul Kumar', complaints: 100 },
];

const agentTableColumns = [
  { name: 'id', required: true, label: 'SN', align: 'left', field: 'id', sortable: true },
  { name: 'name', label: 'Agent', align: 'left', field: 'name', sortable: true },
  { name: 'complaints', label: 'No. of Logged Complaints', align: 'center', field: 'complaints', sortable: true },
  { name: 'actions', label: 'Actions', align: 'center', field: 'action', sortable: false },
];

// CategoryWise Table Data
const categoryTableData = [
  { id: 1, complaint: 'Complain Form', count: 9200 },
  { id: 2, complaint: 'Drinking Water Related Complaints', count: 200 },
  { id: 3, complaint: 'Related to health post / hospital', count: 900 },
  { id: 4, complaint: 'Compensation not resolved by authority', count: 100 },
  { id: 5, complaint: 'Compensation not resolved by authority', count: 100 },
  { id: 6, complaint: 'Compensation not resolved by authority', count: 100 },
  { id: 7, complaint: 'Compensation not resolved by authority', count: 100 },
];

const categoryTableColumns = [
  { name: 'id', required: true, label: 'SN', align: 'left', field: 'id', sortable: true },
  { name: 'complaint', label: 'Complaints', align: 'left', field: 'complaint', sortable: true },
  { name: 'count', label: 'No. of Complaints', align: 'center', field: 'count', sortable: true },
  { name: 'action', label: 'Actions', align: 'center', field: 'action', sortable: false },
];

// Edit Item Function

</script>

<style scoped>
.my-card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


</style>
