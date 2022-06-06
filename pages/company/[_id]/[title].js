import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import axios from "axios";
import moment from "moment";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Divider,
  Table,
  List,
  Tag,
  Typography,
} from "antd";
const { Title, Paragraph } = Typography;

import { Header } from "../../../components/Header";

// import { getTitle } from "../../utils";
function addComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
}

export const CompanyPage = ({ item }) => {
  // console.log(item);
  const { title, address, roadAddress, code, codeName, info } = item;

  const columns = [
    { title: "연도", dataIndex: "year", key: "year" },
    { title: "월", dataIndex: "month", key: "month" },
    {
      title: "월 평균 급여(예상)",
      dataIndex: "monthSalary",
      key: "monthSalary",
      render: (_, { monthSalary }) => (
        <div>{addComma(monthSalary.toFixed(0))}</div>
      ),
    },
    {
      title: "월 평균 연봉(예상)",
      dataIndex: "yearSalary",
      key: "yearSalary",
      render: (_, { yearSalary }) => (
        <div>{addComma(yearSalary.toFixed(0))}</div>
      ),
    },
    {
      title: "총 직원수",
      dataIndex: "totalEmployer",
      key: "totalEmployer",
      render: (_, { totalEmployer }) => <div>{addComma(totalEmployer)}</div>,
    },
    {
      title: "입사 직원수",
      dataIndex: "joinEmployer",
      key: "joinEmployer",
      render: (_, { joinEmployer }) => <div>{addComma(joinEmployer)}</div>,
    },
    {
      title: "퇴사 직원수",
      dataIndex: "leaveEmployer",
      key: "leaveEmployer",
      render: (_, { leaveEmployer }) => <div>{addComma(leaveEmployer)}</div>,
    },
  ];

  const schemaData = {
    "@context": "http://schema.org",
    "@type": "Organization",
    name: "모두의 연봉 - 내 연봉은 어디쯤?",
    url: "http://www.salaryinfo.co.kr",
    image: "https://phonebookup.s3.ap-northeast-2.amazonaws.com/logo.png",
    brand: "salary info",
    datePublished: "2022-05-15",
  };

  return (
    <>
      <Head>
        <title>{title} 연봉정보 | 모두의 연봉</title>
        <meta name="description" content={`${title} 연봉정보 | 모두의 연봉`} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
        />
        <meta property="og:title" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content="http://phonebookup.com" />
        <meta
          property="og:image"
          content="https://phonebookup.s3.ap-northeast-2.amazonaws.com/logo.png"
        />
        <meta
          property="og:description"
          content={`${title} 연봉정보 | 모두의 연봉`}
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
        <Typography.Title level={1}>{title}</Typography.Title>
        <Table dataSource={info} columns={columns} pagination={false} />
        {/* <List
          header={<div>연도별 연봉 정보</div>}
          bordered
          dataSource={info}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text>{" "}
              {item.totalEmployer}
            </List.Item>
          )}
        /> */}
      </div>
      {/* <Row className="pt-4 container-wrap">
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          lg={{ span: 16 }}
          className="px-4"
        >
          <Title>{getTitle(number)}</Title>
          <Divider style={{ margin: "4px 0" }} />
          <Paragraph className="text-right text-gray-400">{created}</Paragraph>
          <p className="content-wrap">
            {comments[0] !== undefined
              ? comments[0].message
              : "아직 등록되지 않은 번호 입니다. 첫 댓글이 내용으로 들어갑니다."}
          </p>
          <Divider style={{ margin: "8px 0" }} />
          <Form.Item>
            <div className="mb-2 text-xs">
              <span className="mr-2">👉</span> 당신의 도움으로 큰 피해를 막을 수
              있습니다.
            </div>
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 80px)" }}
                value={message}
                status={isEmpty ? "error" : ""}
                onChange={onChange}
                placeholder="이 번호에 대해서 알려주세요."
                onKeyDown={(e) => {
                  handleSubmit(e);
                }}
              />
              <Button
                htmlType="submit"
                loading={isLoading}
                onClick={(e) => handleClickSubmit(e)}
                type="primary"
              >
                등록
              </Button>
            </Input.Group>
          </Form.Item>
          {isComplete && <div className="ml-2">등록이 완료되었습니다.</div>}
          {comments.map((item, index) => (
            <Comments index={index} key={index} item={item} />
          ))}
        </Col>
        <Col
          className="px-4"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          lg={{ span: 8 }}
        >
          <Recently number={number} />
        </Col>
      </Row> */}
    </>
  );
};
export default CompanyPage;

export const getServerSideProps = async ({ params }) => {
  const { _id } = params;

  const response = await axios.get(
    `${process.env.BASE_URL}/api/company/${_id}`
  );

  return { props: { item: response.data } };
};
