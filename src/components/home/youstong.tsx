import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRaw,
} from "vue";
import { Card, Table, Image, Input } from "ant-design-vue";
import * as goodsApi from "@/http/goods";
import { getShopColumns } from "./columns";

type Key = string | number;

export default defineComponent({
  name: "YouSTong",
  setup(
    props: { onGetValue: (key: string, value: string[]) => void },
    { emit }
  ) {
    const state = reactive<{
      selectedRowKeys: Key[];
      dataSource: Record<string, any>;
      loading: boolean;
    }>({
      selectedRowKeys: [],
      dataSource: {},
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
          const { data } = JSON.parse(res as any);
          state.dataSource = data;
        })
        .finally(() => {
          state.loading = false;
        });
    }

    const hasSelected = computed(() => state.selectedRowKeys.length > 0);
    const onSelectChange = (selectedRowKeys: Key[], rows: any[]) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      state.selectedRowKeys = selectedRowKeys;
      // getValue("t1", selectedRowKeys as string[])
      emit("getValue", "t1", rows);
    };

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
              selectedRowKeys: state.selectedRowKeys,
              onChange: onSelectChange,
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
