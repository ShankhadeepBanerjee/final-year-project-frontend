import QrcodeDecoder from "qrcode-decoder";
import { useEffect, useState } from "react";

import Webcam from "react-webcam";

const qr = new QrcodeDecoder();

export default function QrReader({ interval, onDecodeValue, style = {} }) {
  const [img, setImg] = useState("");
  const [decodeValue, setDecodeValue] = useState("");

  console.log("Rendering 2");

  useEffect(() => {
    onDecodeValue(decodeValue);
  }, [decodeValue]);

  useEffect(() => {
    (async () => {
      const res = await qr.decodeFromImage(img, {});
      console.log(res.data);
      if (res.data) setDecodeValue(JSON.stringify(res.data));
    })();
  }, [img]);

  return (
    <div style={style}>
      {!decodeValue && (
        <Webcam height={240} width={720}>
          {({ getScreenshot }) => (
            <TakeScreenShotsInInterVal
              interval={interval}
              onScreenShot={() => {
                const imageSrc = getScreenshot();
                setImg(imageSrc);
              }}
            />
          )}
        </Webcam>
      )}
    </div>
  );
}

const TakeScreenShotsInInterVal = ({ interval, onScreenShot }) => {
  console.log("Rendering 1");
  useEffect(() => {
    const id = setInterval(() => {
      onScreenShot();
    }, interval);

    return () => {
      clearInterval(id);
    };
  }, []);
  return <></>;
};
