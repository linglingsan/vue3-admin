import { Button, Image, Popconfirm, Tooltip } from "ant-design-vue";
import { WMPageList, YouSTongSKUList } from "@/http/types";
import { LinkRow } from "@/http/types";
import { toRaw } from "vue";

export function getShopColumns() {
  return [
    {
      title: "货架号",
      width: 160,
      ellipsis: true,
      dataIndex: "articleno",
    },

    {
      title: "天马商品",
      width: 120,
      dataIndex: "brandname",
      customRender: ({
        text,
        record,
      }: {
        text: string;
        record: Record<string, string>;
      }) => {
        return (
          <div class="flex flex-col">
            <Image width={80} src={record.pic_url} />
            <Tooltip title={text}>
              <div class="w-full truncate ">{text}</div>
            </Tooltip>
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
      title: "货架号",
      dataIndex: "ystSkuNo",
    },
    {
      title: "天马商品名称",
      dataIndex: "ystSkuName",
    },
    {
      title: "天马商品图片",
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
