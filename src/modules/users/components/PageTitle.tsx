import React from 'react';

interface Props {
  title: String;
  titleContent: String;
}

const PageTitle: React.FC<Props> = ({ title, titleContent }) => {
  return (
    <>
      <div className="page-title mb-3 font-bold text-[22px]">{title}</div>

      <a className="text-dark-50">
        <span className="txt text-[#6f6f6f]">{titleContent}</span>
      </a>
    </>
  );
};

export default PageTitle;
