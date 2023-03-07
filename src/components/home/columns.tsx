import { Button, Image, Tooltip } from "ant-design-vue";
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
      title: "单价",
      width: 80,
      dataIndex: "CurrentPrices",
      customRender: (text: any) => {
        return (
          <div class="flex">
            {text.map((item: { QtyPerOrder: number; UnitPrice: number }) => (
              <div key={item.QtyPerOrder}>
                {item.UnitPrice}元/{item.QtyPerOrder}件
              </div>
            ))}
          </div>
        );
      },
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
