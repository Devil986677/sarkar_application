const routes = [
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  }
  ,{
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/countries', component: () => import('pages/countries/CountryList.vue') },
      { path: '/faqs', component: () => import('pages/faqs/FaqsList.vue') },
      { path: '/districts', component: () => import('pages/district/DistrictsList.vue') },
      { path: '/cities', component: () => import('pages/cities/CitiesList.vue') },
      { path: '/office-categories', component: () => import('pages/office-catagories/OfficeCatagoriesList.vue') },

      { path: '/offices', component: () => import('pages/offices/OfficeList.vue'),
      children:[
      ]
      },
      { path: '/states', component: () => import('pages/states/StatesList.vue') },
      { path: '/complains', component: () => import('pages/complains/ComplainsList.vue') },
      { path: '/users', component: () => import('pages/users/UserList.vue') },
      { path: '/profile', component: () => import('pages/users/ProfilePage.vue') },


    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
