import { ref, defineComponent } from "vue";
import classes from "./index.module.less";
import { Button, Table } from "ant-design-vue";
import type { ColumnsType } from "ant-design-vue/es/table";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

export default defineComponent({
  name: "HelloWorld",
  props: { msg: { type: String, required: true } },
  setup(props) {
    const count = ref(0);
    return () => (
      <div class="p-4">
      <div class="flex justify-around ">
        <div class="w-5/12">
          <h3>优时通</h3>
          <Table columns={columns} dataSource={data} rowSelection={{}} />
        </div>
        <div class="flex items-center">
          <Button>+</Button>
        </div>
        <div class="w-5/12">
          <h3>微盟</h3>
          <Table columns={columns} dataSource={data} rowSelection={{}} />
        </div>
      </div>
      <div class="w-full h-[200px]" style={{border: "1px solid "}} >
        绑定后的数据
      </div>
      </div>
    );
  },
});
