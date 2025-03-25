export interface MenuItem{
    name: string;
    img: string;
}
export interface Product {
    id: number;
    name: string;
    category: string;
    price: string;
    image_url: string;
}
export interface User {
    id: number;
    cpf: string;
    name: string;
    birth_date: Date;
}
