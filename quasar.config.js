/* eslint-env node */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

import { configure } from 'quasar/wrappers';
import tailwindcss from 'tailwindcss';  // Import tailwindcss
import autoprefixer from 'autoprefixer';  // Import autoprefixer


export default configure((/* ctx */) => {
  return {
    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: [
      'pinia','i18n'

      // other boot files if necessary
    ],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: [
      'app.css', // Ensure this file is where you added Tailwind imports
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },

      vueRouterMode: 'history', // available values: 'hash', 'history'

      // Adding PostCSS plugins configuration here
      postcssPluginOptions: {
        postcss: {
          plugins: [
            tailwindcss, // Tailwind CSS plugin
            autoprefixer, // Autoprefixer plugin
            'Notify'

          ],
        },
      },

      vitePlugins: [
        ['vite-plugin-checker', {
          eslint: {
            lintCommand: 'eslint "./**/*.{js,mjs,cjs,vue}"',
          },
        }, { server: false }],
      ],
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      open: true, // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
      config: {},
      plugins: [],
    },

    animations: [],


    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#property-sourcefiles
    ssr: {
      prodPort: 3000, // The default port that the production server should use
      middlewares: ['render'], // keep this as last one
      pwa: false,
    },

    // PWA Configuration
    pwa: {
      workboxMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
    },

    // Capacitor Configuration
    capacitor: {
      hideSplashscreen: true,
    },

    // Electron Configuration
    electron: {
      preloadScripts: ['electron-preload'],
      inspectPort: 5858,
      bundler: 'packager',
      packager: {},
      builder: {
        appId: 'hellosarkar',
      },
    },
  };
});
