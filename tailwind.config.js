// module.exports = {
//   prefix: 'tw-', // Add your custom prefix here
//   content: [
//     './src/**/*.html',
//     './src/**/*.vue',
//     './src/**/*.js',
//     './src/**/*.ts',
//     './src/**/*.jsx',
//     './src/**/*.tsx',
//     './src/**/*.md',
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
//

/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-', // Add your custom prefix here

  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',  // Adjust this if your files are elsewhere
    './node_modules/@quasar/extras/**/*.{css,js}',  // If using Quasar extras
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
