export interface NewsModel {
    id: number,
    status: string,
    process: string,
    title: string
    views: number,
    category: NewsCategoryModel,
}
export interface NewsCategoryModel {
    name: string,
    id: number
}

export interface NewsModelDetail {
    id: number,
    title: string
    category_id: number,
    banner: File,
    time_start: string,
    time_end: string,
    content: string
}
export type NewsType = {
    title: string,
    category_id: string,
    content: string,
    id: 0,
    images: string,
    start: 0,
    status: 0,
    time_end: string,
    time_start: string,
    user_id: string,
    views: 0,
    province_id: string,
    district_id: string,
    ward_id: string,
    address: string,
    time_come: string,
    things_improve: string,
    banner: string,
    basic_information: string,
    way_to_moving: string,
}

export const NewsDefault: NewsType = {
    category_id: "",
    content: "",
    id: 0,
    images: "",
    start: 0,
    status: 0,
    time_end: "",
    time_start: "",
    title: "",
    user_id: "",
    views: 0,
    province_id: '',
    district_id: '',
    ward_id: '',
    address: '',
    time_come: '',
    things_improve: '',
    banner: '',
    basic_information: '',
    way_to_moving: '',
}
