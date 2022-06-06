import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { PageHeader, Input, Space, Avatar, Button, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const suffix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
export const Header = () => {
  const router = useRouter();
  const [number, setNumber] = useState("");

  const onSearch = () => {
    router.push(`/number/${number}`);
  };

  const onChange = (e) => {
    const { value } = e.target;
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber = value.replace(/[^0-9-]/g, "");
    setNumber(onlyNumber);
  };

  return (
    <>
      <PageHeader
        style={{ background: "#1890ff" }}
        className="site-page-header"
        title={
          <Space>
            <Link href="/">
              <Typography.Title
                level={2}
                style={{ color: "white", marginBottom: 0, marginRight: 20 }}
              >
                모두의 연봉
              </Typography.Title>
              {/* <Avatar
                style={{ cursor: "pointer", width: 50, height: 50 }}
                src="https://phonebookup.s3.ap-northeast-2.amazonaws.com/logo.png"
              /> */}
            </Link>

            <Input.Group compact style={{ minWidth: "400px" }}>
              <Input
                size="large"
                value={number}
                onChange={onChange}
                placeholder="연봉이 궁금한 회사명을 검색하세요"
                onPressEnter={() => onSearch()}
                suffix={suffix}
              />
            </Input.Group>
          </Space>
        }
      />
    </>
  );
};
