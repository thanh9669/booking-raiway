import LayoutDefault from '@/layouts/DefaultLayout'
import Head from 'next/head.js'
import FormNews from '@/components/news/_form'
import React from 'react'
const UpdateNews = () => {
  return (
   <>
   <Head>
      <title>Bài viết</title>
    </Head>
    <div className="row"> 
      <div className="row">
        <div className="col-md-12">
         <FormNews />
        </div>
      </div>
    </div>
   </>
  )
}

UpdateNews.getLayout = function getLayout(page) {
  return (
    <LayoutDefault>
      {page}
    </LayoutDefault>
  )
}
export default UpdateNews;
