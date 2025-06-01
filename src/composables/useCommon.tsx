import { store } from '@/stores'
import { setIsValidate } from '@/stores/employer'
export const useCommon = () => {
    const sendSubmit = async  () => {
        await store.dispatch(setIsValidate({ validate: true }))
    }
    return {
        sendSubmit,
    };
};