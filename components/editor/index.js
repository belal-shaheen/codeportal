import InputField from "./Input";
import Page from "./Page";
import Code from "../codemirror"

export const components = [
  {
    tagname: "Input",
    component: InputField,
  },
  {
    tagname: "Page",
    component: Page,
  },
  {
    tagname: "Code",
    component: Code,
  },
];

export const scope = () =>
  components.reduce(
    (scope, { tagname, component }) => ({
      ...scope,
      [tagname]: component,
    }),
    {}
  );
