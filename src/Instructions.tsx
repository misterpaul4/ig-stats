import { Alert, Image, Skeleton, Space, Typography } from "antd";
import i1 from "../public/assets/img1.jpeg";
import i2 from "../public/assets/img2.jpeg";
import i3 from "../public/assets/img3.jpeg";
import i4 from "../public/assets/img4.jpeg";
import i5 from "../public/assets/img5.jpeg";
import i6 from "../public/assets/img6.jpeg";
import i7 from "../public/assets/img7.jpeg";
import i8 from "../public/assets/img8.jpeg";

const imageWidth = 300;

const InstructionImage = ({ src }) => {
  return (
    <Image
      src={src}
      style={{ minHeight: imageWidth * 1.45 }}
      width={imageWidth}
      placeholder={<Skeleton.Image active className="w-100 h-100" />}
    />
  );
};

const Instructions = () => {
  return (
    <div className="instructions">
      <ol>
        <Space direction="vertical" size="large">
          <div>
            <li>Open instagram, go to settings</li>
            <InstructionImage src={i1} />
          </div>
          <div>
            <li>Open account center</li>
            <InstructionImage src={i2} />
          </div>
          <div>
            <li>Your information and permissions</li>
            <InstructionImage src={i3} />
          </div>
          <div>
            <li>Download your information</li>
            <InstructionImage src={i4} />
          </div>
          <div>
            <li>Request a download then select only your instagram account</li>
            <InstructionImage src={i5} />
          </div>
          <div>
            <li>
              Since we are only interested in following/follower data, pick the
              second option
            </li>
            <InstructionImage src={i6} />
          </div>
          <div>
            <li>Select "Followers & following"</li>
            <InstructionImage src={i7} />
          </div>
          <div>
            <li>The configuration should look like this. Submit request</li>
            <InstructionImage src={i8} />
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

