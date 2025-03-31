import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="text-center py-4">
      <p className="text-sm text-gray-500">
        &copy; {currentYear} Task Manager. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
