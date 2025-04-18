import { DeliveryItem } from "./delivery_item";

export interface Deliveries {
    id: number;
    name: string;
    lname: string;
    delivery_status: string;
    paid_on: string;
    country: string;
    state: string;
    address: string;
    items: DeliveryItem[];
  }