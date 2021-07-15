import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "easymde/dist/easymde.min.css";
import { supabase } from "../../api";
import Layout from "../../components/Layout";
import { useSession, getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import FilterResults from "react-filter-search";
import prisma from "./../../lib/prisma";

const ReactJson = dynamic(async () => import("react-json-view"), {
  loading: () => <div>Loading</div>,
  ssr: false,
});

function Submissions({ submissions, title }) {
  // const [submissions, setSubmissions] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  // async function fetchSubmissions() {
  //   if (!id) return;
  //   const { data } = await supabase
  //     .from("submissions")
  //     .select()
  //     .filter("survey_id", "eq", id);
  //   setSubmissions(data);
  // }

  useEffect(() => {
    console.log(title);
  }, []);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function deleteSubmission(id) {
    await fetch(`http://localhost:3000/api/submission/${id}`, {
      method: "DELETE",
    });
    refreshData();
    // await supabase.from("submissions").delete().match({ id });
    // fetchSubmissions();
  }

  return (
    <Layout>
      <h1 className="text-3xl font-semibold tracking-wide mt-4">
        Submissions for {title.title}
      </h1>
      {submissions.length
        ? submissions.map((submission, index) => (
            <div key={index} className="border-b border-gray-300	mt-8 pb-4">
              <p className="text-gray-500 mt-2 mb-2">
                Submission ID: {submission.id}
              </p>
              <ReactJson name={false} src={JSON.parse(submission["answers"])} />

              <button
                className="text-sm mr-4 text-red-500 mt-2"
                onClick={() => deleteSubmission(submission.id)}
              >
                Delete Submission
              </button>
            </div>
          ))
        : <p className="text-gray-500 mt-6 mb-2">No Submissions</p>}
    </Layout>
  );
}

export default Submissions;

export const getServerSideProps = async ({ req, res, params }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { submissions: [] } };
  }

  const title = await prisma.survey.findFirst({
    where: {
      id: parseInt(params.id),
      author: { email: session.user.email },
    },
    select: {
      title: true,
    },
  });

  if (!title) {
    res.statusCode = 403;
    return { props: { submissions: [], title: { title: "not found" } } };
  }

  //params?.id
  const submissions = await prisma.submission.findMany({
    where: {
      surveyId: parseInt(params.id),
    },
  });
  console.log(submissions);

  return { props: { submissions, title } };
};
