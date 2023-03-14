import { defineComponent, onMounted, reactive, ref } from "vue";
import { Card, Table, Input, Button, Tooltip } from "ant-design-vue";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons-vue";
import * as goodsApi from "@/http/goods";
import { getShopColumns } from "./columns";
import { YouSTongList, YouSTongSKUList } from "@/http/types";
import getShopList from "@/mock/getShopList.json";

type Key = string | number;

export default defineComponent({
  name: "YouSTong",

  setup(props, { expose }) {
    const state = reactive<{
      selectedKeys: Key[];
      selectedRows: YouSTongSKUList[];
      dataSource: YouSTongList;
      loading: boolean;
    }>({
      selectedKeys: [],
      selectedRows: [],
      dataSource: { SKUList: [], TotalCount: 0 },
      loading: false,
    });

    const query = ref({ pageIndex: 0, keyWord: "" });

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
        .getShopList(params)
        .then((res) => {
          state.dataSource = JSON.parse(res as any).data as YouSTongList;
        })
        .finally(() => {
          state.loading = false;
        });
    }

    function handleChange(key: Key[], rows: YouSTongSKUList[]) {
      state.selectedKeys = key ?? [];
      state.selectedRows = rows ?? [];
    }

    function getSeleteValue() {
      return {
        selectedKeys: state.selectedKeys,
        selectedRows: state.selectedRows,
      };
    }

    return () => (
      <Card class="w-1/2" title="优时通在售商品">
        <div>
          <div class="mb-[10px] flex gap-[10px]">
            <Input
              placeholder="请输入关键词"
              value={query.value.keyWord ?? ""}
              onChange={(e) => (query.value.keyWord = e.target.value ?? "")}
              onPressEnter={() => {
                query.value.pageIndex = 0;
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
                  query.value.pageIndex = 0;
                  query.value.keyWord = "";
                  getList();
                }}
              />
            </Tooltip>
          </div>
          <Table
            rowKey="SKUNo"
            size="small"
            loading={state.loading}
            dataSource={state.dataSource.SKUList}
            columns={getShopColumns()}
            scroll={{ y: "calc(100vh - 336px)" }}
            rowSelection={{
              selectedRowKeys: state.selectedKeys,
              onChange: handleChange,
            }}
            pagination={{
              current: query.value.pageIndex + 1,
              pageSize: 50,
              showSizeChanger: false,
              total: state.dataSource.TotalCount,
              showTotal: (total) => `共${total}条`,
              onChange: (page) => {
                query.value.pageIndex = page - 1;
                getList();
              },
            }}
          />
        </div>
      </Card>
    );
  },
});
