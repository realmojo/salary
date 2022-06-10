import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { PageHeader, Input, Button, Popover, Typography, Divider } from "antd";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";

const suffix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const Menu = ({ color }) => (
  <div style={{ display: color === "white" ? "flex" : "block", width: 100 }}>
    <Link href="/category">
      <Typography.Title
        level={5}
        style={{
          cursor: "pointer",
          color: color,
          marginTop: 0,
          marginBottom: 0,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          marginRight: color === "white" ? 8 : 0,
        }}
      >
        업종별
      </Typography.Title>
    </Link>
    {color === "black" ? <Divider style={{ margin: "8px 0" }} /> : ""}
    <Link href="/size">
      <Typography.Title
        level={5}
        style={{
          cursor: "pointer",
          color: color,
          marginTop: 0,
          marginBottom: 0,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        크기별
      </Typography.Title>
    </Link>
  </div>
);

export const Header = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const onSearch = () => {
    router.push(`/list/${searchText}`);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  return (
    <>
      <PageHeader
        className="salary-header"
        title={
          <div style={{ display: "flex" }}>
            <div className="hidden md:block">
              <Link href="/">
                <Typography.Title
                  level={2}
                  style={{
                    cursor: "pointer",
                    color: "white",
                    marginBottom: 0,
                    marginRight: 20,
                  }}
                >
                  모두의 연봉
                </Typography.Title>
              </Link>
            </div>

            <Input.Group compact style={{ marginRight: 20, width: 600 }}>
              <Input
                size="large"
                value={searchText}
                onChange={onChange}
                placeholder="연봉이 궁금한 회사명을 검색하세요"
                onPressEnter={() => onSearch()}
                suffix={suffix}
              />
            </Input.Group>
            <div className="hidden md:flex">
              <Menu color="white" />
            </div>
            <div className="md:hidden">
              <Popover
                content={<Menu color="black" />}
                trigger="click"
                visible={visible}
                onVisibleChange={handleVisibleChange}
                placement="bottomRight"
              >
                <Button type="primary" icon={<MenuOutlined />} />
              </Popover>
            </div>
          </div>
        }
      />
    </>
  );
};
