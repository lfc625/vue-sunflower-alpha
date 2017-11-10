import Vue from "vue";
import VueRouter from "vue-router";
import Sunflower from "../src/";
import App from "./App";
import Marked from "./marked";
import Copy from "./copy";
import Tb from "./tb/Tb";
import TbI from "./tb/TbI";
import ExampleCode from './Example-code'
import './theme-dark/demo.css'
import './theme-chalk/demo.css'
import './theme-chalk/docs.css'
import './theme-dark/docs.css'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Sunflower);
Vue.use(Marked);
Vue.use(Copy);

Vue.component(Tb.name, Tb);
Vue.component(TbI.name, TbI);
Vue.component(ExampleCode.name, ExampleCode)

const router = new VueRouter({
  routes: [
    { path: "/components", component: require("./Components"),
      children: [
        { path: "", component: require("./Alert") },
        { path: "alert", component: require("./Alert") },
        { path: "audio", component: require("./Audio") },
        { path: "badge", component: require("./Badge") },
        { path: "box", component: require("./Box") },
        { path: "breadcrumb", component: require("./Breadcrumb") },
        { path: "button", component: require("./Button") },
        { path: "card", component: require("./Card") },
        { path: "carousel", component: require("./Carousel") },
        { path: "cascader", component: require("./Cascader") },
        { path: "checkbox", component: require("./Checkbox") },
        { path: "collapse", component: require("./Collapse") },
        { path: "date-picker", component: require("./Date-picker") },
        { path: "date-time-picker", component: require("./DatetimePicker") },
        { path: "dialog", component: require("./Dialog") },
        { path: "dropdown", component: require("./Dropdown") },
        { path: "form", component: require("./Form") },
        { path: "grid", component: require("./Grid") },
        { path: "input", component: require("./Input") },
        { path: "input-number", component: require("./Input-number") },
        { path:"loading",component:require("./Loading")},
        { path: "menu", component: require("./Menu") },
        { path: "message", component: require("./Message") },
        { path: "message-box", component: require("./Message-box") },
        { path: "notification", component: require("./Notification") },
        { path: "pagination", component: require("./Pagination") },
        { path: "popover", component: require("./Popover") },
        { path: "progress", component: require("./Progress") },
        { path: "rate", component: require("./Rate") },
        { path: "radio", component: require("./Radio") },
        { path: "scrollbar", component: require("./Scrollbar") },
        { path: "search-group", component: require("./Search-group") },
        { path: "slider", component: require("./Slider") },
        { path: "steps", component: require("./Steps") },
        { path: "switch", component: require("./Switch") },
        { path: "table", component: require("./Table") },
        { path: "tabs", component: require("./Tabs") },
        { path: "tag", component: require("./Tag") },
        { path: "time-picker", component: require("./Time-picker") },
        { path: "time-select", component: require("./Time-select") },
        { path: "tooltip", component: require("./Tooltip") },
        { path: "tree", component: require("./Tree") },
        { path:"select",component:require("./Select")},
        { path:"upload",component:require("./Upload")},
        { path:"icon",component:require("./Icon")},
        { path:"loading-bar",component:require("./LoadingBar")},
        { path:"timeline",component:require("./Timeline")},
        { path:"spin",component:require("./Spin")}
      ]
    },
    { path: "/echarts", component: require("./Echarts"),
      children: [
        { path: "", component: require("./echarts/Introduce") },
        { path: "introduce", component: require("./echarts/Introduce") },
        { path: "ring", component: require("./echarts/Ring") },
        { path: "statring", component: require("./echarts/Statring") },
        { path: "pie", component: require("./echarts/Pie") },
        { path: "gauge", component: require("./echarts/Gauge") },
        { path: "bar", component: require("./echarts/Bar") },
        { path: "line", component: require("./echarts/Line") },
        { path: "area", component: require("./echarts/Area") },
        { path: "charts", component: require("./echarts/Charts") }
      ]
    }
  ]
});

new Vue({
  el: "#app",
  router,
  render: h => h(App),
  mounted() {
    if (window.location.hash === '#/') {
      router.push('/components');
    }
  }
});