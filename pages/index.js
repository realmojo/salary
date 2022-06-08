import { Header } from "../components/Header";
import { Row, Col, Card, Skeleton, Typography } from "antd";
import axios from "axios";
import React from "react";
import moment from "moment";
import "moment/locale/ko";
import Link from "next/link";
import Head from "next/head";
import { addComma } from "../utils";
import { Adsense } from "../components/Adsense";

const SkeletonComponent = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
        <Col
          key={item}
          className="mb-4"
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          lg={{ span: 6 }}
        >
          <Skeleton />
        </Col>
      ))}
    </>
  );
};
const ItemsComponent = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <Col
          key={index}
          className="mb-4"
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          lg={{ span: 6 }}
        >
          <Card
            type="inner"
            title={
              <Link href={`/company/${item._id}/${item.title}`}>
                <a>{item.title}</a>
              </Link>
            }
          >
            <div className="text-gray-400 text-xs">
              직원 수: {addComma(item.totalEmployer)} 명
            </div>
            <Typography.Title
              level={3}
              style={{ marginBottom: 0, marginTop: 0 }}
            >
              {addComma(item.yearSalary)} 원
            </Typography.Title>
          </Card>
        </Col>
      ))}
    </>
  );
};
const Home = ({ items, techItems }) => {
  return (
    <>
      <Head>
        <title>모두의 연봉 - 내 연봉 어디쯤?</title>
        <meta
          name="description"
          content="내 연봉은 어디쯤 되는지 확인해보세요. 1,000,000개 이상의 연봉정보를 확인할 수 있습니다. 본 사이트는 국민연금 가입자 내역을 토대로 데이터를 제공합니다."
        />
        <meta property="og:title" content="연봉 - 내 연봉 어디쯤?" />
        <meta
          property="og:description"
          content="내 연봉은 어디쯤 되는지 확인해보세요. 1,000,000개 이상의 연봉정보를 확인할 수 있습니다. 본 사이트는 국민연금 가입자 내역을 토대로 데이터를 제공합니다."
        />
      </Head>
      <Header />
      <Adsense />
      <Row gutter={16} className="pt-4 container-wrap">
        {items.length === 0 ? (
          <SkeletonComponent />
        ) : (
          <>
            <div className="container-wrap px-2">
              <Typography.Title>
                {moment().format("YYYY")}년 {moment().format("MM")}월 연봉 TOP
                100
              </Typography.Title>
            </div>
            <ItemsComponent items={items} />
            <div className="container-wrap px-2">
              <Typography.Title level={2}>
                주요 IT Tech 기업 연봉
              </Typography.Title>
            </div>
            <ItemsComponent items={techItems} />
          </>
        )}
      </Row>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const top100 = await axios.get(`${process.env.BASE_URL}/api/company/top100`);
  const tech9 = await axios.get(`${process.env.BASE_URL}/api/company/tech9`);

  return { props: { items: top100.data, techItems: tech9.data } };
};
