'use client'
import { useState, useEffect } from "react";
import QRCode from 'qrcode';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [qrCodeDataURL, setQRCodeDataURL] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (inputText) {
      QRCode.toDataURL(inputText, { width: 256 })
        .then(url => {
          setQRCodeDataURL(url);
          setError('');
        })
        .catch(err => {
          console.error(err);
          setError('Error al generar el código QR');
        });
    } else {
      setQRCodeDataURL('');
      setError('');
    }
  }, [inputText]);

  const handleDownload = () => {
    if (qrCodeDataURL) {
      const link = document.createElement('a');
      link.href = qrCodeDataURL;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Generador de Código QR</h1>
      <input
        type="text"
        placeholder="Ingresa el texto o URL"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{
          padding: '10px',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '20px',
          boxSizing: 'border-box'
        }}
      />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '300px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '300px',
          marginBottom: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}>
          {qrCodeDataURL ? (
            <img src={qrCodeDataURL} alt="QR Code" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          ) : (
            <p style={{ textAlign: 'center' }}>El código QR aparecerá aquí</p>
          )}
        </div>
        {qrCodeDataURL && (
          <button 
            onClick={handleDownload}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Descargar QR (PNG)
          </button>
        )}
      </div>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}