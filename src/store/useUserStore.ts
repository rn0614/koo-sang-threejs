import { atom } from "recoil";


export const initialUser = {
  id: "",
  full_name: "",
  avatar_url: "",
  billing_address: "",
  payment_method: "",
};

export const userState = atom<any>({
  key: "userState",
  default: initialUser,
});
