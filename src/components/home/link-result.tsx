import { defineComponent, reactive, onMounted, ref } from "vue";
import { Button, Card, Input, Table, Tooltip, message } from "ant-design-vue";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons-vue";
import { linkResultColumns } from "./columns";
import * as goodsApi from "@/http/goods";

type Key = string | number;

export default defineComponent({
  name: "LinkResult",
  setup(props, { expose }) {
    const state = reactive<{
      selectedRowKeys: Key[];
      dataSource: Record<string, any>;
      loading: boolean;
    }>({
      selectedRowKeys: [],
      dataSource: {},
      loading: false,
    });
    const query = ref({ page: 1, size: 20, dataSource: "TM", keyword: "" });

    onMounted(() => {
      getList();
    });

    expose({ getList });

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
      goodsApi
        .subscribeOrCancel(flag, state.selectedRowKeys.toString().split(","))
        .then((res) => {
          try {
            const { data } = JSON.parse(res as unknown as string);

            if (data.Success) {
              message.success(`${flag ? "订阅" : "取消订阅"}成功`);
              state.selectedRowKeys = [];
              getList();
            } else {
              message.warn(data.Message);
            }
          } catch (error) {
            console.log(error);
          }
        });
    }

    const handleDelete = (id: string) => {
      goodsApi.deleteLinkId(id).then((res) => {
        if (res.status === 200) {
          message.success("删除成功");
          query.value.page = 1;
          query.value.keyword = "";
          getList();
        } else {
          message.warn((res as unknown as Record<string, string>).message);
        }
      });
    };

    const onSelectChange = (selectedRowKeys: Key[]) => {
      state.selectedRowKeys = selectedRowKeys;
    };

    return () => (
      <>
        <Card title="SKU绑定列表">
          <div>
            <div class="mb-[10px] flex gap-[10px]">
              <Input
                placeholder="请输入关键词"
                value={query.value.keyword ?? ""}
                onChange={(e) => (query.value.keyword = e.target.value?.trim() ?? "")}
                onPressEnter={() => {
                  query.value.page = 1;
                  getList();
                }}
              />
              <Tooltip title="查询">
                <Button icon={<SearchOutlined />} onClick={() => getList()} />
              </Tooltip>
              <Tooltip title="查询">
                <Button
                  icon={<ReloadOutlined />}
                  onClick={() => {
                    query.value.page = 1;
                    query.value.keyword = "";
                    getList();
                  }}
                />
              </Tooltip>
            </div>
            <Table
              rowKey="ystSkuNo"
              size="small"
              dataSource={state?.dataSource?.list ?? []}
              columns={linkResultColumns({ handleDelete })}
              scroll={{ y: "calc(100vh - 336px)" }}
              rowSelection={{
                selectedRowKeys: state.selectedRowKeys ?? [],
                onChange: onSelectChange,
              }}
            />
          </div>
        </Card>
      </>
    );
  },
});
