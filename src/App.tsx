import { Button, Collapse, Form, Typography, Upload, message } from "antd";
import "./App.css";
import { AimOutlined, InboxOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/es/upload";
import { useEffect, useState } from "react";
import { IIGD } from "./utils/types";
import Stat from "./Stat";
import Instructions from "./Instructions";

const { Dragger } = Upload;

function App() {
  const [form] = Form.useForm();
  const uploads = Form.useWatch("uploads", form);
  const [following, setFollowing] = useState<IIGD[]>();
  const [followers, setFollowers] = useState<IIGD[]>();
  const [attempt, setAttempt] = useState(false);
  const [showStat, setShowStat] = useState(false);

  const onClose = () => {
    setShowStat(false);
    setAttempt(false);
    setFollowers(undefined);
    setFollowing(undefined);
    form.resetFields();
  };

  const onFinish = (values: { uploads: never }) => {
    try {
      const value: UploadChangeParam = values.uploads;

      Array.from(value.fileList).forEach((file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const content = e.target?.result;
          if (typeof content === "string") {
            const result = JSON.parse(content);
            // following: relationships_following
            if (result?.relationships_following) {
              setFollowing((current) =>
                current
                  ? [...current, ...result.relationships_following]
                  : result.relationships_following
              );
            } else if (Array.isArray(result)) {
              setFollowers((current) =>
                current ? [...current, ...result] : result
              );
            }
          }
        };

        reader.readAsText(file.originFileObj as never);
      });
    } catch (error) {
      message.error("Request could not be completed");
      console.error(error);
    }

    setAttempt(true);
  };

  useEffect(() => {
    if (attempt && (followers || following)) {
      setShowStat(true);
      setAttempt(false);
    }
  }, [attempt, followers, following]);

  return !showStat ? (
    <div className="text-start upload-container">
      <div>
        <Typography.Title level={3} className="text-center">
          Find out who is not following you back on instagram
        </Typography.Title>
        <Collapse
          ghost
          size="large"
          items={[
            {
              key: "1",
              label: "How to get started",
              children: <Instructions />,
            },
            {
              key: "2",
              label: "What happens to my data after uploading?",
              children: (
                <p>
                  Rest assured, your data is not stored on any server. All
                  operations are exclusively performed on the client side
                  without any need for external API requests.
                </p>
              ),
            },
          ]}
          bordered={false}
          className="mb-3 w-100"
        />
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="uploads">
            <Dragger
              multiple
              maxCount={5}
              accept=".json"
              beforeUpload={() => false}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag JSON file to this area to upload
              </p>
              <p className="ant-upload-hint py-2 px-5">
                Support for a single or bulk upload. Only JSON files is
                supported
              </p>
              <p>
                <em>upload following/followers JSON files.</em>
              </p>
            </Dragger>
          </Form.Item>

          {!!uploads?.fileList.length && (
            <Button
              type="primary"
              size="large"
              icon={<AimOutlined />}
              className="mt-2"
              htmlType="submit"
            >
              Submit
            </Button>
          )}
        </Form>
      </div>
    </div>
  ) : (
    <Stat onClose={onClose} followers={followers} following={following} />
  );
}

export default App;

