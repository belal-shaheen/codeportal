import { survey, answers as AnswerAtom } from "../../atoms/survey";
import { useRecoilState } from "recoil";
import CodeEditor from "../codemirror";

export default function Code(props) {
  return (
    <div className="mt-4">
        <CodeEditor />
    </div>
  );
}
