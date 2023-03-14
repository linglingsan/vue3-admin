import { defineComponent, onMounted, reactive, ref, toRaw } from "vue";
import { Button, Card, Input, Table, Tooltip } from "ant-design-vue";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons-vue";
import { getChildColumns, getGoodsColumns } from "./columns";
import * as goodsApi from "@/http/goods";
import { WMGoodsDetail, WMList, WMPageList } from "@/http/types";
import getGoodsList from "@/mock/getGoodsList.json";

type Key = string | number;

export default defineComponent({
  name: "WeiMobCloud",
  setup(props, { expose }) {
    const state = reactive<{
      selectedKeys: Key[];
      selectedRows: WMGoodsDetail[];
      loading: boolean;
      dataSource: WMList;
    }>({
      selectedKeys: [],
      selectedRows: [],
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

    expose({
      handleChange,
      getSeleteValue,
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

    function handleChange(goodsId: string, keys: Key[]) {
      if (!goodsId && !keys) {
        state.selectedKeys = [];
        state.selectedRows = [];
        return;
      }
      const row = JSON.parse(JSON.stringify(state.dataSource.pageList)).find(
        (l: WMPageList) => l.goodsId === Number(goodsId)
      );

      state.selectedKeys = keys ?? [];
      state.selectedRows = [{ ...row.detailInfo, selectedKey: keys[0] }] ?? [];
    }

    function getSeleteValue() {
      return {
        selectedKeys: state.selectedKeys,
        selectedRows: state.selectedRows,
      };
    }

    return () => (
      <Card title="微盟云在售商品" class="w-1/2">
        <div>
          <div class="mb-[10px] flex gap-[10px]">
            <Input
              placeholder="请输入关键词"
              value={query.value.search ?? ""}
              onChange={(e) => (query.value.search = e.target.value ?? "")}
              onPressEnter={() => {
                query.value.pageNum = 1;
                getList();
              }}
            />
            <Tooltip title="查询">
              <Button icon={<SearchOutlined />} onClick={() => getList()} />
            </Tooltip>
            <Tooltip title="刷新">
              <Button
                icon={<ReloadOutlined />}
                onClick={() => {
                  query.value.pageNum = 1;
                  query.value.search = "";
                  getList();
                }}
              />
            </Tooltip>
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
                      selectedRowKeys: state.selectedKeys,
                      onChange: (selectedRowKeys: Key[]) =>
                        handleChange(record.goodsId, selectedRowKeys),
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
