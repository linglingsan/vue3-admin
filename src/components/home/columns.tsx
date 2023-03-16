import { Button, Image, Popconfirm, Tooltip } from "ant-design-vue";
import { WMPageList, YouSTongSKUList } from "@/http/types";
import { LinkRow } from "@/http/types";
import { toRaw } from "vue";

export function getShopColumns() {
  return [
    {
      title: "商品",
      width: 160,
      ellipsis: true,
      dataIndex: "SKUName",
      customRender: ({
        text,
        record,
      }: {
        text: string;
        record: YouSTongSKUList;
      }) => {
        return (
          <div class="flex flex-col items-center">
            <Image width={80} src={record.ImageUrl} />
            <Tooltip title={text}>
              <div class="w-full truncate">{text}</div>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "商品编号",
      dataIndex: "SKUNo",
      width: 80,
    },
    {
      title: "品牌名称",
      width: 120,
      dataIndex: "BrandName",
    },
    {
      title: "单价信息",
      width: 120,

      dataIndex: "CurrentPrices",
      customRender: (text: any) => {
        const newText = toRaw(text.value).map(
          (item: { QtyPerOrder: number; UnitPrice: number }) =>
            `${item.UnitPrice}元/${item.QtyPerOrder}件`
        );
        const [first, second] = newText;
        // truncate
        return (
          <Tooltip
            overlayStyle={{ whiteSpace: "pre-line" }}
            title={text.value.length > 2 ? newText.join("\n") : ""}
          >
            <div style={{ whiteSpace: "pre-line" }}>
              {[first, second, "..."].join("\n")}
            </div>
          </Tooltip>
        );
      },
    },
    { title: "体积占比", dataIndex: "UnitVolumeOfPackage" },
  ];
}

export function getGoodsColumns() {
  return [
    {
      title: "商品ID",
      dataIndex: "goodsId",
      width: 80,
    },
    {
      title: "商品",
      dataIndex: "title",
      ellipsis: true,
      width: 160,
      customRender: ({
        text,
        record,
      }: {
        text: string;
        record: WMPageList;
      }) => {
        return (
          <div class="flex flex-col items-center">
            <Image width={80} src={record.defaultImageUrl} />
            <Tooltip title={text}>
              <div class="w-full truncate">{text}</div>
            </Tooltip>
          </div>
        );
      },
    },
  ];
}

export function getChildColumns() {
  return [
    {
      title: "SKU条码",
      dataIndex: "skuId",
    },
    {
      title: "销售价",
      dataIndex: "salePrice",
    },
  ];
}

export function linkResultColumns({
  handleDelete,
}: {
  handleDelete: (id: string) => void;
}) {
  return [
    {
      title: "优时通SKU",
      dataIndex: "ystSkuNo",
    },
    {
      title: "优时通商品名称",
      dataIndex: "ystSkuName",
    },
    {
      title: "优时通商品图片",
      dataIndex: "ystImageUrl",
      customRender: ({ text }: { text: string }) => {
        return <Image width={80} src={text} />;
      },
    },
    {
      title: "微盟云SKU",
      dataIndex: "wmGoodsId",
    },
    {
      title: "微盟云商品名称",
      dataIndex: "wmGoodsName",
    },
    {
      title: "微盟云商品图片",
      dataIndex: "wmImageUrl",
      customRender: ({ text }: { text: string }) => {
        return <Image width={80} src={text} />;
      },
    },
    {
      title: "仓库名称",
      dataIndex: "defaultStock",
    },
     {
      title: "是否订阅",
      dataIndex: "subscribeStatus",
      customRender: ({ text }: { text: string }) => {
        return +text ? "是" : "否";
      },
    },
    {
      title: "操作",
      key: "operate",
      customRender: ({ record }: { record: LinkRow }) => {
        return (
          <div>
            <Popconfirm
              title="您确定要删除吗"
              okText="确定"
              cancelText="取消"
              onConfirm={() => handleDelete(record.id.toString())}
            >
              <Button type="link">删除</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
}
