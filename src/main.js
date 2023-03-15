import { createApp } from 'vue'
import App from './App.vue'
import {createStore} from "vuex";

import './assets/main.css'
import { store } from '@/store/store'

createApp(App).use(store).mount('#app')
