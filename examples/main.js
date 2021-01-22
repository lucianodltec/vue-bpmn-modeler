import Vue from "vue";
import App from "./App.vue";
import BpmnModeler from '../lib/BpmnModeler'

Vue.config.productionTip = true;
Vue.component(BpmnModeler.name, BpmnModeler)

new Vue({
  render: h => h(App)
}).$mount("#app");
