import Alert from "../alert";
import Test from "../test";
import Input from "./Input";
import Image from "next/image";
import Page from "./Page";
import Code from "./Code";
import { SurveyLayout } from "./SurveyLayout";

export const components = [
  {
    tagname: "wrapper",
    component: SurveyLayout,
  },
  {
    tagname: "Input",
    component: Input,
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
