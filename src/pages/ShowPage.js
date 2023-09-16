import React, { useState } from "react";
import { useParams } from "react-router-dom";
import QRcode from "qrcode.react";
export default function ShowPage() {
  const params = useParams();

  console.log(params);
  const [qr, setQr] = useState(params.id);
  return (
    <div>
      <QRcode id="myqr" value={qr} size={320} includeMargin={true} />
    </div>
  );
}
