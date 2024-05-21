import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {
  private STORAGE_KEY = 'favorites';
  private favorites: string[] = [];

  constructor() {
    // Récupérer les favoris du stockage local lors de l'initialisation du service
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  toggleFavorite(jobId: string) {
    const index = this.favorites.indexOf(jobId);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(jobId);
    }
    // Mettre à jour les favoris dans le stockage local
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  getFavorites(): string[] {
    return this.favorites;
  }
}