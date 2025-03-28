import React from "react";

const Ribbon = () => {
  return (
    <svg width="300" height="100" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="10,50 40,30 40,70" fill="#b17248" />
      <polygon points="290,50 260,30 260,70" fill="#b17248" />
      <rect x="40" y="25" width="220" height="50" fill="#b17248" rx="10" />
      <rect x="50" y="35" width="200" height="30" fill="white" rx="5" />
      <text x="150" y="55" fontSize="16" font-weight="bold" fill="#b17248" text-anchor="middle">{"อะไรก็ได้"}</text>
    </svg>
  );
};

export default Ribbon;