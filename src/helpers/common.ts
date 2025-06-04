function checkErrorMessage(obj, name: string, errors: string) {
    if (errors && errors !== null) {
        return true
    }
    let error = false;
    for (let key in obj) {
        if (key == name) {
            obj[key] = null
        }
        if (obj[key] !== null && obj[key] != '' && parseFloat(obj[key]) != 0) {
          console.log(key, obj[key], obj)
          error = true;
          break
        }
      }
    return error
}
const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};
const formatPrice = (price) =>{
    return parseInt(price) ? parseInt(price) 
      ?.toFixed(0)
      ?.replace(/\B(?=(\d{3})+(?!\d))/g, ','): '0';
}

const paginate = (total, current, max = 6) => {
    const pages = [];
  
    // Always show first and last
    const first = 1;
    const last = total;
  
    if (total <= max) {
      // Nếu tổng số trang ít hơn max -> hiển thị hết
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
      return pages;
    }
  
    if (current <= 3) {
      // Gần đầu
      pages.push(1, 2, 3, 4, "...", total);
    } else if (current >= total - 2) {
      // Gần cuối
      pages.push(1, "...", total - 3, total - 2, total - 1, total);
    } else {
      // Ở giữa
      pages.push(1, "...", current - 1, current, current + 1, "...", total);
    }
  
    return pages;
  }
function shuffleArray(array) {
  const shuffled = [...array]; // tạo bản sao để không thay đổi mảng gốc
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
export {
    checkErrorMessage,
    convertFileToBase64,
    formatPrice,
    paginate,
    shuffleArray
}