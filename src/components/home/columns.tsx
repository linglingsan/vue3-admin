import { Button, Image } from "ant-design-vue";
import { WMPageList, YouSTongSKUList } from "@/http/types";
import { LinkRow } from "@/http/types";

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
            <div class="w-full truncate">{text}</div>
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
      title: "单价",
      width: 80,
      // TODO multi 
      dataIndex: ["CurrentPrices", 0, "UnitPrice"],
    },
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
            <div class="w-full truncate">{text}</div>
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
      title: "是否订阅",
      dataIndex: "subscribeStatus",
      customRender: ({ text }: { text: string }) => {
        return +text ? "是" : "否";
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
      title: "操作",
      key: "operate",
      customRender: ({ record }: { record: LinkRow }) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => handleDelete(record.id.toString())}
            >
              删除
            </Button>
          </div>
        );
      },
    },
  ];
}
