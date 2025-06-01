import Link from 'next/link';
import React from 'react';

const Page404 = () => {
  return (
    <div className="container-xxl container-p-y">
      <div className="misc-wrapper">
        <h2 className="mb-2 mx-2">Không tìm thấy trang :(</h2>
        <p className="mb-4 mx-2">Oops! 😖 Không tìm thấy URL được yêu cầu trên máy chủ này.</p>
        <Link href={'/home'} className="btn btn-primary">Quay lại trang chủ</Link>
        <div className="mt-3">
          <img
            src="/img/illustrations/page-misc-error-light.png"
            alt="page-misc-error-light"
            width="500"
            className="img-fluid"
            data-app-dark-img="illustrations/page-misc-error-dark.png"
            data-app-light-img="illustrations/page-misc-error-light.png" />
        </div>
      </div>
      <style>{`
        .misc-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: calc(100vh - (1.625rem * 2));
            text-align: center;
          }
      `}</style>
    </div>
  );
};

export default Page404;
