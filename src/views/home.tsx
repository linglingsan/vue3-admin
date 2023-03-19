import { defineComponent, ref } from "vue";
import { Button, Layout, message } from "ant-design-vue";
import { TianMa, WeiMobCloud, LinkResult } from "@/components/home";
import * as goodsApi from "@/http/goods";
import { LinkParams, WMGoodsDetail, TMRows } from "@/http/types";

const { Header, Content } = Layout;

type Key = string | number;

type YousTongValue = {
  selectedKeys: Key[];
  selectedRows: TMRows[];
};

type wmGoodsValue = {
  selectedKeys: Key[];
  selectedRows: WMGoodsDetail[];
};

export default defineComponent({
  name: "Home",
  setup(props) {
    const youSTong = ref<{
      getSeleteValue: () => YousTongValue;
      handleChange: () => void;
    } | null>(null);
    const wmGoods = ref<{
      getSeleteValue: () => wmGoodsValue;
      handleChange: () => void;
    } | null>(null);

    const link = ref<{ getList: () => void } | null>(null);

    function handleLink() {
      if (!youSTong.value || !youSTong.value.getSeleteValue) return;
      if (!wmGoods.value || !wmGoods.value.getSeleteValue) return;

      const youSTongValue = youSTong.value?.getSeleteValue();
      const wmGoodsValue = wmGoods?.value?.getSeleteValue();

      if (youSTongValue.selectedKeys.length !== 1) {
        message.warn("请选择一个天马商品");
        return;
      }

      if (wmGoodsValue.selectedKeys.length !== 1) {
        message.warn("请选择一个微盟云商品");
        return;
      }

      const { articleno, brandname, pic_url } = JSON.parse(
        JSON.stringify(youSTongValue.selectedRows[0])
      );

      const {
        goodsId,
        selectedKey: skuId,
        title,
        defaultImageUrl,
      } = JSON.parse(JSON.stringify(wmGoodsValue.selectedRows[0]));

      const parmas: LinkParams = {
        ystSkuNo: articleno,
        ystSkuName: brandname,
        ystImageUrl: pic_url,
        defaultStock: "",
        wmGoodsId: goodsId.toString(),
        wmGoodsName: title,
        wmImageUrl: defaultImageUrl,
        wmSkuCode: skuId.toString(),
        dataSource: "TM",
      };

      goodsApi.save(parmas).then((res) => {
        if (res.status === 200) {
          message.success("绑定成功");
          youSTong.value?.handleChange();
          wmGoods.value?.handleChange();
          link.value?.getList();
        } else {
          message.warning((res as unknown as Record<string, string>).message);
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
            <TianMa ref={youSTong} />
            <WeiMobCloud ref={wmGoods} />
          </div>
          <div class="flex flex-col">
            <LinkResult ref={link} />
          </div>
        </Content>
      </Layout>
    );
  },
});
