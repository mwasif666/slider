// SidebarLayout.js
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/mousewheel";
import "./SidebarLayout.css";
import { FiChevronRight } from "react-icons/fi";
import iconmarq from "./images/slide1/Iconmark.png";
import Img1 from "./images/slide1/1.png";
import Img2 from "./images/slide1/2.png";
import Img3 from "./images/slide1/3.png";

const tabs = [
  {
    name: "Introduction",
    image: Img1,
    slides: [Img1, Img2, Img3],
  },
  {
    name: "Strategy",
    image: "https://picsum.photos/id/1021/60/40",
    slides: [Img1, Img2, Img3],
  },
  {
    name: "Brand Voice",
    image: "https://picsum.photos/id/1035/60/40",
    slides: [Img1, Img2, Img3],
  },
];

const SidebarLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [collapsed, setCollapsed] = useState(false);

  const swiperRef = useRef(null);

  // calculate first slide index for a tab
  const getTabStartIndex = (tabName) => {
    let index = 0;
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].name === tabName) {
        return index;
      }
      index += tabs[i].slides.length;
    }
    return 0;
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    const targetIndex = getTabStartIndex(tabName);
    if (swiperRef.current) {
      swiperRef.current.slideTo(targetIndex);
    }
  };

  return (
    <div className="d-flex vh-100 font-montserrat position-relative">
      {/* Sidebar with animation */}
      <div className={`sidebar p-3 ${collapsed ? "collapsed" : ""}`}>
        {!collapsed && (
          <>
            <ul className="nav flex-column mt-3">
              {tabs.map((tab) => (
                <li key={tab.name} className="nav-item">
                  <button
                    className={`nav-link text-start d-flex align-items-center ${
                      activeTab === tab.name ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(tab.name)}
                  >
                    {activeTab === tab.name && (
                      <img
                        src={iconmarq}
                        alt={tab.name}
                        className="me-2"
                        style={{
                          width: "24px",
                          height: "24px",
                          objectFit: "contain",
                        }}
                      />
                    )}
                    {tab.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="sidebar-top d-flex align-items-center justify-content-between">
              <button
                className="toggle-btn d-flex justify-content-end w-100"
                onClick={() => setCollapsed(true)}
              >
                <FiChevronRight className="toggle-icon rotated" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Collapsed header */}
      {collapsed && (
        <div className="collapsed-header d-flex align-items-center justify-content-between p-2">
          {tabs
            .filter((tab) => tab.name === activeTab)
            .map((tab) => (
              <div key={tab.name} className="d-flex align-items-center">
                <img
                  src={iconmarq}
                  alt={tab.name}
                  className="me-2"
                  style={{
                    width: "24px",
                    height: "24px",
                    objectFit: "contain",
                  }}
                />
                <span className="active-tab-title">{tab.name}</span>
              </div>
            ))}
          <button className="toggle-btn" onClick={() => setCollapsed(false)}>
            <FiChevronRight className="toggle-icon" />
          </button>
        </div>
      )}

      {/* Content */}
      <div
        className={`flex-grow-1 content-area ${collapsed ? "collapsed" : ""}`}
      >
        <Swiper
          direction="vertical"
          mousewheel={{ releaseOnEdges: true, sensitivity: 1 }}
          modules={[Mousewheel]}
          className="main-swiper"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            const currentGlobalIndex = swiper.activeIndex;
            let runningCount = 0;
            for (let i = 0; i < tabs.length; i++) {
              runningCount += tabs[i].slides.length;
              if (currentGlobalIndex < runningCount) {
                setActiveTab(tabs[i].name);
                break;
              }
            }
          }}
        >
          {tabs.map((tab) =>
            tab.slides.map((src, idx) => (
              <SwiperSlide key={`${tab.name}-${idx}`}>
                <div className="slide-wrapper">
                  <img src={src} alt={tab.name} className="slide-img" />
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default SidebarLayout;
