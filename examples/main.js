import Vue from "vue";
import App from "./App.vue";
import BpmnModeler from '../packages/BpmnModeler/src/BpmnModeler'
// Vue.use(BpmnModeler)
Vue.config.productionTip = true;
Vue.component(BpmnModeler.name, BpmnModeler)
new Vue({
  render: h => h(App)
}).$mount("#app");
