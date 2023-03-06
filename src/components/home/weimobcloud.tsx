import { Card, Input, Table } from "ant-design-vue";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRaw,
} from "vue";
import { getChildColumns, getGoodsColumns } from "./columns";
import * as goodsApi from "@/http/goods";
import { WMGoodsDetail, WMList } from "@/http/types";

type Key = string | number;

export default defineComponent({
  name: "WeiMobCloud",
  setup(
    props: { onGetValue: (key: string, value: string[]) => void },
    { emit }
  ) {
    const state = reactive<{
      selectedRowKeys: Key[];
      loading: boolean;
      dataSource: WMList;
    }>({
      selectedRowKeys: [],
      loading: false,
      dataSource: { pageList: [], totalCount: 0, pageSize: 20, pageNum: 1 },
    });

    const query = ref({
      pageNum: 1,
      pageSize: 20,
      search: "",
    });

    onMounted(() => {
      getList();
    });
    function getList(params = query.value) {
      state.loading = true;
      goodsApi
        .getGoodsList(params)
        .then((res) => {
          state.dataSource = JSON.parse(res as any).data as WMList;
        })
        .finally(() => {
          state.loading = false;
        });
    }

    const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    const onSelectChange = (selectedRowKeys: Key[], rows: WMGoodsDetail[]) => {
      state.selectedRowKeys = selectedRowKeys;
      emit("getValue", "t2", rows);
    };

    const onExpand = async (
      expanded: boolean,
      record: Record<string, string>
    ) => {
      if (!expanded) return;
      const { goodsId } = toRaw(record);
      const res = await goodsApi.getGoodsDetailInfo(Number(goodsId));
      const { data } = JSON.parse(res as any);
      record.detailInfo = data;
    };

    return () => (
      <Card title="微盟云在售商品" class="w-1/2">
        <div>
          <div class="mb-[10px]">
            <Input
              placeholder="请输入关键词"
              onChange={(e) => (query.value.search = e.target.value ?? "")}
              onPressEnter={() => {
                query.value.pageNum = 1;
                getList();
              }}
            />
          </div>
          <Table
            loading={state.loading}
            rowKey="goodsId"
            size="small"
            dataSource={state.dataSource.pageList}
            columns={getGoodsColumns()}
            scroll={{ y: "calc(100vh - 336px)" }}
            onExpand={onExpand}
            pagination={{
              current: state.dataSource?.pageNum,
              pageSize: 20,
              showSizeChanger: false,
              total: state.dataSource?.totalCount,
              showTotal: (total) => `共${total}条`,
              onChange: (pageNum) => {
                query.value.pageNum = pageNum;
                getList();
              },
            }}
          >
            {{
              expandedRowRender: ({ record }: Record<string, any>) => {
                return (
                  <Table
                    size="small"
                    rowKey="skuId"
                    columns={getChildColumns()}
                    dataSource={record?.detailInfo?.skuList ?? []}
                    pagination={false}
                    rowSelection={{
                      selectedRowKeys: state.selectedRowKeys,
                      onChange: onSelectChange,
                    }}
                  />
                );
              },
            }}
          </Table>
        </div>
      </Card>
    );
  },
});
