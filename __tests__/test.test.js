import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import UserList from "@/components/UserList/UserList";
import LoginTest from "@/components/LoginTest/LoginTest";
import Test2Page from "@/app/(stackHeader)/test2/page";

// test("테스트명",()=>{실행함수}, timeout)
// test("문자 확인 테스트", () => {
//   render(<AddFloat>); // virtual dom 생성
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test("로고 이미지 테스트", () => {
//   //render(<>)
//   const logoEl = screen.getByText("logo",{selector:"textarea"});
//   const inputEl = screen.getByDisplayValue("input value");
//   const txtEl1 = screen.getByRole("button");
//   const btnEl = screen.getByRole("button");
//   const txtEl2 = screen.getByRole("heading", { level: 1, name:"라벨문구" }); // heading, button, link, textbox, checkbox, radio, combobox

//   const inputEl2 = screen.getByTestId("test-id") // jsx에 data-testid attribute필요

//   expect(logoEl).toBeInTheDocument();
//   expect(btnEl).toHaveTextContent(/버튼문구/); // 전체문구가 아닌경우는 다음과 같이 사용

//   expect(btnEl).toBeEnabled();
//   expect(txtEl1).toHaveStyle({ color: "white" });
//   expect(txtEl2).toHaveStyle({ color: "white" });
// });

describe("UserList test", () => {
  const users = ["Tom", "Jane", "Mike"];

  test("지연이 있는 rendering", async () => {
    render(<UserList users={users} />);
    const titleEl = await screen.findByRole("heading", {
      name: "사용자 목록",
    });
    expect(titleEl).toBeInTheDocument();
  });

  test("ul이 있다.", () => {
    render(<UserList users={users} />);
    const ulEl = screen.getByRole("list");
    expect(ulEl).toBeInTheDocument();
  });

  test("li가 있다.", () => {
    render(<UserList users={users} />);
    const liEl = screen.getAllByRole("listitem");
    expect(liEl).toHaveLength(users.length);
  });

  test("빈배열", () => {
    render(<UserList users={[]} />);
    const liEl = screen.queryAllByRole("listitem");
    expect(liEl).toHaveLength(0);
  });
});

const user = userEvent.setup();
describe("user test", () => {
  test("login버튼유무", () => {
    render(<LoginTest />);
    const btnEl = screen.getByRole("button");
    expect(btnEl).toHaveTextContent("Login");
  });

  test("login -> logout -> login", async () => {
    render(<LoginTest />);
    const btnEl = screen.getByRole("button");
    await user.click(btnEl);
    expect(btnEl).toHaveTextContent("Logout");
    await user.click(btnEl);
    expect(btnEl).toHaveTextContent("Login");
  });

  test("tab, space enter 동작", async () => {
    render(<LoginTest />);
    const btnEl = screen.getByRole("button");
    await user.tab();
    await user.keyboard(" ");
    expect(btnEl).toHaveTextContent("Logout");
    await user.keyboard("{Enter}");
    expect(btnEl).toHaveTextContent("Login");
  });
});

describe("msw test",()=>{
  test("제목확인",()=>{
    render(<Test2Page/>)
    const titleEl = screen.getByText("msw test");
    expect(titleEl).toBeInTheDocument();
  });

  test("fetch test",async ()=>{
    render(<Test2Page/>);
    const obj = await screen.findByText("c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",{});
    expect(obj).toBeInTheDocument();
  })
})