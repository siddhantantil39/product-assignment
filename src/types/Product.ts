import { Image } from "./Image";
import { Variant } from "./Variant";

export interface Product {
    id: string;
    title: string;
    variants?: Variant[];
    image: Image;
    selected: boolean;
    partial: boolean;

}