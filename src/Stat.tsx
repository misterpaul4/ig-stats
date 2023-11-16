import {
  Image,
  Input,
  List,
  Select,
  Space,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import { IData, IIGD } from "./utils/types";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

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

  return <Tabs size="large" items={items} />;
};

interface IDisplayList {
  data: IIGD[];
  title: string | React.ReactElement;
}

function DisplayList({ data, title }: IDisplayList) {
  const [local, setLocal] = useState(data);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const searchDelay = setTimeout(() => {
      if (searchTerm) {
        setLocal(
          data.filter((v) =>
            v.string_list_data[0].value
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
        );
      } else {
        setLocal(data);
      }
    }, 500);

    return () => {
      clearTimeout(searchDelay);
    };
  }, [searchTerm, data]);

  const handleSort = (property: "value" | "timestamp" | "default") => {
    if (property === "default") {
      setLocal((current) =>
        data.filter((v) =>
          current.some(
            (t) => t.string_list_data[0].value === v.string_list_data[0].value
          )
        )
      );
    } else {
      setLocal((current) =>
        [...current].sort((a, b) => {
          const __A = a.string_list_data[0][property];
          const __B = b.string_list_data[0][property];

          return property === "timestamp"
            ? (__A as number) - (__B as number)
            : a.string_list_data[0][property].localeCompare(
                b.string_list_data[0][property]
              );
        })
      );
    }
  };

  return (
    <>
      <Typography.Text>
        {title}: <em>{data.length}</em>
      </Typography.Text>
      <Input
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="mt-2"
      />

      <div className="text-start text-secondary mb-2 mt-1">
        <Space size="small">
          Sort By
          <Select
            popupMatchSelectWidth={false}
            defaultValue="default"
            bordered={false}
            onChange={handleSort}
            options={[
              {
                value: "default",
                label: "Default",
              },
              {
                value: "value",
                label: "Username",
              },
              {
                value: "timestamp",
                label: "Date",
              },
            ]}
          />
        </Space>
      </div>
      <List
        dataSource={local}
        renderItem={(value) => (
          <List.Item
            actions={[
              <span>
                {dayjs(
                  new Date(value.string_list_data[0].timestamp * 1000)
                ).format("DD-MMM-YYYY")}
              </span>,
            ]}
          >
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

