
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/app.css"
import Vue3Lottie from 'vue3-lottie'
import 'tw-elements'
import "animate.css"
import VueSweetalert2 from 'vue-sweetalert2';
import "../node_modules/sweetalert2/dist/sweetalert2.min.css";


createApp(App).use(store).use(router).use(Vue3Lottie).use(VueSweetalert2).mount('#app')


