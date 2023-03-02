import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import "./index.less";

const App = defineComponent({
  setup() {
    return () => <RouterView />;
  },
});

export default App;
