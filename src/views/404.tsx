import { defineComponent } from "vue";

export default defineComponent({
  name: "404",
  setup(props) {
    return () => <div>404</div>;
  },
});
