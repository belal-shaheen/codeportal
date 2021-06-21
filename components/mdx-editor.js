import { renderToString } from "react-dom/server";
import MDX from "@mdx-js/runtime";
import { renderToStaticMarkup } from "react-dom/server";
import Toolbar from "./Toolbar";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

let SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export default function Editor({
  components = [],
  replacements = {},
  survey,
  setSurvey,
  toolbar = null,
  easymdeConfig = {},
}) {
  const scope = components.reduce(
    (scope, { tagname, component }) => ({
      ...scope,
      [tagname]: component,
    }),
    {}
  );

  const [simpleMdeInstance, setMdeInstance] = useState(null);

  const getMdeInstanceCallback = useCallback((simpleMde) => {
    setMdeInstance(simpleMde);
  }, []);

  const [value, setValue] = useState("Initial value");

  useEffect(() => {
    simpleMdeInstance && simpleMdeInstance.toggleSideBySide();
  }, [simpleMdeInstance]);

  const config = {
    ...{
      autoDownloadFontAwesome: false,
      forceSync: true,
      autofocus: true,
      indentWithTabs: false,
      spellChecker: false,
      sideBySideFullscreen: false,
      minHeight: "500px",
    },
    ...easymdeConfig,
  };

  const customRendererOptions = useMemo(() => {
    return {
      ...config,
      autoDownloadFontAwesome: true,
      previewRender(text) {
        try {
          return renderToString(
            <div className="prose mt-8 py-8 px-16">
              <MDX components={scope}>{text}</MDX>
            </div>
          );
        } catch (err) {
          return renderToStaticMarkup(<div></div>);
        }
      },
      toolbar: Toolbar({ components, toolbar }),
    };
  }, []);

  const onChange = (value) => {
    setValue(value);
    console.log(survey);
    console.log(setSurvey);
    if (survey && setSurvey) {
      setSurvey({ ...survey, content: value });
    }
    console.log(value);
  };

  return (
    <SimpleMDE
      getMdeInstance={getMdeInstanceCallback}
      options={customRendererOptions}
      onChange={onChange}
    />
  );
}
