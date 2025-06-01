export interface PRODUCT_INVENTORY {
    product_id: number,
    name: string,
    quantity: number,
    price: number,
    unit: string,
    unit_cost: number,
    unit_text: string,
    total_amount: string,
    totalAmountText: string,
    productionDate: string,
    expirationDate: string,
    supplier_id: string
}
export interface RESULT_LIST_STOCK {
    total: number,
    limit: number,
    offset: number,
    data: PRODUCT_INVENTORY[]
}

export interface STOCK {
    notes: string,
    stock_date: string,
    receipt_date: string
}

export interface PRODUCT_SUPPLIER {
    address: string,
    contact_name: string,
    country: string,
    created_at:string,
    deleted:string,
    district_id: string,
    email: string,
    is_active: false
    name: string,
    phone_number: string,
    province_id: string,
    id: number,
    updated_at: string,
    ward_id: string,
}