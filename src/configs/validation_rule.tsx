// import { capitalizeFirstLetter } from '@/helpers/str'
// import { hasEmoji } from '@/helpers/emoji'

export default function(context) {
  function passRequiredRule() {
    let value = context.value
    if (Array.isArray(value)) {
      return value.length > 0
    }

    if (typeof value == 'string') {
      value = value.trim()
    }

    return value !== null && value !== undefined && value !== ''
  }
  function passCmndRule() {
    const pattern = /^\d{12}$/;
    let value = context.value
    return pattern.test(value)
  }
  // function passMaxRule() {
  //   return false
  // }

  // function passMinRule() {
  //   return context.value >= context.min
  // }

  function passMaxRule(params: any) {
    return context.value.length <= parseInt(params.length > 1 ? params[1].toString() : '0')
  }

  // function passInSetRule() {
  //   return context.inSet.includes(context.value)
  // }

  // function passMinLengthRule(value) {
  //   value = value || context.value.toString()
  //   return value.length >= context.minLength
  // }

  // function passMaxLengthRule(value) {
  //   value = value || context.value.toString()
  //   return value.length <= context.maxLength
  // }

  // function passEmailTypeRule(value) {
  //   const regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
  //   value = value || context.value
  //   return regex.test(value)
  // }

  // function passNumberTypeRule() {
  //   return (context.value - context.value).toString() !== 'NaN'
  // }

  // function passSameRule() {
  //   return context.value === context.same
  // }

  // // function passNoEmojiRule() {
  // //   return !hasEmoji(context.value)
  // // }

  function passPhoneRule() {
    const regex = /^(0|\+84|84)[1-9]([0-9]{8,9})$/
    return regex.test(context.value)
  }

  function passNumberRule() {
    const regex = /^\d+$/
    return regex.test(context.value)
  }

  // function notExistCharRule(value) {
  //   const chars = ['Hot', 'Gấp']
  //   value = value || context.value
  //   value = value.toLocaleLowerCase()
  //   const result = chars.filter((char, currentValue) => {
  //     const regex = new RegExp(`(^${char} )|( ${char}$)|( ${char}[!0-9])|(^${char}[!0-9])|([!.0-9 (#]${char}[!.0-9)# ]?)|( ${char} )|(\\[${char}\\])`, 'gi')
  //     if (value.match(regex)) {
  //       return char
  //     }
  //     return false
  //   })
  //   return result.length ? result : false
  // }

  // function notExistPhoneRule(value) {
  //   value = value || context.value
  //   const regex = new RegExp(/(^| |\D)(0|([+]84)|([(]84[)])|([(][+]84[)]))([0-9]{9,10})($| |\D)/, 'g')
  //   const result = value.matchAll(regex)
  //   if (result) {
  //     console.log(result)
  //     const phoneRules = result.map(item => item[0].replace(/[^0-9.+]/g, ''))
  //     return Array.from(new Set(phoneRules))
  //   }
  //   return false
  // }

  // function notContainCharacter(value) {
  //   value = value || context.value
  //   const regex = new RegExp(/[~\`@#^*]/, 'g')
  //   const result = value.matchAll(regex)
  //   if (result) {
  //     const containCharacters = result.map(item => item[0])
  //     return Array.from(new Set(containCharacters))
  //   }
  //   return false
  // }

  // function notExistHyperlink(value) {
  //   value = value || context.value
  //   const regex = new RegExp(/(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/, 'g')
  //   const result = value.matchAll(regex)
  //   if (result) {
  //     const hyperLinks = result.map(item => item[0])
  //     return Array.from(new Set(hyperLinks))
  //   }
  //   return false
  // }

  // function notExistEmail(value) {
  //   value = value || context.value
  //   const regex = /(?:[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e\-\\x1f\\x21\\x23-\\x5b\\x5d\-\\x7f]|\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e\-\\x1f\\x21-\\x5a\\x53-\\x7f]|\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\])/
  //   const result = value.matchAll(regex)
  //   if (result) {
  //     const emails = result.map(item => item[0])
  //     return Array.from(new Set(emails))
  //   }
  //   return false
  // }

  // function isMst(value) {
  //   value = value || context.value
  //   const regex = new RegExp(/^\d{10}$|^\d{10}-\d{3}$/)
  //   return value.matchAll(regex) ?? false
  // }

  return {
    passRequiredRule,
    passPhoneRule,
    passCmndRule,
    passMaxRule,
    passNumberRule
  }
}
