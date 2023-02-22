import { createApp } from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import CcgUI from "caochenguang-ui";
import 'caochenguang-ui/style.css';
import './utils/rem'

createApp(App).use(Vant).use(CcgUI).mount('#app')