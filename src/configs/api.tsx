import { ConfigApi } from '@/types/index';

const Api: ConfigApi = {
    rootApi: "127.0.0.1",
    rootImage: process.env.BACKEND_HOST ?? "http://127.0.0.1:8001/"
}

export default Api