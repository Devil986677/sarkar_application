<template>
  <q-layout>
    <q-header class="custom-header">
      <q-toolbar>
        <div class="tw-ml-8" style="width: auto; padding-left: 20px;">
          <img src="../assets/images/hellosarkar.svg" alt="Logo" class="tw-mt-4 tw-block" />
        </div>

        <q-toolbar-title></q-toolbar-title>

<!--search field-->
        <q-input
          dark
          dense
          standout
          v-model="search"
          input-class="text-left"
          class="q-ml-md custom-input tw-my-2 tw-mt-4 mt-border-[#000000]"
          style="width: 80%; max-width: 600px;"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon
              name="search"
              class="cursor-pointer"
              @click="onSearch"
            />
          </template>
        </q-input>
        <div>
          <!-- Button to trigger dropdown -->
          <div
            class="tw-bg-[#ffffff] tw-p-2 tw-m-2 cursor-pointer flex items-center"
            @click="toggleDropdown"
            ref="dropdownButton"
          >
            <img src="../assets/images/nepal.svg" alt="Nepal" class="tw-inline-block tw-mr-2">
            <img src="../assets/images/arrow.svg" alt="Arrow" class="tw-inline-block">
          </div>
          <!-- Dropdown Menu -->
          <q-menu
            v-show="isDropdownOpen"
            anchor="bottom left"
            self="top left"
            :fit="true"
            @click-outside="isDropdownOpen = false"
          >
            <q-list class="tw-bg-white tw-border tw-rounded tw-shadow-md ">
              <q-item clickable v-ripple @click="selectOption('ne')">
                <q-item-section>
                  <img src="../assets/images/nepal.svg" alt="Nepal" class="tw-inline-block tw-mr-2">
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="selectOption('en')">
                <q-item-section>Option 2</q-item-section>
              </q-item>

            </q-list>
          </q-menu>
        </div>
        <div class="tw-p-2">
          <img src="../assets/images/notification.svg" alt="Nepal" class="tw-inline-block ">

        </div>



<router-link to="/profile">
  <img src="../assets/images/profile.jpg" alt="Profile Image" class="tw-w-[45px] tw-h-[45px] tw-rounded-full tw-object-cover" />

</router-link>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      :mini="miniState"
      :width="270"
      :breakpoint="500"
      mini-to-overlay
      show-if-above
      bordered
      class="my-drawer-class"
      @mouseout="mouseMoveOut(true)"
      @mouseover="mouseMoveOut(false)"
    >
      <q-list>

        <EssentialLink
          v-for="link in filteredLinksList"
          :key="link.title"
          v-bind="link" :title="link.title"  @click="handleLinkClick(link)" class="tw-text-[14px] tw-leading-[20px] tw-font-[500]">

        </EssentialLink>
      </q-list>
    </q-drawer>

    <q-page-container class="tw-bg-[#f5fafd] tw-h-min-[100vh]" style="padding-top: 0px">
      <router-view />
    </q-page-container>
    <q-dialog v-model="isLogoutDialogOpen" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm Logout</div>
        </q-card-section>

        <q-card-section>
          <p>Are you sure you want to logout?</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="isLogoutDialogOpen = false" />
          <q-btn flat label="Logout" color="negative" @click="confirmLogout" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import {useAuthStore} from 'src/stores/auth';
import {i18n} from "boot/i18n.js";
import { useRouter } from 'vue-router';


const isDropdownOpen = ref(false);
const userStore = useAuthStore();
const drawer = ref(true);
const miniState = ref(true);
const search = ref(null);
const selectedLanguage =ref('ne');
const isLogoutDialogOpen = ref(false);
const router = useRouter();


const toggleDropdown = () => {

  // console.log('before',isDropdownOpen.value)
  isDropdownOpen.value = !isDropdownOpen.value;
  // console.log('after',isDropdownOpen.value)


};





const selectOption = (language) => {
  selectedLanguage.value = language;
  i18n.global.locale = language; // Set the current language
  localStorage.setItem("language", language); // Store language in localStorage
  location.reload()
  isDropdownOpen.value = false;
  isDropdownOpen.value = false;

};

onMounted(() => {
  userStore.fetchUser();
});

// const username = computed(() => {
//   return userStore.user ? userStore.user.username : null;
// });

const userRoles = computed(() => {
  return userStore.user?.roles.map((role) => role.name) || [];
});

const linksList = [
  {
    title: 'Dashboard',
    caption: '',
    icon: 'dashboard.svg',
    link: '/dashboard',
    roles: ['System Monitoring'],
  },
  {
    title: 'Calls',
    caption: '',
    icon: 'calls.svg',
    link: '/complains',
    roles: ['System Monitoring', 'Office Admin'],
  },
  {
    title: 'Users',
    caption: '',
    icon: 'users.svg',
    link: '/users',
    roles: ['System Monitoring', 'Office Admin'],
  },
  {
    title: 'Complains',
    caption: '',
    icon: 'complaints.svg',
    link: '/complains',
    roles: ['System Monitoring', 'Office Admin'],
  },
  {
    title: 'Forms',
    caption: '',
    icon: 'forms.svg',
    link: '/complains',
    roles: ['System Monitoring', 'Office Admin'],
  },
  {
    title: 'Offices',
    caption: '',
    icon: 'offices.svg',
    link: '/complains',
    roles: ['System Monitoring', 'Office Admin'],
  },
  {
    title: 'New Complains',
    caption: '',
    icon: 'newComplaints.svg',
    link: '/complains',
    roles: ['System Monitoring', 'Office Admin'],
  },

  {
    title: 'Office Category',
    caption: '',
    icon: 'apartment',
    link: '/office-categories',
    roles: ['System Monitoring'],
  },
  {
    title: 'Reports',
    caption: '',
    icon: 'reports.svg',
    link: '/office-categories',
    roles: ['System Monitoring'],
  },
  {
    title: 'Others',
    caption: '',
    icon: 'others.svg',
    link: '/office-categories',
    roles: ['System Monitoring'],
  },

  {
    title: 'Logout',
    caption: '',
    icon: 'logout.svg',
    action: 'logout',
    roles: ['Office Admin', 'User', 'System Monitoring'],
  },

];

function handleLinkClick(link) {
  if (link.title === 'Logout') {
    isLogoutDialogOpen.value = true;

  } else {
    router.push(link.path);
  }
}
const confirmLogout = () => {
  userStore.logout();
  isLogoutDialogOpen.value = false;

  router.push("/login");
};

const filteredLinksList = computed(() => {
  return linksList.filter((link) =>
    link.roles.some((role) => userRoles.value.includes(role))
  );
});

const mouseMoveOut = (val) => {
  let miniStateFromLocal = localStorage.getItem('miniState');
  if (miniStateFromLocal === null || miniStateFromLocal === 'true') {
    miniState.value = val;
  }
};

const onSearch=()=>{

}
const languageModal=()=>{

}

</script>

<style scoped>
.custom-header {
  height: 80px;
  background-color: #ffffff;
  color: #5f5f5f;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  z-index: 10000;
}

.my-drawer-class {
  background: #ffffff;
}

.my-drawer-class .q-item {
  white-space: break-spaces;
  color: #5f5f5f;
}

.my-drawer-class .q-item,
.my-drawer-class .q-item__section--side > .q-icon {
  color: #5f5f5f;
}

.my-drawer-class .q-item.q-item--active {
  background: rgba(0, 0, 0, 0.05);
}
.custom-input {
  border: 1px solid #dddddd; /* Default border color set to black */
  border-radius: 4px;      /* Optional: Adjust the border radius */
}

.custom-input:focus-within {
  border-color: #dddddd; /* Keep the border black on focus */
}
</style>
