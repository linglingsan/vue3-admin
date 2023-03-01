import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import "./index.less";
import 'ant-design-vue/dist/antd.css';

const App = defineComponent({
  setup() {
    return () => <RouterView />;
  },
});

export default App;
