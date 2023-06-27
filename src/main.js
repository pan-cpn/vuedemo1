import { createApp } from 'vue'
import App from './App.vue';

import router from './router/index.js';
import pinia from './store/index.js';
import ElementPlus from 'element-plus';
import vant from 'vant';

import './assets/css/base.css';
import 'normalize.css';




const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.use(vant);
app.mount('#app');
