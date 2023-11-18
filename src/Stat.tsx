import {
  Button,
  Input,
  List,
  Select,
  Space,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import { IData, IIGD } from "./utils/types";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";

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

  return <Tabs type="card" centered animated size="large" items={items} />;
};

interface IDisplayList {
  data: IIGD[];
  title: string | React.ReactElement;
}

type $sortValues = "value" | "timestamp" | "default";

function DisplayList({ data, title }: IDisplayList) {
  const [local, setLocal] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [asc, setAsc] = useState(true);
  const [sortValue, setSortValue] = useState<$sortValues>("default");

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

  const handleSort = (property: $sortValues, forceAsc?: boolean) => {
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
          let prop = [__A, __B];

          if (typeof forceAsc === "boolean") {
            if (forceAsc === false) {
              prop = [__B, __A];
            }
          } else if (!asc) {
            prop = [__B, __A];
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const [value1, value2] = prop as any;

          return property === "timestamp"
            ? value1 - value2
            : value1.localeCompare(value2);
        })
      );
    }
  };

  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Typography.Text>
        {title}: <em>{data.length}</em>
      </Typography.Text>
      <Input
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="mt-2"
        allowClear
      />

      <div className="text-start text-secondary mb-2 mt-1">
        <Space size="small">
          Sort By
          <Select
            popupMatchSelectWidth={false}
            defaultValue="default"
            bordered={false}
            onChange={(v: $sortValues) => {
              setSortValue(v);
              handleSort(v);
            }}
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
          <Button
            icon={asc ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
            shape="circle"
            onClick={() => {
              setAsc(!asc);
              handleSort(sortValue, !asc);
            }}
            type="dashed"
          />
        </Space>
      </div>
      <div ref={ref} className="stat-list">
        <List
          pagination={{
            defaultPageSize: 50,
            size: "small",
            showQuickJumper: true,
            align: "center",
            responsive: true,
            className: "m-4",
            hideOnSinglePage: true,
            onChange: () => {
              ref.current?.scrollTo({
                behavior: "smooth",
                top: 0,
              });
            },
          }}
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
                <Typography.Link
                  target="_blank"
                  href={value.string_list_data[0].href}
                >
                  {value.string_list_data[0].value}
                </Typography.Link>
              </Space>
            </List.Item>
          )}
        />
      </div>
    </>
  );
}

export default Stat;

