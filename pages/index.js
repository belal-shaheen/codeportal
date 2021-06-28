import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../api";
import Layout from "../components/Layout";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
          Analytics
        </h1>
      </div>
    </Layout>
  );
}
