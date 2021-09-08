interface RequestModel {
    shops: Shops;
    products: Products;
}

interface Shops {
    amazon: URL;
    magazine_luiza: URL;
    americanas: URL;
    casas_bahia: URL;
    zoom: URL;
}

interface URL {
    url: string;
}

interface Products {
    eletronic: [{
        name: string;
    }];
}
