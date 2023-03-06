export interface YouSTongList {
  SKUList: YouSTongSKUList[];
  TotalCount: number;
}

export interface YouSTongSKUList {
  SKUNo: number;
  SKUName: string;
  BrandName: string;
  CurrentPrices: {
    QtyPerOrder: number;
    UnitPrice: number;
  };
  ImageUrl: string;
  DefaultStock: string;
}

export interface WMList {
  pageSize: number;
  pageList: WMPageList[];
  totalCount: number;
  pageNum: number;
}

export interface WMPageList {
  goodsId: number;
  title: string;
  defaultImageUrl: string;
  detailInfo: WMGoodsDetail
}

export interface WMGoodsDetail {
  goodsId: number;
  skuId: number;
  title: string;
  defaultImageUrl: string;
  skuList: WMSKUList[];
}

export interface WMSKUList {
  skuId: number;
  salePrice: number;
}

export interface LinkList {
  pageNum: number;
  pageSize: number;
  total: number;
  list: LinkRow[];
}

export enum SubscribeStatus {
  cancel = 0,
  subscribe = 1,
}

export interface LinkRow {
  defaultStock: string;
  id: bigint;
  subscribeStatus: SubscribeStatus;
  wmGoodsId: string;
  wmGoodsName: string;
  wmImageUrl: string;
  wmSkuCode: string;
  ystImageUrl: string;
  ystSkuName: string;
  ystSkuNo: string;
}

export interface LinkParams {
  defaultStock: string;
  wmGoodsId: string;
  wmGoodsName: string;
  wmImageUrl: string;
  wmSkuCode: string;
  ystImageUrl: string;
  ystSkuName: string;
  ystSkuNo: string;
}
