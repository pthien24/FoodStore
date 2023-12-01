import React from "react";

interface LatestNewsItemProps {
  title: string;
  author: string;
  date: string;
  excerpt: string;
  link: string;
}

const LatestNewsItem: React.FC<LatestNewsItemProps> = ({
  title,
  author,
  date,
  excerpt,
  link,
}) => {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="single-latest-news">
        <a href={link}>
          <div className="latest-news-bg news-bg-1"></div>
        </a>
        <div className="news-text-box">
          <h3>
            <a href={link}>{title}</a>
          </h3>
          <p className="blog-meta">
            <span className="author">
              <i className="fas fa-user"></i> {author}
            </span>
            <span className="date">
              <i className="fas fa-calendar"></i> {date}
            </span>
          </p>
          <p className="excerpt">{excerpt}</p>
          <a href={link} className="read-more-btn">
            read more <i className="fas fa-angle-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};
export default LatestNewsItem;
