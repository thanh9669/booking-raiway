import Head from 'next/head.js';
import React from 'react';
import { useState, useEffect } from 'react'
import ModulesApi from '@/api/moduleApi'
import { setCookie } from 'cookies-next';
import employer from '@/configs/employer'
import { store } from '@/stores'
import { setAuthState } from '@/stores/employer'
import Router from 'next/router.js'
import TableLoading from '@/components/tables/table-loading'
import { useRouter } from 'next/router'

const VerifyToken = () => {
  return (
    <>
      <Head>
        <title>Verify Token</title>
      </Head>
    </>
  );
};



export default VerifyToken;
