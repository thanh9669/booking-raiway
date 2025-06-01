export interface ADDRESS {
    provinces: PROVINCE[],
    districts: DISTRICT[],
    wards: WARD[]
}
export interface PROVINCE {
    id: string,
    name: string,
    type: string
}

export interface DISTRICT {
    id: string,
    name: string,
    type: string,
    province_id: string
}
export interface WARD {
    id: string,
    name: string,
    type: string,
    district_id: string
}

export interface InputType {
    name: string,
    value: string
}
export interface ReposeError {
    response: {
        data: {
          message: string
        }
    }
    code: string,
    error: string
}

export interface Repose {
    data: {
        data: {}
        message: string
    }
    status: number
    code: string,
    errors: string
}

export interface ConfigApi {
    [key: string]: string
    rootImage: string
}