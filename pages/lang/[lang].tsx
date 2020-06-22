import { useRouter } from "next/router";
import React, { useEffect } from "react";

import useLocalStorage from "../../hooks/useLocalStorage";
import { i18n } from "../../lib/i18n";
import Home from "../index";

export async function getStaticPaths() {
  return {
    paths: ["fr", "en", "ru"].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  i18n.changeLanguage(params.lang);
  return { props: params };
}

interface Props {
  lang: string;
}

export default function Lang(props: Props) {
  const { lang } = props;
  const [, setLang] = useLocalStorage("lang", lang);

  const router = useRouter();

  useEffect(() => {
    setLang(lang);
    router.push("/");
  }, []);

  return <Home games={[]} />;
}
