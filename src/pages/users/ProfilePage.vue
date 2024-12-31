<template>
  <div class="tw-mx-8 tw-h-[91vh] tw-bg-[#f5fafd]">
    <div class="tw-text-[32px] tw-font-[700] tw-text-[#444444]">Update and Manage Your Account</div>
    <div class="tw-py-4 tw-flex tw-justify-between">
      <div>
        <img src="../../assets/images/profile.jpg" alt="Profile Image" class="tw-w-[100px] tw-h-[100px] tw-rounded-full tw-object-cover" />
      </div>
      <div>
        <div class="tw-border-[1px] tw-border-[#0f75bc] tw-rounded-[4px] tw-px-[8px] tw-py-[16px] tw-text-[16px] tw-leading-[24px] tw-font-[500] tw-bg-[#ffffff] tw-inline-block tw-mx-1 tw-text-[#0f75bc]">Update Account Info</div>
        <div class="tw-border-[1px] tw-border-[#0f75bc] tw-rounded-[4px] tw-px-[8px] tw-py-[16px] tw-text-[16px] tw-leading-[24px] tw-font-[500] tw-bg-[#ffffff] tw-inline-block tw-mx-1 tw-text-[#0f75bc] " @click="openPasswordDialog">Change Password</div>
      </div>
    </div>
    <div class="tw-py-1">{{nameValue}}
      <label for="name" class="tw-py-2">Name <span class="tw-text-[#ff0000]">*</span></label>
      <q-input filled v-model="nameValue" />
    </div>
    <div class="tw-py-2">
      <label for="name_np" class="tw-py-2">नाम <span class="tw-text-[#ff0000]">*</span></label>
      <q-input filled v-model="nameNpValue" />
    </div>
    <div class="tw-py-2">
      <label for="name_np" class="tw-py-2">Mobile <span class="tw-text-[#ff0000]">*</span></label>
      <q-input filled v-model="mobileValue"  />
    </div>
    <div class="tw-py-2">
      <label for="name_np" class="tw-py-2">Email </label>
      <q-input filled v-model="emailValue"  />
    </div>
    <div class="tw-text-right tw-mt-2">
      <div class="tw-border-[1px] tw-border-[#ff0000] tw-text-[#ff0000] tw-py-[8px] tw-px-[16px] tw-inline-block tw-rounded-[4px] tw-mx-1">Cancel</div>
      <div class="tw-text-[#ffffff] tw-bg-[#0000ff] tw-py-[8px] tw-px-[16px] tw-inline-block tw-rounded-[4px] tw-mx-1" @click="updateProfile">Save Changes</div>
    </div>
    <!-- Password Change Modal -->
    <q-dialog v-model="passwordDialogVisible">
      <q-card class="tw-w-[500px]">
        <q-card-section>
<div class="tw-flex tw-justify-between">
  <div class="tw-text-[20px] tw-leading-[28px] tw-font-[600] tw-text-[#444444]">Change Password</div>
  <div class="tw-text-[20px]  tw-text-[#ff0000]" @click="closePasswordDialog">X</div>

</div>
        </q-card-section>
        <q-card-section>
          <div class="tw-py-2">
            <label for="old-password" class="tw-py-2 tw-text-[16px] tw-font-[400] tw-leading-[21px] tw-text-[#777777]">Old Password <span class="tw-text-[#ff0000]">*</span></label>
            <q-input filled v-model="oldPassword" type="password" class="tw-border-[1px] tw-border-[#CCCCCC] tw-rounded-[4px]"  />
          </div>
          <div class="tw-py-2">
            <label for="new-password" class="tw-py-2 tw-text-[16px] tw-font-[400] tw-leading-[21px] tw-text-[#777777]">New Password <span class="tw-text-[#ff0000]">*</span></label>
            <q-input filled v-model="newPassword" type="password" class="tw-border-[1px] tw-border-[#CCCCCC] tw-rounded-[4px]"  />
          </div>
          <div class="tw-py-2">
            <label for="confirm-password" class="tw-py-2 tw-text-[16px] tw-font-[400] tw-leading-[21px] tw-text-[#777777]">Confirm Password <span class="tw-text-[#ff0000]">*</span></label>
            <q-input filled v-model="confirmPassword" type="password" class="tw-border-[1px] tw-border-[#CCCCCC] tw-rounded-[4px]" />
          </div>
        </q-card-section>
        <q-card-actions class="tw-text-end">
          <q-btn label="Change Password" color="primary" @click="saveNewPassword" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";
import { ref, onMounted } from "vue";

// Access the store
const userStore = useAuthStore();

// Bind user details
const nameValue = ref('')
const nameNpValue = ref('')
const mobileValue =ref('')
const emailValue = ref('')
const id = ref('')


//value
id.value=userStore.user.id
 nameValue.value = userStore.user.name;
 nameNpValue.value = userStore.user.name_np;
 mobileValue.value = userStore.user.mobile;
 emailValue.value = userStore.user.email;

//password Change modal
const passwordDialogVisible = ref(false);
const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');


const updateProfile=()=>{
  userStore.updateUser(id.value)

  console.log( "Update profile",id.value,nameValue.value ,
  nameNpValue.value,
  mobileValue.value,
  emailValue.value )
}

const emptyModal=()=>{
   oldPassword.value = null;
newPassword.value = null;
  confirmPassword.value =null;
}

// Function to open the password dialog
const openPasswordDialog = () => {
  passwordDialogVisible.value = true;
};
// Function to handle saving the new password (add your logic here)
const saveNewPassword = () => {
  if (newPassword.value !== confirmPassword.value) {
    // Handle mismatch
    alert('New password and confirm password do not match!');
  } else {
    // Add your logic to save the password
    console.log("Password saved:", oldPassword.value, newPassword.value);
    closePasswordDialog();
  }
};
// Function to close the password dialog
const closePasswordDialog = () => {
  emptyModal()
  passwordDialogVisible.value = false;

};


// Profile image
const profileImage = ref<string>("");

// Fetch the user's image on mount
onMounted(() => {
  profileImage.value = userStore.user.profile_image; // Replace 'profile_image' with the actual key from the API
});
</script>
