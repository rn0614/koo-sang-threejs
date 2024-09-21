import { atom, useRecoilState } from "recoil";

export const initialUser = {
  id: "",
  full_name: "",
  avatar_url: "",
  billing_address: "",
  payment_method: "",
};

export const userState = atom({
  key: "userState",
  default: initialUser,
});
