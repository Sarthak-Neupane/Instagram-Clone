import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";

import BaseDialog from "./components/BaseUi/BaseDialog";
import BaseSpinner from "./components/BaseUi/BaseSpinner";
// import Close from "./components/ICONS/close";

const app = createApp(App);

app.component("base-dialog", BaseDialog);
app.component("base-spinner", BaseSpinner);
// app.component("close", Close);

app.use(store).use(router).mount("#app");
