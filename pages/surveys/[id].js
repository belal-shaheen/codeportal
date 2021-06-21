import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../api";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Test from "../../components/test";
import { scope } from "../../components/mdx";

export default function Survey({ survey, source }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className=" py-12 px-24 bg-gradient-to-tl from-indigo-200 via-red-200 to-yellow-100">
        <h1 className="text-5xl mt-4 font-semibold tracking-wide">
          {survey.title}
        </h1>
        <p className="text-sm font-light my-4">by {survey.user_email}</p>
      </div>
      <div className="bg-yellow-50 pt-8 h-screen">
        <div className="prose py-10 px-24">
          <div className="mt-8 prose">
            <MDXRemote components={scope()} {...source} />
          </div>
          <button
            type="button"
            className="mb-4 bg-red-200  font-extrabold mt-12 px-8 py-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { data, error } = await supabase.from("surveys").select("id");
  const paths = data.map((survey) => ({
    params: { id: JSON.stringify(survey.id) },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const { data } = await supabase
    .from("surveys")
    .select()
    .filter("id", "eq", id)
    .single();
  const mdxSource = await serialize(data.content);
  return {
    props: {
      source: mdxSource,
      survey: data,
    },
  };
}
