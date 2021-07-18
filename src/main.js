import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";

import BaseDialog from "./components/BaseUi/BaseDialog";

const app = createApp(App);

app.component("base-dialog", BaseDialog);

app.use(store).use(router).mount("#app");
