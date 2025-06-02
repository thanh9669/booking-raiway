import newsModule from "./modules/news"
import authModule from "./modules/auth"
import userModule from "./modules/user"
import inventoryModule from "./modules/inventory"
import stockModule from "./modules/stock"
import productModule from "./modules/product"
import suppliersModule from "./modules/supplier"
import expenseModule from "./modules/expense"
import budgetModule from "./modules/budget"
import dialoguesModule from "./modules/dialogues"

const ModulesApi = () => {
    return {
        newsApi: newsModule,
        authApi: authModule,
        userApi: userModule,
        inventoryApi: inventoryModule,
        stockApi: stockModule,
        productApi: productModule,
        suppliersApi: suppliersModule,
        expenseApi: expenseModule,
        budgetApi: budgetModule,
        dialoguesApi: dialoguesModule
    }
}

export default ModulesApi