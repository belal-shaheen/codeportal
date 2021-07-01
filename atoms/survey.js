import { atom } from "recoil";

export const survey = atom({
  key: "survey",
  default: ["", ""],
});

export const answers = atom({
  key: "answers",
  default: {hello:[]},
});

export const page = atom({
  key: "page",
  default: [0, 0],
});

/*
    

*/
