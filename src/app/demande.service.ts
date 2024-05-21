import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  getPostedCategories: any;
  getApprovedAndPostedCategory(categoryId: number) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
