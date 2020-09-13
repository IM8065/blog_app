import React from "react";

const ArticleList = (props) => {
  const { pid, title, date_created, body } = props;

  return (
    <div className="article-container">
      <div
        style={{ cursor: "pointer" }}
        className="main-article"
        onClick={() => props.itemClick(pid)}
      >
        <h3>{title}</h3>
        <p>Created: {date_created}</p>
      </div>
    </div>
  );
};

export default ArticleList;
