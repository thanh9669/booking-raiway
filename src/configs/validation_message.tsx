export default function(context) {
  // function getFailMessage(funcName) {
  //   if (!context.title) {
  //     console.warn('Không tìm thấy title để bindding câu thông báo lỗi')
  //   }
  //   return this[funcName].bind(this)
  // }
  function requiredFailMessage() {
    return context.title + ' không được để trống!'
  }
  function phoneFailMessage() {
    return context.title + ' không đúng định dạng!'
  }
  function maxFailMessage(params) {
    return context.title + ' không được lớn hơn ' + params[1] + ' ký tự';
  }
  function cmndFailMessage() {
    return context.title + ' không đúng định dạng!'
  }
  // function betweenFailMessage() {
  //   return context.title + ' chỉ nằm trong khoảng ' + context.min + ' và ' + context.max
  // }
  // function minFailMessage() {
  //   return context.title + ' phải lớn hơn hoặc bằng ' + context.min
  // }
  // function maxFailMessage() {
  //   return context.title + ' phải nhỏ hơn hoặc bằng ' + context.max
  // }
  // function inSetFailMessage() {
  //   return context.title + ' được chọn không hợp lệ'
  // }
  // function betweenLengthMessage() {
  //   if (context.minLength === context.maxLength) {
  //     return context.title + ' phải là ' + context.minLength + ' ký tự'
  //   }
  //   return context.title + ' từ ' + context.minLength + ' đến ' + context.maxLength + ' ký tự'
  // }
  // function minLengthFailMessage() {
  //   return context.title + ' phải có tối thiểu ' + context.minLength + ' ký tự'
  // }
  // function maxLengthFailMessage() {
  //   return context.title + ' không được vượt quá ' + context.maxLength + ' ký tự'
  // }
  // function typeFailMessage() {
  //   return this[context.type + 'TypeFailMessage']()
  // }
  // function emailTypeFailMessage() {
  //   return 'Email không đúng định dạng'
  // }
  function numberFailMessage() {
    return context.title + ' phải là một số'
  }
  // function sameFailMessage() {
  //   return context.title + ' không đúng'
  // }
  // function noEmojiFailMessage() {
  //   return context.title + ' không được chứa icon'
  // }

  // function phoneNumberFailMessage() {
  //   return context.title + ' không đúng định dạng'
  // }

  // function notExistChar(content) {
  //   return 'Không chứa các từ: ' + content.join(', ')
  // }

  // function notExistEmail(content) {
  //   return 'Không được chứa email: ' + content.join(', ')
  // }

  // function notExistHyperlink(content) {
  //   return 'Không có link đính kèm: ' + content.join(', ')
  // }

  // function notExistPhoneNumber(content) {
  //   return 'Không được chứa số điện thoại: ' + content.join(', ')
  // }

  // function notContainCharacter(content) {
  //   return 'Không có ký tự đặc biệt: ' + content.join(', ')
  // }

  // function notMst() {
  //   return 'Mã số thuế  không đúng định dạng'
  // }
  return {
    requiredFailMessage,
    phoneFailMessage,
    cmndFailMessage,
    maxFailMessage,
    numberFailMessage
  }
}
