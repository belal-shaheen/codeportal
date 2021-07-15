import { Auth, Typography, Button } from "@supabase/ui";
const { Text } = Typography;
import { supabase } from "../api";
import Layout from "../components/Layout";
import { useEffect, useRef, useState } from "react";
import "draft-js/dist/Draft.css";
import {
  Editor,
  EditorState,
  convertFromRaw,
  DefaultDraftBlockRenderMap,
} from "draft-js";
import Immutable from "immutable";

const MyCustomBlock = (props) => {
  return (
    <div className="MyCustomBlock">
      {/* here, this.props.children contains a <section> container, as that was the matching element */}
      {props.children}
    </div>
  );
};

const blockRenderMap = Immutable.Map({
  MyCustomBlock: {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: "section",
    wrapper: <MyCustomBlock />,
  },
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

export default function SurveyCreator() {
  const editorRef = useRef(null);

  // const markdown = useRef(markdownToDraft(props.value));
  // markdown.current.blocks = markdown.current.blocks.map((b, i) => ({...b, key: `foo-${i}`}));
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(emptyContentState)
  );

  function handleChange(state) {
    setEditorState(state);
    // props.handleChange(draftToMarkdown(convertToRaw(state.getCurrentContent())));
  }

  return (
    <Layout>
      <Editor
        blockRenderMap={extendedBlockRenderMap}
        editorState={editorState}
        onChange={handleChange}
        ref={editorRef}
      />
    </Layout>
  );
}

const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: "",
      key: "foo",
      type: "unstyled",
      entityRanges: [],
    },
  ],
});
