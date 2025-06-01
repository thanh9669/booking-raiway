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

type VerifyProps = {
  status: 'success' | 'error';
  token?: string,
  error?: string,
  message?: string;
};

const VerifyToken = ({ status, token, message }: VerifyProps) => {
  const { authApi } = ModulesApi()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (token) {
      authen()
    }
  }, [token]);
  const authen = async () => {
    setCookie(employer.AUTH, token)
    setCookie(employer.DEVICE, "")
    authApi.setDefault()
    const user = await authApi.detail({ device: ""}, token)
    if (user?.data?.data) {
      await store.dispatch(setAuthState(user.data.data))
      Router.push(employer.PATH_DEFAULT)
    }
  }
  return (
    <>
      { loading ? <TableLoading/> : '' } 
      <Head>
        <title>Verify Token</title>
      </Head>
      {status}
      {message}
    </>
  );
};


// getServerSideProps (SSR) để gọi API trên server
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/verify/${id}`);
    const data = await res.json();
    return {
      props: {
        status: 'success',
        token: data.token,
        message: data.message || 'Xác minh thành công!',
      }
    };
  } catch (error) {
    return {
      props: { status: 'error', message: error }
    };
  }
}

export default VerifyToken;
