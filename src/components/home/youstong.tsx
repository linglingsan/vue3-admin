import { defineComponent, onMounted, reactive, ref } from "vue";
import { Card, Table, Input } from "ant-design-vue";
import * as goodsApi from "@/http/goods";
import { getShopColumns } from "./columns";
import { YouSTongList, YouSTongSKUList } from "@/http/types";

type Key = string | number;

export default defineComponent({
  name: "YouSTong",

  setup(props: {
    selectKey: Key[];
    onYSTSelectChange: (key: Key[], rows: YouSTongSKUList[]) => void;
  }) {
    const state = reactive<{
      selectedRowKeys: Key[];
      dataSource: YouSTongList;
      loading: boolean;
    }>({
      selectedRowKeys: [],
      dataSource: { SKUList: [], TotalCount: 0 },
      loading: false,
    });

    const query = ref({ pageIndex: 0, keyWord: "" });

    onMounted(() => {
      getList();
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

    return () => (
      <Card class="w-1/2" title="优时通在售商品">
        <div>
          <div class="mb-[10px]">
            <Input
              placeholder="请输入关键词"
              onChange={(e) => (query.value.keyWord = e.target.value ?? "")}
              onPressEnter={() => {
                query.value.pageIndex = 0;
                getList();
              }}
            />
          </div>
          <Table
            rowKey="SKUNo"
            size="small"
            loading={state.loading}
            dataSource={state.dataSource.SKUList}
            columns={getShopColumns()}
            scroll={{ y: "calc(100vh - 336px)" }}
            rowSelection={{
              selectedRowKeys: props.selectKey,
              onChange: props.onYSTSelectChange,
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
