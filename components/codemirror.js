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

export default function Editor({}) {
  const [socketId, setSocketId] = useState("");
  const [code, setCode] = useState("");
  const socket = io("http://localhost:4000/");

  useEffect(() => {
    socket.on("connection:sid", (socketId) => {
      console.log(socketId);
      setSocketId(socketId);
    });
  }, []);

  const sessid = v4();

  const start = () => {
    socket.emit(
      "session",
      JSON.stringify({
        code: 'class HelloWorld { \
          public static void main(String[] args) { \
            System.out.println("Hello, World!"); \
          } \
        }',
        language: "Java",
        sessid: sessid,
        languageExt: "java",
        mainEntry: "HelloWorld",
      })
    );

    socket.on("output", (msg) => {
      console.log(msg.toString());
    });
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
  useEffect(() => {
    let updateListenerExtension = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        console.log(update);
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
      doc: "",
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
    <div className="flex border-red-200 border-4 rounded-lg">
      <div
        className="flex-1 rounded-sm focus:outline-none outline-none	"
        ref={editor}
      ></div>
      <div className="relative flex-1 rounded-sm  bg-gradient-to-r from-indigo-300 to-purple-400">
        <div className="">
          <button
            onClick={start}
            className="absolute bottom-3 right-3 bg-indigo-400 text-yellow-50 active:bg-indigo-600 font-bold uppercase text-xs px-2 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
