import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShopItem } from '../models/shop-item.model';

@Injectable({
  providedIn: 'root'
})
export class ShopItemService {
  private apiUrl = 'http://localhost:3456/api/shop-item';

  constructor(private http: HttpClient) { }

  getShopItems(): Observable<ShopItem[]> {
    return this.http.get<ShopItem[]>(this.apiUrl);
  }

  getShopItem(id: number): Observable<ShopItem> {
    return this.http.get<ShopItem>(`${this.apiUrl}/${id}`);
  }

  createShopItem(shopitem: Omit<ShopItem, 'id'>): Observable<ShopItem> {
    return this.http.post<ShopItem>(this.apiUrl, shopitem);
  }

  updateShopItem(id: number, shopitem: Partial<ShopItem>): Observable<ShopItem> {
    return this.http.put<ShopItem>(`${this.apiUrl}/${id}`, shopitem);
  }

  deleteShopItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
