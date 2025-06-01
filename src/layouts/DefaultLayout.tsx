import React from 'react'
import FriendChatWidget from '@/components/common/FriendChatWidget'
import Navigate from './default/nav'
import Header from './default/header'

function LayoutDefault({ children }) {
  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Navigate />
          <div className="layout-page">
            <Header />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Friend chat widget gồm cả WeatherBox, FriendList, ChatBox */}
      <FriendChatWidget />
    </>
  );
}

export default LayoutDefault;