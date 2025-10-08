import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsRepository{
    private  products = [
        {id: 1, name: 'camisa', description: 'camisa social', price: 50, stock: 10, imgUrl: 'https://example.com/camisa.jpg'},
        {id: 2, name: 'calça', description: 'calça jeans', price: 80, stock: 15, imgUrl: 'https://example.com/calca.jpg'},
        {id: 3, name: 'tênis', description: 'tênis esportivo', price: 120, stock: 20, imgUrl: 'https://example.com/tenis.jpg'},
    ]

    getProducts(){
        return this.products;
    }
}