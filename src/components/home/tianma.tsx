import { defineComponent, onMounted, reactive, ref } from "vue";
import { Card, Table, Input, Button, Tooltip } from "ant-design-vue";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons-vue";
import * as goodsApi from "@/http/goods";
import { getShopColumns } from "./columns";
import { TMList, YouSTongSKUList } from "@/http/types";

type Key = string | number;

export default defineComponent({
  name: "TianMa",

  setup(props, { expose }) {
    const state = reactive<{
      selectedKeys: Key[];
      selectedRows: YouSTongSKUList[];
      dataSource: TMList;
      loading: boolean;
    }>({
      selectedKeys: [],
      selectedRows: [],
      dataSource: { rows: [], total: "" },
      loading: false,
    });

    const query = ref({ page: 1, rows: 20, articleno: "", brandname: "" });

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
          state.dataSource = JSON.parse(res as any) as TMList;
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
      <Card class="w-1/2" title="天马在售商品">
        <div>
          <div class="mb-[10px] flex gap-[10px]">
            <Input
              placeholder="请输入商品货号"
              value={query.value.articleno ?? ""}
              onChange={(e) =>
                (query.value.articleno = e.target.value?.trim() ?? "")
              }
              onPressEnter={() => {
                query.value.page = 1;
                getList();
              }}
            />
            <Input
              placeholder="请输入品牌名称"
              value={query.value.brandname ?? ""}
              onChange={(e) =>
                (query.value.brandname = e.target.value?.trim() ?? "")
              }
              onPressEnter={() => {
                query.value.page = 1;
                getList();
              }}
            />

            <div class="flex">
              <Tooltip title="查询">
                <Button
                  class="mr-[10px]"
                  icon={<SearchOutlined />}
                  onClick={() => getList()}
                />
              </Tooltip>
              <Tooltip title="刷新">
                <Button
                  icon={<ReloadOutlined />}
                  onClick={() => {
                    query.value.page = 1;
                    query.value.articleno = "";
                    query.value.brandname = "";
                    getList();
                  }}
                />
              </Tooltip>
            </div>
          </div>
          <Table
            rowKey="articleno"
            size="small"
            loading={state.loading}
            dataSource={state.dataSource.rows}
            columns={getShopColumns()}
            scroll={{ y: "calc(100vh - 336px)" }}
            rowSelection={{
              selectedRowKeys: state.selectedKeys,
              onChange: handleChange,
            }}
            pagination={{
              current: query.value.page,
              pageSize: 50,
              showSizeChanger: false,
              total: +state.dataSource.total,
              showTotal: (total) => `共${total}条`,
              onChange: (page) => {
                query.value.page = page;
                getList();
              },
            }}
          />
        </div>
      </Card>
    );
  },
});
