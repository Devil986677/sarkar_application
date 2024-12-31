import { boot } from 'quasar/wrappers'
import { createPinia } from 'pinia'

// This is where you instantiate and set up Pinia
export default boot(({ app }) => {
  const pinia = createPinia()
  app.use(pinia)
})
