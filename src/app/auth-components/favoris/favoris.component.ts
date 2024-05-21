import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavorisService } from './favoris-services/favoris.service';
import { EmploiService } from '../emploi/emploi-services/emploi.service';
import { Maroc } from '../../maroc.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css'] // Correction de l'attribut styleUrls
})
export class FavorisComponent implements OnInit, OnDestroy {
  jobs: any[] = []; // Tableau pour stocker les annonces
  favorites: any[] = []; // Tableau pour stocker les favoris
  subscription: Subscription = new Subscription();
  annouces: any[] = [];
  marocList: Maroc[] = [];

  constructor(private favorisService: FavorisService, private emploiService: EmploiService) {}

  toggleFavorite(job: any): void {
    this.favorisService.toggleFavorite(job); // Appeler la fonction toggleFavorite du service
    this.favorites = this.favorisService.getFavorites(); // Mettre à jour la liste des favoris
  }
  
  ngOnInit(): void {
    this.favorites = this.favorisService.getFavorites(); // Récupérer les favoris du service
    this.fetchMaroc();
    this.fetchJobs();
    this.fetchAnnouces();
  }
  
  fetchMaroc(): void {
    this.subscription.add(
      this.emploiService.scrapeMaroc().subscribe({
        next: (data: Maroc[]) => {
          this.marocList = data;
        },
        error: (error) => {
          console.error('Une erreur est survenue lors de la récupération des annonces Maroc : ', error);
        }
      })
    );
  }

  fetchJobs(): void {
    this.subscription.add(
      this.emploiService.getJobs().subscribe({
        next: (data: any[]) => {
          this.jobs = data;
        },
        error: (error) => {
          console.error('Une erreur est survenue lors de la récupération des annonces d\'emploi : ', error);
        }
      })
    );
  }

  fetchAnnouces(): void {
    this.subscription.add(
      this.emploiService.scrapeIn().subscribe({
        next: (data: any[]) => {
          this.annouces = data;
        },
        error: (error) => {
          console.error('Une erreur est survenue lors de la récupération des annonces d\'emploi : ', error);
        }
      })
    );
  }
  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
