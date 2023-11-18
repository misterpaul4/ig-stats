import { Alert, Image, Space, Typography } from "antd";
import i1 from "./assets/1.jpeg";
import i2 from "./assets/2.jpeg";
import i3 from "./assets/3.jpeg";
import i4 from "./assets/4.jpeg";
import i5 from "./assets/5.jpeg";
import i6 from "./assets/6.jpeg";
import i7 from "./assets/7.jpeg";
import i8 from "./assets/8.jpeg";

const Instructions = () => {
  const imageWidth = 300;

  return (
    <div className="instructions">
      <ol>
        <Space direction="vertical" size="large">
          <div>
            <li>Open instagram, go to settings</li>
            <Image src={i1} width={imageWidth} />
          </div>
          <div>
            <li>Open account center</li>
            <Image src={i2} width={imageWidth} />
          </div>
          <div>
            <li>Your information and permissions</li>
            <Image src={i3} width={imageWidth} />
          </div>
          <div>
            <li>Download your information</li>
            <Image src={i4} width={imageWidth} />
          </div>
          <div>
            <li>Request a download then select only your instagram account</li>
            <Image src={i5} width={imageWidth} />
          </div>
          <div>
            <li>
              Since we are only interested in following/follower data, pick the
              second option
            </li>
            <Image src={i6} width={imageWidth} />
          </div>
          <div>
            <li>Select "Followers & following"</li>
            <Image src={i7} width={imageWidth} />
          </div>
          <div>
            <li>The configuration should look like this. Submit request</li>
            <Image src={i8} width={imageWidth} />
          </div>
        </Space>
      </ol>

      <Alert
        type="info"
        showIcon
        message={
          <Typography.Paragraph>
            Please allow a few minutes for the data to become accessible in
            account center. Once ready, you can download the data. Upload the
            JSON files named <strong>'followers_1.json'</strong> and{" "}
            <strong>'following.json'</strong>. If you possess a substantial
            number of followers, you may encounter additional files such as{" "}
            <strong>'followers_2.json'</strong> and so forth, upload those as
            well.
          </Typography.Paragraph>
        }
      />
    </div>
  );
};

export default Instructions;

