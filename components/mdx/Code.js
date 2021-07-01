import { survey, answers as AnswerAtom } from "../../atoms/survey";
import { useRecoilState } from "recoil";
import CodeEditor from "../codemirror";

export default function Code(props) {
  return (
    <div className="mt-4">
        <CodeEditor {...props}/>
    </div>
  );
}
// <Page>
//   <h1>These are coding questions</h1>
//   <Input name="first-name" placeholder="Name" label="First Name" />
//    <Code name="hello" defaultc="" language="Java" languageExt="java" mainEntry="HelloWorld"></Code>
//   </Page>
  
//   <Page>
//     <Input name="last-name" placeholder="Name" label="Last Name" />
//   </Page>
  
//   <Page>
//     <Input name="age" placeholder="Age" label="Age" />
//   </Page>
