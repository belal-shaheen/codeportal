import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../api";
import Layout from "../components/Layout";

export default function MySurveys() {
  const [surveys, setSurveys] = useState([]);
  useEffect(() => {
    fetchSurveys();
  }, []);

  async function fetchSurveys() {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("surveys")
      .select("*")
      .filter("user_id", "eq", user.id);
    setSurveys(data);
  }
  async function deleteSurvey(id) {
    await supabase.from("surveys").delete().match({ id });
    fetchSurveys();
  }
  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
          My Surveys
        </h1>
        {surveys.map((survey, index) => (
          <div key={index} className="border-b border-gray-300	mt-8 pb-4">
            <h2 className="text-xl font-semibold">{survey.title}</h2>
            <p className="text-gray-500 mt-2 mb-2">
              Author: {survey.user_email}
            </p>
            <Link href={`/edit-survey/${survey.id}`}>
              <a className="text-sm mr-4 text-blue-500">Edit Survey</a>
            </Link>
            <Link href={`/surveys/${survey.id}`}>
              <a className="text-sm mr-4 text-blue-500">View Survey</a>
            </Link>
            <Link href={`/surveys/${survey.id}`}>
              <a className="text-sm mr-4 text-blue-500">View Submissions</a>
            </Link>
            <button
              className="text-sm mr-4 text-red-500"
              onClick={() => deleteSurvey(survey.id)}
            >
              Delete Survey
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
