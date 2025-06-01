export interface PAGINATIONS {
    limit: number,
    offset: number,
    total: number,
    page_current: number
}

export interface Reponse {
    status: number, 
    data: any
}