import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
   {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard/Dashboard.vue'),
      meta: {
         requiresAuth: true,
      }
   },
   {
      path: '/shipments',
      name: 'Shipments',
      component: () => import('@/views/Shipments/Shipments.vue'),
      meta: {
         requiresAuth: true,
      }
   },
   {
      path: '/add-shipment',
      name: 'AddShipment',
      component: () => import('@/views/AddShipment/AddShipment.vue'),
      meta: {
         requiresAuth: true,
      }
   },
   {
      path: '/detail-shipment/:id',
      name: 'DetailShipment',
      component: () => import('@/views/DetailShipment/DetailShipment.vue'),
      meta: {
         requiresAuth: true,
      }
   },
   {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/Login.vue'),
   },
   {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import('@/views/Login/Login.vue'),
      meta: {
         notFound: true,
      }
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

const getCurrentUser = () => {
   return new Promise((resolve, reject) => {
      const removeListener = onAuthStateChanged(
         getAuth(),
         (user) => {
            removeListener();
            resolve(user);
         },
         reject
      )
   })
}

router.beforeEach(async (to,from, next) => {
   if(to.matched.some((record) => record.meta.requiresAuth)) {
      if(await getCurrentUser()) {
         next()
      } else {
         next('/login');
         console.error("Yetkisiz işlem")
      }
   } else {
      next();
   }
});

export default router


