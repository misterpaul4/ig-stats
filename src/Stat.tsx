import { Image, Input, List, Space, Tabs, TabsProps, Typography } from "antd";
import { IData, IIGD } from "./utils/types";
import { useState } from "react";

interface IProps extends IData {}

const Stat = ({ followers, following }: IProps) => {
  const items: TabsProps["items"] = [];

  const getDiff = (setA: IIGD[], setB: IIGD[]) => {
    const usernames = new Set(setA.map((t) => t.string_list_data[0].value));
    return setB.filter((t) => !usernames.has(t.string_list_data[0].value));
  };

  following &&
    items.push({
      label: "Following",
      key: "Tab 1",
      children: (
        <DisplayList data={following} title="People you are following" />
      ),
    });

  followers &&
    items.push({
      label: "Followers",
      key: "Tab 2",
      children: (
        <DisplayList data={followers} title="People that are following you" />
      ),
    });

  if (followers && following) {
    const nonFollowers = getDiff(followers, following);
    const fans = getDiff(following, followers);

    items.push({
      label: "Non Followers",
      key: "Tab 3",
      children: (
        <DisplayList
          data={nonFollowers}
          title={
            <span>
              People you are following but are{" "}
              <strong className="text-danger">NOT</strong> following back
            </span>
          }
        />
      ),
    });

    items.push({
      label: "Fans",
      key: "Tab 4",
      children: (
        <DisplayList
          data={fans}
          title={
            <span>
              People you are <strong className="text-danger">NOT</strong>{" "}
              following back
            </span>
          }
        />
      ),
    });
  }

  return <Tabs items={items} />;
};

interface IDisplayList {
  data: IIGD[];
  title: string | React.ReactElement;
}

function DisplayList({ data, title }: IDisplayList) {
  const [local, setLocal] = useState(data);

  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    const getAddress = async () => {
      const response: any = await findAddress(searchTerm);
      setSearchResult(response?.data);
    };

    const searchDelay = setTimeout(() => {
      if (searchTerm && selectedAddress !== searchTerm) {
        getAddress();
        setDisplayResult(true);
      }
    }, 500);

    return () => {
      clearTimeout(searchDelay);
    };
  }, [searchTerm]);

  // const onSearch = (value: string) => {
  //   if (value) {
  //     setLocal((current) =>
  //       current.filter((v) =>
  //         v.string_list_data[0].value
  //           .toLowerCase()
  //           .includes(value.toLowerCase())
  //       )
  //     );
  //   } else {
  //     setLocal(data);
  //   }
  // };

  return (
    <>
      <Typography.Text>{title}</Typography.Text>

      <Input
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search..."
        className="mt-2"
      />
      <List
        dataSource={local}
        renderItem={(value) => (
          <List.Item>
            <Space size="large">
              <Image width={50} src={value.string_list_data[0].href} />
              <Typography.Link
                className="text-secondary"
                target="_blank"
                href={value.string_list_data[0].href}
              >
                {value.string_list_data[0].value}
              </Typography.Link>
            </Space>
          </List.Item>
        )}
      />
    </>
  );
}

export default Stat;

