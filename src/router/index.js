import { createRouter, createWebHistory } from 'vue-router'
//import { inject } from 'vue'
//import NProgress from 'nprogress'
import EventListView from '../views/EventListView.vue'
const About = () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import EventLayout from '../views/event/Layout.vue'
//const GStore = inject('Gstore')

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventListView,
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/about-us',
    name: 'about',
    component: About
  },
  {
    path: '/about',
    redirect: { name: 'about' }
  },
  {
    path: '/events/:id',
    name: 'event-layout',
    props: true,
    component: EventLayout,
    children: [
      {
        path: '',
        name: 'event-details',
        component: EventDetails
      },
      {
        path: 'register',
        name: 'event-register',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'event-edit',
        component: EventEdit,
        meta: { requireAuth: true }
      }
    ]
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: (to) => {
      //return `/events/${to.params.id}`
      //return { name: 'event-details', params: { id: to.params.id } }
      return { path: `/events/${to.params.afterEvent}` }
    }
    /* children: [
        { path: 'register', redirect: () => ({ name: 'event-register' }) },
        { path: 'edit', redirect: () => ({ name: 'event-edit' }) }
      ] */
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFound
  },
  {
    path: '/network-error',
    name: 'network-error',
    component: NetworkError
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  /* scrollBehavior() {
    // <---
    // always scroll to top
    return { top: 0 }
  }, */
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // <----
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
