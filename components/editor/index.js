import InputField from "./Input";
import Page from "./Page";

export const components = [
  {
    tagname: "Input",
    component: InputField,
  },
  {
    tagname: "Page",
    component: Page,
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
