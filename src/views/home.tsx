import { defineComponent, onMounted, ref, toRaw } from "vue";
import { Button, Layout, message } from "ant-design-vue";
import { YouSTong, WeiMobCloud, LinkResult } from "@/components/home";
import * as goodsApi from "@/http/goods";
import { LinkParams, WMGoodsDetail, YouSTongSKUList } from "@/http/types";
import { YouSTongList } from "../http/types";

const { Header, Content, Footer } = Layout;
export default defineComponent({
  name: "Home",
  setup(props) {
    const list = ref<{ youSTong: YouSTongSKUList[]; wmGoods: WMGoodsDetail[] }>(
      {
        youSTong: [],
        wmGoods: [],
      }
    );

    function getChildValue(data: {
      youSTong?: YouSTongSKUList[];
      wmGoods?: WMGoodsDetail[];
    }) {
      if (data.youSTong) {
        list.value.youSTong = data.youSTong;
      }
      if (data.wmGoods) {
        list.value.wmGoods = data.wmGoods;
      }
    }

    function handleLink() {
      const data = toRaw(list.value);

      if (data.youSTong.length !== 1) {
        message.warn("请选择一个优时通商品");
        return;
      }

      if (data.wmGoods.length !== 1) {
        message.warn("请选择一个微盟云商品");
        return;
      }

      const { SKUNo, SKUName, ImageUrl, DefaultStock } = JSON.parse(
        JSON.stringify(data.youSTong[0])
      );
      const {
        goodsId,
        selectedKey: skuId,
        title,
        defaultImageUrl,
      } = JSON.parse(JSON.stringify(data.wmGoods[0]));

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
        if (res.status === 200) {
          list.value.wmGoods = [];
          list.value.youSTong = [];
          message.success("绑定成功");
          // TODO clear selectedKey
        }
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
