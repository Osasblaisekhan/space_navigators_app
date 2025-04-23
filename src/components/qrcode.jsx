import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import { toJpeg } from 'html-to-image'; // Correct import

const CountDown = () => {
  const value = 'https://wa.me/message/EGV6WCFC7FRHH1';
  const qrCodeRef = useRef(null);

  const downloadQRCode = async () => {
    if (qrCodeRef.current) {
      try {
        const dataUrl = await toJpeg(qrCodeRef.current);

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qr-code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch {
        // console.error('Error downloading QR code:', error);
      }
    }
    return [];
  };

  return (
    <div className="container-qr">

      <div style={{ height: 'auto', maxWidth: 64, width: '100%' }} ref={qrCodeRef}>
        <QRCode
          size={256}
          style={{ height: '340px', width: '340px' }}
          value={value}
        />
      </div>
      <button type="button" onClick={downloadQRCode}>Download QR Code</button>
    </div>
  );
};

export default CountDown;
