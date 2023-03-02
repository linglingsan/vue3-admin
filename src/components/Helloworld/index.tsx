import { ref, defineComponent } from "vue";
import classes from "./index.module.less";
import { Button } from "ant-design-vue";

export default defineComponent({
  name: "HelloWorld",
  props: { msg: { type: String, required: true } },
  setup(props) {
    const count = ref(0);
    return () => (
      <div class={classes.test}>
        <div>test-{props.msg}</div>
        <div>{count.value}</div>
        <Button type="primary" onClick={() => count.value++}>
          add
        </Button>
        <Button onClick={() => count.value--}>minus</Button>
      </div>
    );
  },
});
