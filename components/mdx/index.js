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
  {
    tagname: "h1",
    component: (props) => {
      return (
        <div className="prose">
          {" "}
          <h1>{props.children}</h1>
        </div>
      );
    },
  },
  {
    tagname: "h2",
    component: (props) => {
      return (
        <div className="prose">
          {" "}
          <h2>{props.children}</h2>
        </div>
      );
    },
  },
  {
    tagname: "h3",
    component: (props) => {
      return (
        <div className="prose">
          {" "}
          <h3>{props.children}</h3>
        </div>
      );
    },
  },
  {
    tagname: "h4",
    component: (props) => {
      return (
        <div className="prose">
          {" "}
          <h4>{props.children}</h4>
        </div>
      );
    },
  },
  {
    tagname: "h5",
    component: (props) => {
      return (
        <div className="prose">
          {" "}
          <h5>{props.children}</h5>
        </div>
      );
    },
  },
  {
    tagname: "h6",
    component: (props) => {
      return (
        <div className="prose">
          {" "}
          <h6>{props.children}</h6>
        </div>
      );
    },
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
