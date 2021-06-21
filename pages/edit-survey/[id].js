import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { supabase } from "../../api";
import Layout from "../../components/Layout";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

function EditSurvey() {
  const [survey, setSurvey] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetchSurvey();
    async function fetchSurvey() {
      if (!id) return;
      const { data } = await supabase
        .from("surveys")
        .select()
        .filter("id", "eq", id)
        .single();
      setSurvey(data);
    }
  }, [id]);
  if (!survey) return null;
  function onChange(e) {
    setSurvey(() => ({ ...survey, [e.target.name]: e.target.value }));
  }
  const { title, content } = survey;
  async function updateCurrentSurvey() {
    if (!title || !content) return;
    const user = supabase.auth.user();
    await supabase.from("surveys").update([{ title, content }]);
    router.push("/my-surveys");
  }
  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
          Edit survey
        </h1>
        <input
          onChange={onChange}
          name="title"
          placeholder="Title"
          value={survey.title}
          className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
        />
        <SimpleMDE
          value={survey.content}
          onChange={(value) => setSurvey({ ...survey, content: value })}
        />
        <button
          className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
          onClick={updateCurrentSurvey}
        >
          Update Survey
        </button>
      </div>
    </Layout>
  );
}

export default EditSurvey;
