import { createApp } from 'vue'
import '@/assets/styles/style.css'
import Container from "@/container/Container.vue";
import router from "@/router/index.js";
import { initializeApp } from "firebase/app";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, far, fab)


const firebaseConfig = {
   apiKey: "AIzaSyCi6jB12c54-g8szdw95r98hY2E5ITmgxw",
   authDomain: "shipments-app-4b996.firebaseapp.com",
   projectId: "shipments-app-4b996",
   storageBucket: "shipments-app-4b996.appspot.com",
   messagingSenderId: "973465460268",
   appId: "1:973465460268:web:1271ffa615c1994fd53b89"
};

initializeApp(firebaseConfig);

const app = createApp(Container);

app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
