import { PurchaseItem } from "./purchase_item";

export interface Purchase {
  id: number;
  total_paid: number;
  paid_on: string;
  payment_method: string;
  delivery_status: string;
  vip: string;
  rating: number;
  items: PurchaseItem[];
}