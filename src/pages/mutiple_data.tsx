import { useState, useCallback } from 'react';
// import { FixedSizeGrid as Grid } from 'react-window';
import Head from 'next/head';

const COLS = 10000;
const ROWS = 500;
const CELL_WIDTH = 100;
const CELL_HEIGHT = 40;

const Login = () => {
  // const [cells, setCells] = useState({}); // Lưu chỉ các ô thay đổi

  // const handleChange = useCallback((rowIndex, columnIndex, value) => {
  //   setCells((prev) => ({
  //     ...prev,
  //     [`${rowIndex}-${columnIndex}`]: value, // Chỉ lưu giá trị đã nhập
  //   }));
  // }, []);

  // const Cell = ({ columnIndex, rowIndex, style }) => {
  //   const cellKey = `${rowIndex}-${columnIndex}`;
  //   return (
  //     <div style={{ ...style, padding: '5px' }}>
  //       <input
  //         className="form-control"
  //         style={{ width: '100%' }}
  //         defaultValue={cells[cellKey] || ''}
  //         onBlur={(e) => handleChange(rowIndex, columnIndex, e.target.value)}
  //       />
  //     </div>
  //   );
  // };

  return (
    <>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <div className="container-xxl">
        11
{/*         <Grid
          columnCount={COLS}
          rowCount={ROWS}
          columnWidth={CELL_WIDTH}
          rowHeight={CELL_HEIGHT}
          width={800} // Kích thước hiển thị
          height={400} // Chỉ hiển thị một phần
        >
          {Cell}
        </Grid> */}
      </div>
    </>
  );
};

export default Login;
