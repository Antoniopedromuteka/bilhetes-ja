import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from '../../../domain/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements ICategoryService {
  private http = inject(HttpClient)
  private readonly API_URL = environment.API_PUBLIC_URL;

  constructor() { }
  createCategory(category: registerCategoryPayload): Observable<Category> {
    return this.http.post(this.API_URL + '/Category', category) as Observable<Category>;
  }
  updateCategory(category: updateCategoryPayload): Observable<Category> {
    return this.http.put(this.API_URL + `/Category/${category.id}`, category) as Observable<Category>;
  }
  deleteCategory(categoryId: number): Observable<Category> {
    return this.http.delete(this.API_URL + `/Category/${categoryId}`) as Observable<Category>;
  }
  getCategories(): Observable<Category[]> {
    return this.http.get(this.API_URL + '/Category') as Observable<Category[]>;
  }

  getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get(this.API_URL + `/Category/${categoryId}`) as Observable<Category>;
  }

}


interface ICategoryService {
  createCategory(category: registerCategoryPayload): Observable<Category>;
  updateCategory(category: updateCategoryPayload): Observable<Category>;
  deleteCategory(categoryId: number): Observable<Category>;
  getCategories(): Observable<Category[]>;
  getCategoryById(categoryId: number): Observable<Category>;
}


type registerCategoryPayload = {
  name: string;
  iconUrl: string
};

type updateCategoryPayload = {
  id: number;
  name: string;
  iconUrl: string
};

