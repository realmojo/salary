import React from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { Table, List, Typography } from "antd";
import { Header } from "../../components/Header";

const columns = [
  {
    title: "회사명",
    dataIndex: "title",
    key: "title",
    render: (value, { _id }) => {
      return (
        <Link href={`/company/${_id}/${encodeURI(value)}`}>
          <a>{value}</a>
        </Link>
      );
    },
  },
  { title: "주소", dataIndex: "address", key: "address" },
];

export const SizeRangePage = ({ title, items }) => {
  const schemaData = {
    "@context": "http://schema.org",
    "@type": "Organization",
    name: `${title} 모두의 연봉 - 내 연봉은 어디쯤?`,
    url: "http://salaryinfo.co.kr",
    image: "https://salaryinfo.s3.ap-northeast-2.amazonaws.com/logo.png",
    brand: "salary info",
    datePublished: "2022-05-15",
  };

  return (
    <>
      <Head>
        <title>{title} 연봉정보 | 모두의 연봉</title>
        <meta
          name="description"
          content={`${title} 연봉정보 | 모두의 연봉 내 연봉은 어디쯤 되는지 확인해보세요. 900,000개 이상의 연봉정보를 확인할 수 있습니다. 본 사이트는 국민연금 가입자 내역을 토대로 데이터를 제공합니다.`}
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
          content={`${title} 연봉정보 | 모두의 연봉. 내 연봉은 어디쯤 되는지 확인해보세요. 900,000개 이상의 연봉정보를 확인할 수 있습니다. 본 사이트는 국민연금 가입자 내역을 토대로 데이터를 제공합니다.`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <Header />
      <div
        style={{
          width: 1024,
          height: 300,
          background: "#ddd",
          margin: "20px auto",
        }}
      >
        adsense
      </div>
      <div className="container-wrap">
        <Typography.Title level={1}>[{title}]규모 회사 목록</Typography.Title>
        {items.length && (
          <Table
            bordered
            style={{ marginBottom: 20 }}
            dataSource={items}
            columns={columns}
            rowKey="_id"
            pagination={false}
          />
        )}
      </div>
    </>
  );
};
export default SizeRangePage;

export const getServerSideProps = async ({ params }) => {
  const { range } = params;
  const response = await axios.get(
    `${process.env.BASE_URL}/api/company/size?range=${range}`
  );

  return { props: { title: range, items: response.data } };
};
