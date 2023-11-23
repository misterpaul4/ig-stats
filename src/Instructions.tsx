import { Alert, Image, Skeleton, Space, Typography } from "antd";
import { useState } from "react";
const i1 = "src/assets/1.jpeg";
const i2 = "src/assets/2.jpeg";
const i3 = "src/assets/3.jpeg";
const i4 = "src/assets/4.jpeg";
const i5 = "src/assets/5.jpeg";
const i6 = "src/assets/6.jpeg";
const i7 = "src/assets/7.jpeg";
const i8 = "src/assets/8.jpeg";

const Instructions = () => {
  const [loading, setLoading] = useState<Record<string, boolean>>(() => {
    const value: Record<string, true> = {};
    for (let index = 0; index < 8; index++) {
      value[`ld${index + 1}`] = true;
    }

    return value;
  });
  const imageWidth = 300;
  const loaderHeightMultiplier = 1.5;

  const handleLoad = (key: string) => {
    setLoading((current) => ({ ...current, [key]: false }));
  };

  return (
    <div className="instructions">
      <ol>
        <Space direction="vertical" size="large">
          <div>
            <li>Open instagram, go to settings</li>
            {loading.ld1 && (
              <Skeleton.Image
                active
                style={{
                  width: imageWidth,
                  height: imageWidth * loaderHeightMultiplier,
                }}
              />
            )}

            <Image
              onLoad={() => handleLoad("ld1")}
              src={i1}
              width={imageWidth}
            />
          </div>
          <div>
            <li>Open account center</li>
            {loading.ld2 && (
              <Skeleton.Image
                active
                style={{
                  width: imageWidth,
                  height: imageWidth * loaderHeightMultiplier,
                }}
              />
            )}
            <Image
              onLoad={() => handleLoad("ld2")}
              src={i2}
              width={imageWidth}
            />
          </div>
          <div>
            <li>Your information and permissions</li>
            {loading.ld3 && (
              <Skeleton.Image
                active
                style={{
                  width: imageWidth,
                  height: imageWidth * loaderHeightMultiplier,
                }}
              />
            )}
            <Image
              onLoad={() => handleLoad("ld3")}
              src={i3}
              width={imageWidth}
            />
          </div>
          <div>
            <li>Download your information</li>
            {loading.ld4 && (
              <Skeleton.Image
                active
                style={{
                  width: imageWidth,
                  height: imageWidth * loaderHeightMultiplier,
                }}
              />
            )}
            <Image
              onLoad={() => handleLoad("ld4")}
              src={i4}
              width={imageWidth}
            />
          </div>
          <div>
            <li>Request a download then select only your instagram account</li>
            {loading.ld5 && (
              <Skeleton.Image
                active
                style={{
                  width: imageWidth,
                  height: imageWidth * loaderHeightMultiplier,
                }}
              />
            )}
            <Image
              onLoad={() => handleLoad("ld5")}
              src={i5}
              width={imageWidth}
            />
          </div>
          <div>
            <li>
              Since we are only interested in following/follower data, pick the
              second option
            </li>
            {loading.ld6 && (
              <Skeleton.Image
                active
                style={{
                  width: imageWidth,
                  height: imageWidth * loaderHeightMultiplier,
                }}
              />
            )}
            <Image
              onLoad={() => handleLoad("ld6")}
              src={i6}
              width={imageWidth}
            />
          </div>
          <div>
            <li>Select "Followers & following"</li>
            {loading.ld7 && (
              <Skeleton.Image
                active
                style={{
                  width: imageWidth,
                  height: imageWidth * loaderHeightMultiplier,
                }}
              />
            )}
            <Image
              onLoad={() => handleLoad("ld7")}
              src={i7}
              width={imageWidth}
            />
          </div>
          <div>
            <li>The configuration should look like this. Submit request</li>
            {loading.ld8 && (
              <Skeleton.Image
                active
                style={{
                  width: imageWidth,
                  height: imageWidth * loaderHeightMultiplier,
                }}
              />
            )}
            <Image
              onLoad={() => handleLoad("ld8")}
              src={i8}
              width={imageWidth}
            />
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

