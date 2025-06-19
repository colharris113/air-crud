import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShopItemCategory } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3456/api/category';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<ShopItemCategory[]> {
    return this.http.get<ShopItemCategory[]>(this.apiUrl);
  }

  getCustomer(id: number): Observable<ShopItemCategory> {
    return this.http.get<ShopItemCategory>(`${this.apiUrl}/${id}`);
  }

  createCustomer(category: Omit<ShopItemCategory, 'id'>): Observable<ShopItemCategory> {
    return this.http.post<ShopItemCategory>(this.apiUrl, category);
  }

  updateCustomer(id: number, category: Partial<ShopItemCategory>): Observable<ShopItemCategory> {
    return this.http.put<ShopItemCategory>(`${this.apiUrl}/${id}`, category);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
