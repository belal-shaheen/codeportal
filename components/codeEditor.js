import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/theme-xcode";
import Highlight from "react-highlight";
import "highlight.js/styles/xcode.css";
import "highlight.js/lib/languages/bash";
import OutputDiv from "./output";
import { XTerm } from "xterm-for-react";
import { useRecoilState } from "recoil";
import { survey, answers as AnswerAtom } from "../atoms/survey";
import textEncoding from "text-encoding";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { v4 } from "uuid";
import { socket } from "../service/socket";

// const socket = io("https://www.branchaid.com/",{path: '/ws/'});

const TextEditor = ({
  defaultc,
  language,
  languageExt,
  mainEntry,
  active,
  name,
}) => {
  const aceRef = useRef(null);
  const [socketId, setSocketId] = useState("");
  const [code, setCode] = useState(defaultc || "");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState([]);
  const xtermRef = useRef(null);

  console.log("name", name);
  var enc = new textEncoding.TextDecoder(); // always utf-8

  const [answers, setAnswers] = useRecoilState(AnswerAtom);

  useEffect(() => {
    socket.on("connection:sid", (socketId) => {
      setSocketId(socketId);
    });
    xtermRef.current.terminal.write("In beta");
    console.log(xtermRef.current.terminal);

    socket.on("output", (msg) => {
      // console.log(msg);
      setOutput((currentOutput) => [
        ...currentOutput,
        msg,
      ]);
      setLoading(false);
      xtermRef.current.terminal.write(msg);
      console.log(msg);
      console.log(xtermRef.current.terminal);
      console.log(xtermRef);

    });

    socket.on("running", (msg) => {
      console.log();
      xtermRef.current.terminal.write("\u001Bc");
      setLoading(true);
      setOutput([])

    });

    // '\0033\0143'

    socket.on("error", (msg) => {
      console.log(msg);
      xtermRef.current.terminal.write(msg);
      // console.log(enc.decode(new Uint8Array(msg)));
      setOutput((currentOutput) => [...currentOutput, msg]);
    });
    socket.on("close", () => {
      // if (msg) {
      //   console.log("Hello");
      //   setOutput([]);
      //   let newAnswers = { ...answers };
      //   if (!Array.isArray(newAnswers[name]))
      //     newAnswers[name] = []
      //   else
      //     newAnswers[name] = [...newAnswers[name],[new Date.now()]]
      //   setAnswers(newAnswers);
      // }
      let newDate = new Date()
      let newAnswers = {...answers};
      console.log(newAnswers[name])
      if (!Array.isArray(newAnswers[name]))
        newAnswers[name] = [[newDate,output, code]]
      else
        newAnswers[name] = [...newAnswers[name], [newDate,output, code]]
      console.log("yesss")
      console.log([...newAnswers[name], [newDate,output, code]])
      console.log([[newDate,output, code]])
      setLoading(false);
    });

    return () => {
      socket.removeListener();
    };
  }, []);

  const sessid = v4();

  const start = () => {
    console.log(code);
    socket.emit(
      "session",
      JSON.stringify({
        code: code,
        language: "Java",
        sessid: sessid,
        languageExt: "java",
        mainEntry: "HelloWorld",
      })
    );
    setLoading(true);
  };

  const onChange = (c) => {
    console.log(c);
    setCode(c);
  };

  return (
    <div className="flex relative">
      <AceEditor
        mode="java"
        theme="xcode"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        onChange={onChange}
        fontSize={18}
        height="70vh"
        width="67%"
      />
      <div
        style={{ height: "70vh" }}
        className="bg-white flex-1 rounded-sm  overflow-x-auto h-full	border-l-2 border-fuchsia-600"
      >
        <button
          onClick={start}
          className="absolute z-10	 top-3 right-3 bg-indigo-400 text-yellow-50 active:bg-indigo-600 font-bold uppercase text-xs px-2 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
          {loading ? (
            <span className="flex h-6 w-6 relative">
              <span className="relative inline-flex rounded-full h-6 w-6 bg-white"></span>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            </span>
          ) : (
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
          )}
        </button>
        <div className="relative flex-1 rounded-sm  overflow-x-auto	">
          {/* <OutputDiv code={output} /> */}
          <XTerm
            cols={80}
            rows={24}
            onData={(input) => {
              console.log("w", input);
              if (input) socket.emit("input", input);
            }}
            ref={xtermRef}
          />
          <button onClick={() => console.log(output)}>Test</button>
          {/* <Highlight className="bash" > { output.join("") } </Highlight> */}
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
