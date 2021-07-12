import { survey, answers as AnswerAtom } from "../../atoms/survey";
import { useRecoilState } from "recoil";
import CodeEditor from "../codemirror";
import dynamic from 'next/dynamic'

const TextEditor = dynamic(async () => import('../codeEditor'), {
  loading: () => (<div>Loading</div>),
  ssr: false
})

export default function Code(props) {

  const onChange = (c) => {
    console.log(c);
  }

  return (
    <div className="mt-4">
      <TextEditor lan='java' theme="xcode" onChange={onChange} {...props}/>
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
