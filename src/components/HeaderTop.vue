<template>
  <section class="tw-bg-[#414141]">
    <div class="tw-container tw-mx-auto">
      <div class="tw-text-white tw-py-2 tw-mx-auto tw-flex tw-justify-between">
        <div>
          <label for="" class="tw-text-[14px]">{{ $t('follow') }}:</label>
          <router-link to="https://facebook.com" target="_blank">
            <img src="../assets/images/facebook.svg" alt="facebook" class="tw-inline-block tw-px-2" />
          </router-link>
          <router-link to="https://x.com/?mx=2" target="_blank">
            <img src="../assets/images/x.svg" alt="x" class="tw-inline-block tw-px-2" />
          </router-link>
        </div>

        <!-- Dropdown Button -->
        <div class="tw-relative">
          <button
            @click="toggleDropdown"
            class="tw-flex tw-items-center tw-space-x-1 tw-text-md tw-font-medium tw-bg-[#545454] tw-px-2 tw-rounded"
          >
            <span v-if="selectedLanguage==='en'">English</span>
            <span v-if="selectedLanguage==='np'">Nepali</span>
            <img src="../assets/images/down.svg" alt="x" class="tw-inline-block tw-px-2" />
          </button>

          <!-- Dropdown Menu -->
          <div
            v-show="isDropdownOpen"
            class="tw-absolute tw-mt-2 tw-right-0 tw-top-2 tw-w-32 tw-bg-[#ffffff] tw-shadow-lg tw-rounded tw-dropDown"
            style="z-index:100 !important;"
          >
            <ul class="tw-py-1">
              <li>
                <button
                  @click="selectLanguage('np')"
                  class="tw-block tw-w-full tw-text-left tw-px-4 tw-py-2 tw-text-[#000000] tw-hover:bg-[#f0f0f0]"
                >
                  नेपाली
                </button>
              </li>
              <li>
                <button
                  @click="selectLanguage('en')"
                  class="tw-block tw-w-full tw-text-left tw-px-4 tw-text-[#000000] tw-py-2 tw-hover:bg-[#f0f0f0]"
                >
                  English
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { i18n } from 'boot/i18n';


const isDropdownOpen = ref(false);
const selectedLanguage = ref("English");

onMounted(() => {
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage) {
    selectedLanguage.value = savedLanguage;
  }
});

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function selectLanguage(language) {
  selectedLanguage.value = language;
  i18n.global.locale = language; // Set the current language
  localStorage.setItem("language", language); // Store language in localStorage
  isDropdownOpen.value = false; // Close the dropdown
}
</script>

<style>
.tw-dropDown {
  z-index: 10;
}
</style>
