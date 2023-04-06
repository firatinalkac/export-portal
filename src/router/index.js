import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Dashboard from "@/views/Dashboard/Dashboard.vue";
import Shipments from "@/views/Shipments/Shipments.vue";
import AddShipment from "@/views/AddShipment/AddShipment.vue";
import DetailShipment from "@/views/DetailShipment/DetailShipment.vue";
import Login from "@/views/Login/Login.vue";
import NotFound from "@/views/notFound/notFound.vue";

const routes = [
   {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
         requiresAuth: true,
      }
   },
   {
      path: '/shipments',
      name: 'Shipments',
      component: Shipments,
      meta: {
         requiresAuth: true,
      }
   },
   {
      path: '/add-shipment',
      name: 'AddShipment',
      component: AddShipment,
      meta: {
         requiresAuth: true,
      }
   },
   {
      path: '/detail-shipment/:id',
      name: 'DetailShipment',
      component: DetailShipment,
      meta: {
         requiresAuth: true,
      }
   },
   {
      path: '/login',
      name: 'Login',
      component: Login,
   },
   {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
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


