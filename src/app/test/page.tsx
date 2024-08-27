'use client'
import DynamicSelects from "@/components/GroupSelect/GroupSelect";
//export const fetchCache = "default-cache"; // 개발환경에서도 default cache 작업
import CustomTable from "@/components/Table/Table";
import { convertJson2Tree } from "@/util/data-structure";
import { stackRouterPush } from "@/util/stackRouter";
import Link from "next/link";
import { useRouter } from "next/navigation";

const data = [
  {
    column1: "A",
    column2: "1",
    column3: "a",
    column4: "as",
  },
  {
    column1: "A",
    column2: "2",
    column3: "a",
    column4: "a1",
  },
  {
    column1: "A",
    column2: "2",
    column3: "b",
    column4: "a3",
  },
  {
    column1: "B",
    column2: "3",
    column3: "a",
    column4: "a1",
  },
  {
    column1: "B",
    column2: "3",
    column3: "b",
    column4: "a23",
  },
  {
    column1: "B",
    column2: "4",
    column3: "a",
    column4: "as23",
  },
  {
    column1: "B",
    column2: "5",
    column3: "a",
    column4: "a111",
  },
];

export default function TestPage() {
  const router = useRouter();
  const returnData = new Response(JSON.stringify(data));
  //const products = await returnData.json();
  const products=data;
  const tree = convertJson2Tree(data, [
    "column1",
    "column2",
    "column3",
    "column4",
  ]);
  console.log(JSON.stringify(tree, null, 2));
  return (
    <div>
      <CustomTable itemList={products} />
      <DynamicSelects
        tree={tree}
        columns={["column1", "column2", "column3", "column4"]}
      />

      <div style={{display:"flex", flexDirection:"column"}}>
        <h1>Link Page</h1>
        <button onClick={()=>stackRouterPush(router,"/test/1")}>1번으로 이동</button>
        <Link href={"/test/2"}>2번으로 이동</Link>
        <Link href={"/test/3"}>3번으로 이동</Link>
      </div>
    </div>
  );
}
