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
export enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    INTERNAL_SERVER_ERROR = 500,
  }
