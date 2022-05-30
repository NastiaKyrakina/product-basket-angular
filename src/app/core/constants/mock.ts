import { IShopProduct, ShopProduct } from '../../../models/products';

const JSON_MOCK = '{"data": [    {\n' +
  '        "amount": "20",\n' +
  '        "carbohydrates": "0",\n' +
  '        "category": "Яйця",\n' +
  '        "comp_name": "Яйця перепелині премія",\n' +
  '        "kcalAmount": "155",\n' +
  '        "fats": "11",\n' +
  '        "name": "Яйця перепелині",\n' +
  '        "price": "44,07",\n' +
  '        "proteins": "13",\n' +
  '        "shop_name": "Яйця перепелині (20 шт)",\n' +
  '        "unit": "шт"\n' +
  '    },\n' +
  '    {\n' +
  '        "amount": "10",\n' +
  '        "carbohydrates": 0.8,\n' +
  '        "category": "Яйця",\n' +
  '        "comp_name": "Яйця курячі с1 квочка",\n' +
  '        "kcalAmount": "160",\n' +
  '        "fats": "10",\n' +
  '        "name": "Яйця курячі",\n' +
  '        "price": "31,00",\n' +
  '        "proteins": "12",\n' +
  '        "shop_name": "Яйця курячі Квочка (С1 10 шт)",\n' +
  '        "unit": "шт"\n' +
  '    },\n' +
  '    {\n' +
  '        "amount": "10",\n' +
  '        "carbohydrates": 0.8,\n' +
  '        "category": "Яйця",\n' +
  '        "comp_name": "Яйця курячі ясенсвіт",\n' +
  '        "kcalAmount": "160",\n' +
  '        "fats": "10",\n' +
  '        "name": "Яйця курячі",\n' +
  '        "price": "33,63",\n' +
  '        "proteins": "12",\n' +
  '        "shop_name": "Яйця курячі Ясенсвіт (С1 10 шт)",\n' +
  '        "unit": "шт"\n' +
  '    },\n' +
  '    {\n' +
  '        "amount": "30",\n' +
  '        "carbohydrates": 0.8,\n' +
  '        "category": "Яйця",\n' +
  '        "comp_name": "Яйця курячі ясенсвіт",\n' +
  '        "kcalAmount": "160",\n' +
  '        "fats": "10",\n' +
  '        "name": "Яйця курячі",\n' +
  '        "price": "118,10",\n' +
  '        "proteins": "12",\n' +
  '        "shop_name": "Яйця курячі Ясенсвіт (С1 30 шт)",\n' +
  '        "unit": "шт"\n' +
  '    },\n' +
  '    {\n' +
  '        "amount": "450",\n' +
  '        "carbohydrates": 54,\n' +
  '        "category": "Хлібо-булочні продукти",\n' +
  '        "comp_name": "Батон молочний рум\'янець",\n' +
  '        "kcalAmount": 228,\n' +
  '        "fats": 1,\n' +
  '        "name": "Батон",\n' +
  '        "price": "18,90",\n' +
  '        "proteins": 8,\n' +
  '        "shop_name": "Батон Рум\'янець нарізка",\n' +
  '        "unit": "гр"\n' +
  '    },\n' +
  '    {\n' +
  '        "amount": "500",\n' +
  '        "carbohydrates": 54,\n' +
  '        "category": "Хлібо-булочні продукти",\n' +
  '        "comp_name": "Батон в нарізці київський київхліб",\n' +
  '        "kcalAmount": 267,\n' +
  '        "fats": 2,\n' +
  '        "name": "Батон",\n' +
  '        "price": "24,70",\n' +
  '        "proteins": 8,\n' +
  '        "shop_name": "Батон Київський Нарізний нарізка",\n' +
  '        "unit": "гр"\n' +
  '    },\n' +
  '    {\n' +
  '        "amount": "500",\n' +
  '        "carbohydrates": 54,\n' +
  '        "category": "Хлібо-булочні продукти",\n' +
  '        "comp_name": "Батон в нарізці київський київхліб",\n' +
  '        "kcalAmount": 267,\n' +
  '        "fats": 2,\n' +
  '        "name": "Батон",\n' +
  '        "price": "24,00",\n' +
  '        "proteins": 8,\n' +
  '        "shop_name": "Батон Київхліб Київський Нарізний",\n' +
  '        "unit": "гр"\n' +
  '    },\n' +
  '    {\n' +
  '        "amount": "500",\n' +
  '        "carbohydrates": 53,\n' +
  '        "category": "Хлібо-булочні продукти",\n' +
  '        "comp_name": "Батон нарізний дніпровський ",\n' +
  '        "kcalAmount": 275,\n' +
  '        "fats": 2,\n' +
  '        "name": "Батон пшеничний",\n' +
  '        "price": "10,40",\n' +
  '        "proteins": 8,\n' +
  '        "shop_name": "Батон Хлібодар Дніпровський пшеничний",\n' +
  '        "unit": "гр"\n' +
  '    },\n' +
  '    {\n' +
  '        "amount": "650",\n' +
  '        "carbohydrates": "49",\n' +
  '        "category": "Хлібо-булочні продукти",\n' +
  '        "comp_name": "Хліб пшеничний",\n' +
  '        "kcalAmount": "242",\n' +
  '        "fats": "4",\n' +
  '        "name": "Хліб пшеничний",\n' +
  '        "price": "22,70",\n' +
  '        "proteins": "11",\n' +
  '        "shop_name": "Хліб пшеничний",\n' +
  '        "unit": "гр"\n' +
  '    },\n' +
  '    {\n' +
  '        "amount": "600",\n' +
  '        "carbohydrates": "49",\n' +
  '        "category": "Хлібо-булочні продукти",\n' +
  '        "comp_name": "Хліб пшеничний",\n' +
  '        "kcalAmount": "242",\n' +
  '        "fats": "4",\n' +
  '        "name": "Хліб пшеничний",\n' +
  '        "price": "25,50",\n' +
  '        "proteins": "11",\n' +
  '        "shop_name": "Хліб пшеничний Цар Хліб нарізка",\n' +
  '        "unit": "гр"\n' +
  '    },\n' +
  '    {\n' +
  '        "amount": "950",\n' +
  '        "carbohydrates": "50",\n' +
  '        "category": "Хлібо-булочні продукти",\n' +
  '        "comp_name": "Хліб житній",\n' +
  '        "kcalAmount": "226",\n' +
  '        "fats": "0.7",\n' +
  '        "name": "Хліб житній",\n' +
  '        "price": "28,40",\n' +
  '        "proteins": "5",\n' +
  '        "shop_name": "Хліб житній Український Столичний",\n' +
  '        "unit": "гр"\n' +
  '    }]}';

export const PRODUCTS: IShopProduct[] = [];

// export function getProducts(): ShopProduct[] {
//   // const rawProducts = JSON.parse(JSON_MOCK);
//   // return rawProducts.data.map((rawProduct: IShopProduct) => new ShopProduct(rawProduct));
// }
