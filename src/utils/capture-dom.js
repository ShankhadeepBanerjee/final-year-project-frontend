import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

export const captureElement = (elem) => {
  domtoimage
    .toBlob(elem)
    .then(function (blob) {
      saveAs(blob, "QR.png");
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
};
