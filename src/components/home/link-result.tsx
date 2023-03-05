import { Button, Card, Input, Table } from "ant-design-vue";
import { computed, defineComponent, reactive, onMounted, ref } from "vue";
import { linkResultColumns } from "./columns";
import * as goodsApi from "@/http/goods";

type Key = string | number;

export default defineComponent({
  name: "LinkResult",
  setup(props) {
    const state = reactive<{
      selectedRowKeys: Key[];
      dataSource: Record<string, any>;
      loading: boolean;
    }>({
      selectedRowKeys: [],
      dataSource: {},
      loading: false,
    });
    const query = ref({ page: 1, size: 20, keyword: "" });

    onMounted(() => {
      getList();
    });

    function getList(params = query.value) {
      state.loading = true;
      goodsApi
        .getLinkList(params)
        .then((res) => {
          state.dataSource = res.data;
        })
        .finally(() => {
          state.loading = false;
        });
    }

    function subscribeOrCancel(flag: boolean) {
      goodsApi.subscribeOrCancel(flag, state.selectedRowKeys).then((res) => {
        console.log(res);
      });
    }

    const hasSelected = computed(() => state.selectedRowKeys.length > 0);
    const onSelectChange = (selectedRowKeys: Key[]) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      state.selectedRowKeys = selectedRowKeys;
    };

    return () => (
      <>
        <Card
          title="SKU绑定列表"
          extra={
            <div>
              <Button
                type="primary"
                class="mr-[20px]"
                onClick={() => subscribeOrCancel(true)}
              >
                订阅
              </Button>
              <Button onClick={() => subscribeOrCancel(false)}>取消订阅</Button>
            </div>
          }
        >
          <div>
            <div class="mb-[10px]">
              <Input
                placeholder="请输入关键词"
                onChange={(e) => (query.value.keyword = e.target.value ?? "")}
                onPressEnter={() => {
                  query.value.page = 1;
                  getList();
                }}
              />
            </div>
            <Table
              rowKey="ystSkuNo"
              size="small"
              dataSource={state.dataSource.list}
              columns={linkResultColumns()}
              scroll={{ y: "calc(100vh - 336px)" }}
              rowSelection={{
                selectedRowKeys: state.selectedRowKeys,
                onChange: onSelectChange,
              }}
            />
          </div>
        </Card>
      </>
    );
  },
});
