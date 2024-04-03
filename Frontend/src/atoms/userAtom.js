import { atom } from "recoil";

const userAtom = atom({
    key:"userAtom",
    default: JSON.parse(localStorage.getItem("userinfo"))
})

export default userAtom