import LayoutDefault from '@/layouts/DefaultLayout'
import React from 'react'
import ModulesApi from '@/api/moduleApi'
import { useState, useEffect, useRef } from 'react'
import { getCookie } from 'cookies-next'
import { USER } from '@/types/user'
import { convertFileToBase64 } from '@/helpers/common'
import { store } from '@/stores'
import { setUserState } from '@/stores/message'

const ChatPage = () => {
    
    return <>
      11
    </>
}
ChatPage.getLayout = function getLayout(page) {
    return <>
        <LayoutDefault>
            {page}
        </LayoutDefault>
    </>
}
export default ChatPage
