import LayoutDefault from '@/layouts/DefaultLayout'
import React from 'react'

const Index = () => {
    return (
        <>
        
        </>
    )
}
Index.getLayout = function getLayout(page) {
    return (
      <LayoutDefault>
        {page}
      </LayoutDefault>
    )
  }
export default Index;
