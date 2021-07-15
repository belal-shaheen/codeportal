import React, { useState, useRef, useEffect } from "react";
import { basicSetup } from "@codemirror/basic-setup";
import { EditorState, StateField, StateEffect } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { autocompletion } from "@codemirror/autocomplete";
import { Panel, showPanel } from "@codemirror/panel";
import { PlayIcon } from "@heroicons/react/solid";
import io from "socket.io-client";
import { v4 } from "uuid";
import textEncoding from "text-encoding"
import { survey, answers as AnswerAtom } from "../atoms/survey";
import { useRecoilState } from "recoil";

export default function Editor({defaultc, language, languageExt, mainEntry, active, name}) {
  const [socketId, setSocketId] = useState("");
  const [code, setCode] = useState(defaultc || "");
  const [output, setOutput] = useState([]);

  function onChange(newValue) {
    console.log("change", newValue);
  }

  const socket = io("http://localhost:4000/");
  var enc = new textEncoding.TextDecoder(); // always utf-8

  const [answers, setAnswers] = useRecoilState(AnswerAtom);

  // const onChange = (e) => {
  //   let newAnswers = { ...answers };
  //   newAnswers[name] = e.target.value;
  //   setAnswers(newAnswers);
  // };

  socket.on("running", (msg) => {
    if (msg) {
      console.log("Hello")
      setOutput([])
    }
  })

  socket.on("output", (msg) => {
    console.log(enc.decode(new Uint8Array(msg)))
    setOutput((currentOutput)=>[...currentOutput, enc.decode(new Uint8Array(msg))]);
  });

  socket.on("error", (msg) => {
    console.log(enc.decode(new Uint8Array(msg)))
    setOutput((currentOutput)=>[...currentOutput, enc.decode(new Uint8Array(msg))]);
  });


  useEffect(() => {

    socket.on("connection:sid", (socketId) => {
      console.log(socketId);
      setSocketId(socketId);
    });



    return () => {
      socket.removeListener()
    }
  }, []);

  const sessid = v4();

  const start = () => {
    console.log(code)
    socket.emit(
      "session",
      JSON.stringify({
        code: code.join("\n"),
        language: language,
        sessid: sessid,
        languageExt: languageExt,
        mainEntry: mainEntry,
      })
    );


  };

  const editor = useRef();

  const toggleHelp = StateEffect.define();

  const helpPanelState = StateField.define({
    create: () => true,
    update(value, tr) {
      for (let e of tr.effects) if (e.is(toggleHelp)) value = e.value;
      return value;
    },
    provide: (f) => showPanel.from(f, (on) => (on ? createHelpPanel : null)),
  });

  function helloWorld() {}

  function createHelpPanel(view) {
    let dom = React.createElement("div");
    dom.innerHTML = `<p> hello </p>`;
    dom.className = "cm-help-panel";
    return { top: true, dom };
  }

  const helpKeymap = [
    {
      key: "F1",
      run(view) {
        view.dispatch({
          effects: toggleHelp.of(!view.state.field(helpPanelState)),
        });
        return true;
      },
    },
  ];

  const helpTheme = EditorView.baseTheme({
    ".cm-help-panel": {
      padding: "5px 10px",
      backgroundColor: "#fffa8f",
      fontFamily: "monospace",
      outline: "2px solid transparent",
    },
  });

  function helpPanel() {
    return [helpPanelState, keymap.of(helpKeymap), helpTheme];
  }

  //   const [editorState, setEditorState] = useState({
  //     state: EditorState.create({
  //       doc: "",
  //     }),
  //     parent: editorInstance.current,
  //   });

  // ["h", "he", "hel", "hello", ""]
  //
  //

  //

  useEffect(() => {
    let updateListenerExtension = EditorView.updateListener.of((update) => {
      console.log(update)

      if (update.docChanged) {
        const code = update.view.viewState.state.doc.text;
        setCode(code)
      }
    });

    let myTheme = EditorView.theme(
      {
        ".cm-scroller": {
          overflow: "auto",
          "min-height": "450px",
        },
      },
      { dark: false }
    );
    const state = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        updateListenerExtension,
        java(),
        autocompletion({ activateOnTyping: true }),
        [myTheme],
        helpPanel(),
      ],
    });

    const view = new EditorView({ state, parent: editor.current });

    return () => {
      view.destroy();
    };
  }, []);
  //absolute inset-x-0 inset-y-0 bg-white

  return (
    <div className=" border-red-200 border-4 rounded-lg">
      {/* <div
        className="flex-1 rounded-sm focus:outline-none outline-none	"
        ref={editor}
      ></div> */}
      <div className="p-4 relative flex-1 rounded-sm  bg-gradient-to-r from-indigo-300 to-purple-400 overflow-x-auto h-full			">
        <p>Output: {output.join("")}</p>
        <div className="" style={{height:"450px"}}>
          <button
            onClick={start}
            className="absolute bottom-3 right-3 bg-indigo-400 active:bg-indigo-600 font-bold uppercase text-xs px-2 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
