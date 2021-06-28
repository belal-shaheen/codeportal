import MDX from "@mdx-js/runtime";
import { page } from "./../../atoms/survey";
import { useRecoilValue } from "recoil";

export default function Page({ children, number }) {
  const pageNumber = useRecoilValue(page);

  if (pageNumber[0] != number) {
    return null;
  }

  return <div>{children}</div>;
}
