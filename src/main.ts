import { createApp } from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import './utils/rem'
import CcgUI from "./components/";
createApp(App).use(Vant).use(CcgUI).mount('#app')
