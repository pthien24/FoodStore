import * as React from "react";
import { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import LatestNewsItem from "../components/LatestNewsItemProps ";
const News = () => {
  return (
    <>
      <Breadcrumb title={"News"} />
      <div className="latest-news mt-150 mb-150">
        <div className="container">
          <div className="row">
            <LatestNewsItem
              title="Giới fast-food chạy đua làm bánh burger chay"
              author="Admin"
              date="29/9/2018"
              excerpt="Hãng McDonald thử nghiệm bánh burger chay tại Canada trong 12 tuần. Như vậy chỉ trong vòng nửa năm, liên tục các ông lớn của ngành fast-food thông báo sản phẩm không có prôtêin động vật."
              link="single-news.html"
            />
            <LatestNewsItem
              title="Giới fast-food chạy đua làm bánh burger chay"
              author="Admin"
              date="29/9/2018"
              excerpt="Hãng McDonald thử nghiệm bánh burger chay tại Canada trong 12 tuần. Như vậy chỉ trong vòng nửa năm, liên tục các ông lớn của ngành fast-food thông báo sản phẩm không có prôtêin động vật."
              link="single-news.html"
            />
            <LatestNewsItem
              title="Giới fast-food chạy đua làm bánh burger chay"
              author="Admin"
              date="29/9/2018"
              excerpt="Hãng McDonald thử nghiệm bánh burger chay tại Canada trong 12 tuần. Như vậy chỉ trong vòng nửa năm, liên tục các ông lớn của ngành fast-food thông báo sản phẩm không có prôtêin động vật."
              link="single-news.html"
            />
            <LatestNewsItem
              title="Giới fast-food chạy đua làm bánh burger chay"
              author="Admin"
              date="29/9/2018"
              excerpt="Hãng McDonald thử nghiệm bánh burger chay tại Canada trong 12 tuần. Như vậy chỉ trong vòng nửa năm, liên tục các ông lớn của ngành fast-food thông báo sản phẩm không có prôtêin động vật."
              link="single-news.html"
            />
            <LatestNewsItem
              title="Giới fast-food chạy đua làm bánh burger chay"
              author="Admin"
              date="29/9/2018"
              excerpt="Hãng McDonald thử nghiệm bánh burger chay tại Canada trong 12 tuần. Như vậy chỉ trong vòng nửa năm, liên tục các ông lớn của ngành fast-food thông báo sản phẩm không có prôtêin động vật."
              link="single-news.html"
            />
            <LatestNewsItem
              title="Giới fast-food chạy đua làm bánh burger chay"
              author="Admin"
              date="29/9/2018"
              excerpt="Hãng McDonald thử nghiệm bánh burger chay tại Canada trong 12 tuần. Như vậy chỉ trong vòng nửa năm, liên tục các ông lớn của ngành fast-food thông báo sản phẩm không có prôtêin động vật."
              link="single-news.html"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
