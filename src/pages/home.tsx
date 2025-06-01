import LayoutDefault from '@/layouts/DefaultLayout';
import Head from 'next/head.js';
import { useState, useEffect } from 'react'
import React from 'react'
import ModulesApi from '@/api/moduleApi'

const Home = () => {
  const { authApi } = ModulesApi()
  const [isHydrated, setIsHydrated] = useState(false);
 
  const fetchData = async () => {
    try {
      await authApi.report();
      // if (resp?.data) {
      //   setReport(resp?.data);
      // }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      fetchData();
    }
  }, [isHydrated]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default Home;
