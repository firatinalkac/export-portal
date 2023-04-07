import { createApp } from 'vue'
import '@/assets/styles/style.css'
import Container from "@/container/Container.vue";
import router from "@/router/index.js";
import '@/config/firebaseConfig'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, far, fab)

const app = createApp(Container);

app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
