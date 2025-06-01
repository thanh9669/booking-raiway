export interface EXPENSE_CATEGORY {
    id: number, 
    name: string, 
    icon: string,
    is_default: number,
    parent_id: number
}

export interface EXPENSE {
  id?: number;
  date?: string;
  category?: EXPENSE_CATEGORY;
  amount: number;
  description?: string;
  category_id: number;
  note?: string;
}

export interface EXPENSE_MONTHLY {
  date: string,
  amount: number
}
