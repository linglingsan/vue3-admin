import HelloWorld from "@/components/Helloworld";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  setup(props) {
    return () => <div>
      <HelloWorld msg="2233"/>
    </div>;
  },
});
