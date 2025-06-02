import { ConfigApi } from '@/types/index';

const Api: ConfigApi = {
    rootApi: "127.0.0.1",
    rootImage: process.env.BACKEND_HOST ?? "https://base-golang-wz41.onrender.com/"
}

export default Api