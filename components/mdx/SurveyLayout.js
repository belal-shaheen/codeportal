import React, { useEffect } from "react";
import { page as pageAtom } from "../../atoms/survey";
import { RecoilRoot, useRecoilValue, useRecoilState } from "recoil";

export function SurveyLayout({ children }) {
  const [page, setPage] = useRecoilState(pageAtom);

  useEffect(() => {
    const newPage = [...page];
    newPage[1] = React.Children.count(children);
    setPage(newPage);
  }, []);

  return (
    <div>
      {React.Children.map(children, (child, i) => {
        if (React.isValidElement(child)) {
          let props = {};
          if (child.props.mdxType == "Page") {
            props["number"] = i;
          }
          return React.cloneElement(child, { ...props });
        }
        return child;
      })}
    </div>
  );
}
