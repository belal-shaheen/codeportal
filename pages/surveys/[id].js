import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../api";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Test from "../../components/test";
import { scope } from "../../components/mdx";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  survey as SurveyAtom,
  answers as AnswersAtom,
  page as pageAtom,
} from "../../atoms/survey";
import { useEffect } from "react";
import React from "react";
import dynamic from "next/dynamic";
import prisma from "../../lib/prisma";

const AceEditor = dynamic(() => import("react-ace"), {
  ssr: false,
});

export default function Survey({ survey, source, id }) {
  const router = useRouter();
  const [pageState, setPageState] = useRecoilState(pageAtom);
  const answerState = useRecoilValue(AnswersAtom);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const increaseCounter = () => {
    const newPage = [...pageState];
    newPage[0] = newPage[0] + 1;
    setPageState(newPage);
  };

  async function submitAnswers() {
    try {
      console.log(answerState);
      const body = { surveyId: id, answers: JSON.stringify(answerState) };
      await fetch("/api/submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await router.push("/thanks");
    } catch (error) {
      console.error(error);
    }

    // const { data } = await supabase
    //   .from("submissions")
    //   .insert([{ survey_id: id, answers: answerState }])
    //   .single();
    // router.push(`/thanks`);
  }

  return (
    <div className="  bg-gradient-to-bl from-indigo-200 via-red-200 to-yellow-100">
      <div className=" py-12 px-24 bg-gradient-to-tl from-indigo-200 via-red-200 to-yellow-100">
        <h1 className="text-5xl mt-4 font-semibold tracking-wide">
          {survey.title}
        </h1>
      </div>
      <div className="bg-yellow-50 pt-10 h-screen overflow-x-auto rounded-2xl ">
        <div className="py-2 px-24 ">
          <div className="mt-8">
            <MDXRemote components={scope()} {...source}></MDXRemote>
          </div>
          <div className="">
            <div className="flex">
              {pageState[0] !== 0 ? (
                <button
                  type="button"
                  className="mb-4  mr-10 bg-red-200 font-extrabold mt-8 px-8 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 hover:bg-red-300"
                  onClick={() => {
                    const newPage = [...pageState];
                    newPage[0] = newPage[0] - 1;
                    setPageState(newPage);
                  }}
                >
                  Previous
                </button>
              ) : null}

              <button
                type="button"
                className="mb-4 mr-4 bg-red-200 font-extrabold mt-8 px-8 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 hover:bg-red-300"
                onClick={
                  pageState[0] !== pageState[1] - 1
                    ? increaseCounter
                    : submitAnswers
                }
              >
                {pageState[0] !== pageState[1] - 1 ? "Next" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getStaticProps({ params }) {
//   const { id } = params;
//   const { data } = await supabase
//     .from("surveys")
//     .select()
//     .filter("id", "eq", id)
//     .single();
//   const mdxSource = await serialize(data.content);
//   return {
//     props: {
//       id: id,
//       source: mdxSource,
//       survey: data,
//     },
//   };
// }

export const getServerSideProps = async ({ params }) => {
  const data = await prisma.survey.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  const mdxSource = await serialize(data.content);
  return {
    props: {
      id: params.id,
      survey: data,
      source: mdxSource,
    },
  };
};
