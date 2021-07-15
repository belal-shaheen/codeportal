import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../api";
import Layout from "../components/Layout";
import prisma from "./../lib/prisma";
import { useSession, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

export default function MySurveys({ surveys }) {
  // async function deleteSurvey(id) {
  //   await supabase.from("surveys").delete().match({ id });
  //   fetchSurveys();
  // }
  const router = useRouter();

  async function deleteSurvey(id) {
    await fetch(`http://localhost:3000/api/survey/${id}`, {
      method: 'DELETE',
    });

    refreshData()
  }

  const refreshData = () => {
    router.replace(router.asPath);
  }


  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
          My Surveys
        </h1>
        {surveys.map((survey, index) => (
          <div key={index} className="border-b border-gray-300	mt-8 pb-4">
            <h2 className="text-xl font-semibold mb-2">{survey.title}</h2>
            <Link href={`/edit-survey/${survey.id}`}>
              <a className="text-sm mr-4 text-blue-500">Edit Survey</a>
            </Link>
            <Link href={`/surveys/${survey.id}`}>
              <a className="text-sm mr-4 text-blue-500">View Survey</a>
            </Link>
            <Link href={`/submissions/${survey.id}`}>
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

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { surveys: [] } };
  }

  const surveys = await prisma.survey.findMany({
    where: {
      author: { email: session.user.email },
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return { props: { surveys } };
};
