import { defineComponent, onMounted, ref, toRaw } from "vue";
import { Button, Layout } from "ant-design-vue";
import { YouSTong, WeiMobCloud, LinkResult } from "@/components/home";
import { getShopList } from "@/data/getShopList";
import * as goodsApi from "@/http/goods";
import { LinkParams, WMGoodsDetail, YouSTongSKUList } from "@/http/types";

const { Header, Content, Footer } = Layout;
export default defineComponent({
  name: "Home",
  setup(props) {
    const list = ref<{ t1: YouSTongSKUList[]; t2: WMGoodsDetail[] }>({
      t1: [],
      t2: [],
    });

    function getChildValue(key: "t1" | "t2", value: any[]) {
      if (key === "t1") {
        list.value.t1 = value as YouSTongSKUList[];
      }
      if (key === "t2") {
        list.value.t2 = value as WMGoodsDetail[];
      }
    }

    function handleLink() {
      const data = toRaw(list.value);
      if (data.t1.length > 1 || data.t2.length > 1) {
        return;
      }
      const { SKUNo, SKUName, ImageUrl, DefaultStock } = data.t1[0];
      const { goodsId, skuId, title, defaultImageUrl } = data.t2[0];

      const parmas: LinkParams = {
        ystSkuNo: SKUNo.toString(),
        ystSkuName: SKUName,
        ystImageUrl: ImageUrl,
        defaultStock: DefaultStock,
        wmGoodsId: goodsId.toString(),
        wmGoodsName: title,
        wmImageUrl: defaultImageUrl,
        wmSkuCode: skuId.toString(),
      };

      goodsApi.save(parmas).then((res) => {
        console.log(res);
      });
    }
    return () => (
      <Layout class="m-h-screen">
        <Header class="sticky top-0 z-[1]" style={{ backgroundColor: "#fff" }}>
          <Button type="primary" onClick={handleLink}>
            绑定
          </Button>
        </Header>
        <Content class="flex flex-col mx-[50px] mt-[24px]">
          <div class="flex justify-between mb-[20px]">
            <YouSTong onGetValue={getChildValue} />
            <WeiMobCloud onGetValue={getChildValue} />
          </div>
          <div class="flex flex-col">
            <LinkResult />
          </div>
        </Content>
      </Layout>
    );
  },
});
