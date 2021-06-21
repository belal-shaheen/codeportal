import Alert from "../alert";
import Test from "../test";
import Image from "next/image";

export const components = [
  {
    tagname: "Alert",
    component: Alert,
  },
  {
    tagname: "Test",
    component: Test,
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
