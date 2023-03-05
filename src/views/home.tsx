import { defineComponent, onMounted, ref, toRaw } from 'vue';
import { Button, Layout } from "ant-design-vue";
import { YouSTong, WeiMobCloud, LinkResult } from "@/components/home";
import { getShopList } from "@/data/getShopList";
import * as goodsApi from "@/http/goods";

const { Header, Content, Footer } = Layout;
export default defineComponent({
  name: "Home",
  setup(props) {
    const list = ref<Record<string, string[]>>({ t1: [], t2: [] });

    function getChildValue(key: string, value: string[]) {
      list.value[key] = value
    }

    function handleLink() {
      // goodsApi.save()
      console.log(toRaw(list.value))
    }
    return () => (
      <Layout class="m-h-screen">
        <Header class="sticky top-0 z-[1]" style={{ backgroundColor: "#fff" }}>
          <Button type="primary" onClick={handleLink}>绑定</Button>
        </Header>
        <Content class="flex flex-col mx-[50px] mt-[24px]">
          <div class="flex justify-between mb-[20px]">
            <YouSTong onGetValue={getChildValue}/>
            <WeiMobCloud onGetValue={getChildValue}/>
          </div>
          <div class="flex flex-col">
            <LinkResult />
          </div>
        </Content>
      </Layout>
    );
  },
});
