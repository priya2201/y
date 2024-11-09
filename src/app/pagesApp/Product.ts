export interface Product{
    _id?: string;
    title: string,
    details: { key: string; value: string }[]
    image: string;
    description: string;
    productAvailable: boolean;
    price: number;
    rating: number;
    categories: string[];
    tags: string[];
    colorOptions: { color: string; hex: string }[]
    size: 'S' | 'M' | 'L' | 'XL';
    launchDate: string;
    stockQuantiity:number
}