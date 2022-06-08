import React from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { Table, Typography } from "antd";
import { Header } from "../../components/Header";
import { Adsense } from "../../components/Adsense";

const columns = [
  {
    title: "업종코드",
    dataIndex: "_id",
    key: "_id",
    render: (value) => {
      return (
        <Link href={`/category/${value.code}/${value.codeName}`}>
          <a>
            <span className="cursor-pointer text-blue-400">{value.code}</span>
          </a>
        </Link>
      );
    },
  },
  {
    title: "업종코드명",
    dataIndex: "_id",
    key: "_id",
    render: (value) => {
      return <div>{value.codeName}</div>;
    },
  },
];

export const CategoryPage = ({ items }) => {
  const schemaData = {
    "@context": "http://schema.org",
    "@type": "Organization",
    name: "모두의 연봉 - 내 연봉은 어디쯤?",
    url: "http://salaryinfo.co.kr",
    image: "https://salaryinfo.s3.ap-northeast-2.amazonaws.com/logo.png",
    brand: "salary info",
    datePublished: "2022-05-15",
  };

  return (
    <>
      <Head>
        <title>연봉정보 | 모두의 연봉</title>
        <meta
          name="description"
          content={`연봉정보 | 모두의 연봉 내 연봉은 어디쯤 되는지 확인해보세요. 900,000개 이상의 연봉정보를 확인할 수 있습니다. 본 사이트는 국민연금 가입자 내역을 토대로 데이터를 제공합니다.`}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
        />
        <meta property="og:title" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content="http://salaryinfo.co.kr" />
        <meta
          property="og:image"
          content="https://salaryinfo.s3.ap-northeast-2.amazonaws.com/logo.png"
        />
        <meta
          property="og:description"
          content={`연봉정보 | 모두의 연봉. 내 연봉은 어디쯤 되는지 확인해보세요. 900,000개 이상의 연봉정보를 확인할 수 있습니다. 본 사이트는 국민연금 가입자 내역을 토대로 데이터를 제공합니다.`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <Header />
      <Adsense />
      <div className="container-wrap">
        <Typography.Title level={1}>업종코드 목록</Typography.Title>
        {items.length && (
          <Table
            bordered
            style={{ marginBottom: 20 }}
            dataSource={items}
            columns={columns}
            rowKey={(item) => {
              return `${item._id.code}-${item._id.codeName}`;
            }}
            pagination={false}
          />
        )}
      </div>
    </>
  );
};
export default CategoryPage;

export const getServerSideProps = async () => {
  const response = await axios.get(
    `${process.env.BASE_URL}/api/company/category`
  );

  const items = response.data.filter((item) => {
    return item._id.code !== 0 && item._id.codeName !== "";
  });

  return { props: { items } };
};
