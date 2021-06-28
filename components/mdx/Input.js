import { survey, answers as AnswerAtom } from "../../atoms/survey";
import { useRecoilState } from "recoil";

export default function InputField({ name, label, placeholder = "" }) {
  const [surveys, setSurvey] = useRecoilState(survey);
  const [answers, setAnswers] = useRecoilState(AnswerAtom);

  const onChange = (e) => {
    let newAnswers = { ...answers };
    newAnswers[name] = e.target.value;
    setAnswers(newAnswers);
  };

  return (
    <div className="flex mt-4 prose">
      <div className="md:w-full">
        <label className="font-bold mx-1">{label}</label>
        <input
          className="bg-white-200 appearance-none border-4 mt-1 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-200"
          type="text"
          placeholder={placeholder}
          value={answers[name]}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
