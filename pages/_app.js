import React, { useEffect } from "react";
import Head from "next/head";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "antd/dist/antd.css";
import NextNProgress from "nextjs-progressbar";
import { Layout } from "antd";
const { Footer } = Layout;
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const schemaData = {
    "@context": "http://schema.org",
    "@type": "Organization",
    name: "모두의 연봉 - 내 연봉은 어디쯤?",
    url: "http://salaryinfo.co.kr",
    image: "https://salaryinfo.s3.ap-northeast-2.amazonaws.com/logo.png",
    description:
      "내 연봉은 어디쯤 되는지 확인해보세요. 900,000개 이상의 연봉정보를 확인할 수 있습니다. 본 사이트는 국민연금 가입자 내역을 토대로 데이터를 제공합니다.",
    brand: "salaryinfo",
    datePublished: "2022-05-15",
  };
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content="http://salayinfo.co.kr" />
        <meta
          property="og:image"
          content="https://salaryinfo.s3.ap-northeast-2.amazonaws.com/logo.png"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9130836798889522"
          crossorigin="anonymous"
        ></script> */}
      </Head>
      <NextNProgress
        color="#fff"
        startPosition={0.3}
        stopDelayMs={200}
        height={1}
        showOnShallow={true}
      />
      <Component {...pageProps} />
      <Footer className="mt-10 w-full text-center bottom-0">
        <div className="text-gray-400 text-xs mb-1">
          copyrightⓒ 2017 All rights reserved by{" "}
          <strong>salaryinfo.co.kr</strong>
        </div>
        <div className="text-gray-400 text-xs">
          모든 데이터는 국민연금 사업자 내역을 토대로 조회된 내역 입니다.
        </div>
      </Footer>
    </>
  );
}

export default MyApp;
