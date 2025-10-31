import React, { useEffect, useState } from 'react';

const AdBlockModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adBlockerDetected, setAdBlockerDetected] = useState(false);

  useEffect(() => {
    const checkAdBlocker = () => {
      const testDiv = document.createElement('div');
      testDiv.id = 'ad-note-test';
      testDiv.className = 'ad native-ad native-ad-1 ytd-j yxd-j aff-content-col ads-container google-ad adsbox ad-placement';
      testDiv.style.position = 'absolute';
      testDiv.style.left = '-9999px';
      testDiv.style.width = '1px';
      testDiv.style.height = '1px';
      document.body.appendChild(testDiv);

      const script = document.createElement('script');
      script.src = '/nativeads.js';
      script.async = true;
      
      script.onload = () => {
        setTimeout(() => {
          const testElement = document.getElementById('ad-note-test');
          const scriptLoaded = (window as any).adblockNoticeShown;
          
          if (!testElement || testElement.offsetHeight === 0 || !scriptLoaded) {
            setAdBlockerDetected(true);
          } else {
            setIsOpen(true);
          }
          
          if (testElement && testElement.parentNode) {
            testElement.parentNode.removeChild(testElement);
          }
        }, 100);
      };

      script.onerror = () => {
        setAdBlockerDetected(true);
        const testElement = document.getElementById('ad-note-test');
        if (testElement && testElement.parentNode) {
          testElement.parentNode.removeChild(testElement);
        }
      };

      document.head.appendChild(script);
    };

    checkAdBlocker();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (adBlockerDetected || !isOpen) {
    return null;
  }

  return (
    <>
      {isOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: '50px',
            }}
            onClick={handleClose}
          >
          <div
            style={{
              position: 'relative',
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '14.4px',
              maxWidth: '360px',
              fontFamily: 'Doto, Transparent',
              fontSize: '13.5px',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ marginBottom: '10.8px', fontWeight: 'bold' }}>
              no adblocker detected
            </div>
            <div style={{ marginBottom: '10.8px', color: 'gray' }}>
              life is too short to waste on ads. protect your time with <a href="https://ublockorigin.com/" target="_blank" rel="noreferrer" style={{ 
                border: '0.9px solid lightgray',
                borderRadius: '100%',
                padding: '0 3.6px',
                marginLeft: '3.6px'
              }}>uBlock Origin</a>
            </div>
            <div
              style={{
                marginTop: '14.4px',
                cursor: 'pointer',
                textDecoration: 'underline',
                color: 'gray',
              }}
              onClick={handleClose}
            >
              click here to close
            </div>
          </div>
          </div>
      )}
    </>
  );
};

export default AdBlockModal;