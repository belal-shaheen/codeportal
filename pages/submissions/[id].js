import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "easymde/dist/easymde.min.css";
import { supabase } from "../../api";
import Layout from "../../components/Layout";

function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  async function fetchSubmissions() {
    if (!id) return;
    const { data } = await supabase
      .from("submissions")
      .select()
      .filter("survey_id", "eq", id);
    setSubmissions(data);
  }

  useEffect(() => {
    fetchSubmissions();
  }, [id]);

  async function deleteSubmission(id) {
    await supabase.from("submissions").delete().match({ id });
    fetchSubmissions();
  }

  return (
    <Layout>
      {submissions.length
        ? submissions.map((submission, index) => (
            <div key={index} className="border-b border-gray-300	mt-8 pb-4">
              <p className="text-gray-500 mt-2 mb-2">
                {JSON.stringify(submission)}
              </p>
              <button
                className="text-sm mr-4 text-red-500"
                onClick={() => deleteSubmission(submission.id)}
              >
                Delete Submission
              </button>
            </div>
          ))
        : "No Submissions"}
    </Layout>
  );
}

export default Submissions;
