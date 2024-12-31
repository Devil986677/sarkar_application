<template>
  <HeaderTop/>
  <div class="tw-bg-gradient-to-r tw-h-[96vh] tw-from-white/20 tw-via-blue-100/40 tw-to-blue-200/40">
    <div class="tw-container tw-mx-auto tw-h-full">
      <div class="tw-grid tw-grid-cols-2 tw-gap-5 tw-h-full tw-items-center">
        <div>
          <p class="tw-text-[#0f75bc] tw-p-4 tw-text-[40px] tw-leading-[52px] tw-text-center tw-font-[700]">
            Admin&nbsp;<span class="tw-text-[#2b2a2a]">Login</span>
          </p>
          <div class="tw-pl-32 tw-py-8">
            <img src="../assets/images/login.svg" alt="Login Illustration" />
          </div>
        </div>

        <div class="tw-bg-[#FFFFFF] tw-shadow-md tw-shadow-black/5 tw-p-8 tw-m-16 tw-rounded-[10px] tw-flex tw-flex-col tw-justify-center">
          <!-- Login Form -->
          <form @submit.prevent="handleLogin">
            <div class="tw-mb-4">
              <label
                for="username"
                class="tw-block tw-text-[16px] tw-leading-[24px] tw-font-500 tw-text-[#777777] tw-mb-2"
              >
                Username/Mobile Number
                <span style="color: red" class="tw-text-red tw-inline-block">*</span>
              </label>
              <input
                id="username"
                v-model="username"
                type="text"
                class="tw-w-full tw-border tw-rounded-lg tw-p-4 tw-text-[#a0a0a0] tw-focus:ring tw-focus:ring-blue-300 tw-focus:outline-none"
                placeholder="Enter Username/Mobile Number" required/>
            </div>
            <div class="tw-mb-4">
              <div class="tw-mb-4">
                <label
                  for="password"
                  class="tw-block tw-text-[16px] tw-leading-[24px] tw-font-500 tw-text-[#777777] tw-mb-2"
                >
                  Password
                  <span style="color: red" class="tw-text-red tw-inline-block">*</span>
                </label>
                <div class="tw-relative tw-w-full">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="password"
                    class="tw-w-full tw-border tw-rounded-lg tw-p-4 tw-pr-10 tw-text-gray-900 tw-focus:ring tw-focus:ring-blue-300 tw-focus:outline-none"
                    placeholder="Enter Password"
                    required
                  />
                  <button
                    type="button"
                    @click="togglePasswordVisibility"
                    class="tw-absolute tw-right-3 tw-top-1/2 tw-transform -tw-translate-y-1/2"
                  >
                    <svg
                      v-if="!showPassword"
                      xmlns="http://www.w3.org/2000/svg"
                      class="tw-w-6 tw-h-6 tw-text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12A3 3 0 119 12a3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.123.354-.26.7-.404 1.037m-1.192 2.408A9.966 9.966 0 0112 19c-4.477 0-8.268-2.943-9.542-7-.123-.354-.26-.7-.404-1.037M14.121 14.121l1.415 1.415M14.121 14.121L17.243 17.243M14.121 14.121l1.415-1.415M14.121 14.121l1.415 1.415"
                      />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="tw-w-6 tw-h-6 tw-text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.875 18.825A9.993 9.993 0 0012 19c-4.478 0-8.269-2.943-9.542-7a10.008 10.008 0 012.61-4.757m2.464-2.506C7.926 5.87 9.913 5 12 5c4.477 0 8.268 2.943 9.542 7-.123.354-.26.7-.404 1.037M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 3l18 18"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="tw-flex tw-items-center tw-justify-between tw-mb-4">
              <label class="tw-flex tw-items-center tw-text-sm">
                <input
                  type="checkbox"
                  class="tw-mr-2 tw-rounded tw-border-gray-300"
                />
                <span class="tw-text-[16px] tw-leading-[24px] tw-font-400 tw-text-[#666666]"> Remember Me</span>
              </label>
              <router-link
                to="/forgot-password"
                class="tw-text-[16px] tw-leading-[24px] tw-font-[400] tw-text-[#0f75bc] tw-hover:underline">
                Forgot Your Password?{{$t('welcome')}}
              </router-link>
            </div>
            <button
              type="submit"
              class="tw-w-full tw-bg-blue-500 tw-text-white tw-py-2 tw-px-4 tw-rounded-lg tw-hover:bg-blue-600"
              :disabled="!username || !password"
              :class="{'tw-bg-gray-300 tw-cursor-not-allowed': !username || !password}"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import HeaderTop from '../components/HeaderTop.vue';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const $q = useQuasar(); // Quasar's global helper
const auth = useAuthStore(); // Pinia store for authentication

const username = ref('');
const password = ref('');
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  try {
    await auth.login({ username: username.value, password: password.value }); // Call the login action
    await router.push('/dashboard'); // Navigate to the dashboard
  } catch (error) {
    // $q.notify({ type: 'negative', message: 'Login failed!' }); // Notify the user
  }
};
</script>

