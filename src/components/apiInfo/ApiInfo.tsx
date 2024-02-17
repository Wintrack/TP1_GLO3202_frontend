// ApiInfoBox.tsx
import React from 'react';
import './ApiInfoBox.css';

const ApiInfoBox: React.FC = () => {
  return (
    <div className="api-info-box">
      <p>API is freely hosted. The first call can take up to 50 seconds to respond.</p>
    </div>
  );
};

export default ApiInfoBox;
