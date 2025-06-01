import validateMessage from '@/configs/validation_message'
import validateRules from '@/configs/validation_rule'
import { capitalizeFirstLetter } from '@/helpers/str'
export default {
    validate(rules: string[], context: EventTarget) {
        const validate = validateRules(context)
        const errors = validateMessage(context)
        let message = null
        for(let i = 0; i < rules.length; i++) {
            let ruleName = rules[i]
            const params = rules[i].split(":")
            if (params.length > 1) {
                ruleName = params[0]
            }
            const passRuleFunc = 'pass' + capitalizeFirstLetter(ruleName) + 'Rule'
            const errMessageFunc = ruleName + 'FailMessage'
            if (!validate[passRuleFunc](params)) { 
                message =  errors[errMessageFunc](params)
                break
            }
        }
        return message
    }
}