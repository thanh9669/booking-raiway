import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
// import { wrapper } from "@/stores/index"
import '@/styles/css/app-chat.css';
import '@/styles/css/datatables.bootstrap5.css';
import '@/styles/css/bootstrap5.css';
import '@/styles/fonts/boxicons.css';
import '@/styles/css/core.css';
import '@/styles/fonts/boxicons.css';
import '@/styles/css/notyf.css';
import '@/styles/css/dropzone.css';
// import '@/styles/css/theme-default.css';
import '@/styles/css/pages/page-auth.css';
import '@/styles/css/demo.css';
import '@/styles/css/custom.css';
import '@/styles/css/iconify-icons.css';
import '@/styles/css/setting.css';
import { useEffect } from 'react';
// import '@/styles/css/core-dark.css';
// import '@/styles/css/theme-default-dark.css';
import { store, persistor } from '@/stores/index'
import { Provider } from 'react-redux'
import React, { useState } from 'react';
import { SessionProvider } from 'next-auth/react'
import { PersistGate } from 'redux-persist/integration/react';
import WeatherBox from '@/components/WeatherBox'
import FriendList, { Friend } from '@/components/common/FriendList'
import ChatBox from '@/components/common/ChatBox';

function App({ Component, pageProps }) {
  // const { employer } = store.getState()
  // useEffect(() => {
  //   if (employer.theme == "dark") {
  //     // import("@/styles/css/theme-default-dark.css")
  //     // import("@/styles/css/core-dark.css")
  //   }
  // }, [employer.theme])
  // Kiểm tra điều kiện, nếu shouldImportCSS là false, sẽ không import CSS
  const getLayout = Component?.getLayout || ((page) => page)
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <PersistGate loading={null} persistor={persistor}>
            {getLayout(
              <>
                 <Component {...pageProps} />
                <ToastContainer />
                
              </>
            )}
        </PersistGate>
      </SessionProvider>
    </Provider>
  )
}

export default App
