import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { supabase } from "../api";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
// import Editor, { Plugins } from "react-markdown-editor-lite";
import Editor from "../components/mdx-editor";
import { components } from "../components/mdx";
import Alert from "../components/alert";
import Image from "next/image";
import Layout from "../components/Layout";

const initialState = { title: "", content: "" };

function CreateSurvey() {
  const [survey, setSurvey] = useState(initialState);
  const [error, setError] = useState("");
  const { title, content } = survey;
  const router = useRouter();
  function onChange(e) {
    setSurvey(() => ({ ...survey, [e.target.name]: e.target.value }));
  }

  async function createNewSurvey() {
    console.log(survey);
    if (!title) setError("Please add a title!");
    if (!content) setError("Please add content!");
    if (!title || !content) return;
    const user = supabase.auth.user();
    const id = uuid();
    survey.id = id;
    const { data } = await supabase
      .from("surveys")
      .insert([{ title, content, user_id: user.id, user_email: user.email }])
      .single();
    router.push(`/surveys/${data.id}`);
  }

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-semibold tracking-wide mt-6">
          Create new survey
        </h1>
        <input
          onChange={onChange}
          name="title"
          placeholder="Title"
          value={survey.title}
          className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
        />
        <Editor
          setSurvey={setSurvey}
          survey={survey}
          components={components}
        ></Editor>

        <button
          type="button"
          className="mb-4 bg-indigo-200 font-extrabold mt-4 px-8 py-2 rounded-lg"
          onClick={createNewSurvey}
        >
          Create Survey
        </button>
        <div className="py-1 px-1 text-red-700">
          <p>{error}</p>
        </div>
      </div>
    </Layout>
  );
}

export default CreateSurvey;
