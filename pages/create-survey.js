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
import { components } from "../components/editor";
import Alert from "../components/alert";
import Image from "next/image";
import Layout from "../components/Layout";
import { getSession } from "next-auth/client";

const initialState = { title: "", content: "" };

function CreateSurvey() {
  const [survey, setSurvey] = useState(initialState);
  const [error, setError] = useState(null);
  const { title, content } = survey;
  const router = useRouter();
  function onChange(e) {
    setSurvey(() => ({ ...survey, [e.target.name]: e.target.value }));
  }

  async function createNewSurvey() {
    if (!title) setError("Please add a title!");
    if (!content) setError("Please add content!");
    if (!title || !content) return;
    try {
      const body = { title, content };
      await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await router.push("/my-surveys");
    } catch (error) {
      console.error(error);
    }

    // const user = supabase.auth.user();
    // // const id = uuid();
    // // survey.id = id;
    // const session = await get

    // const { data } = await supabase
    //   .from("surveys")
    //   .insert([{ title, content, user_id: user.id, user_email: user.email }])
    //   .single();
    // router.push(`/surveys/${data.id}`);
  }

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-semibold tracking-wide mt-4">
          Create new survey
        </h1>

        {/* <input
          onChange={onChange}
          name="title"
          placeholder="Title"
          value={survey.title}
          className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
        /> */}
        <input
          className="pb-2 text-lg my-4 mt-5 bg-white-200 appearance-none border-4 border-2 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-200"
          value={survey.title}
          name="title"
          placeholder="Title"
          onChange={onChange}
        />
        <Editor
          setSurvey={setSurvey}
          survey={survey}
          components={components}
        ></Editor>

        <button
          type="button"
          className="mb-4 bg-red-200  font-extrabold  px-8 py-2 rounded-lg"
          onClick={createNewSurvey}
        >
          Create Survey
        </button>
        {error ? (
          <div className="py-1 px-1 text-red-700">
            <p>{error}</p>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}

export default CreateSurvey;
