import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmploiService } from './emploi-services/emploi.service';
import { Subscription } from 'rxjs';
import { Maroc } from '../../maroc.model';
import { FavorisService } from '../favoris/favoris-services/favoris.service';

@Component({
  selector: 'app-emploi',
  templateUrl: './emploi.component.html',
  styleUrls: ['./emploi.component.css']
})

export class EmploiComponent implements OnInit, OnDestroy {
  jobs: any[] = [];
  subscription: Subscription;
  marocList: Maroc[];
  titleSearch: string;
  citySearch: string;

  constructor(private emploiService: EmploiService, private favorisService: FavorisService) { }

  ngOnInit(): void {
    // Initialiser les valeurs de recherche
    this.titleSearch = '';
    this.citySearch = '';

    // Charger les annonces initiales
    this.fetchJobs();

    // Charger les annonces du Maroc
    this.fetchMaroc();
  }

  fetchJobs(): void {
    this.subscription = this.emploiService.getJobs(this.titleSearch, this.citySearch).subscribe({
      next: (data: any[]) => {
        this.jobs = data;
      },
      error: (error) => {
        console.error('Une erreur est survenue lors de la récupération des annonces d\'emploi : ', error);
      }
    });
  }

  fetchMaroc(): void {
    this.subscription = this.emploiService.scrapeMaroc().subscribe({
      next: (data: Maroc[]) => {
        this.marocList = data;
      },
      error: (error) => {
        console.error('Une erreur est survenue lors de la récupération des annonces Maroc : ', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleFavorite(job: any) {
    this.favorisService.toggleFavorite(job);
  }

  search(): void {
    this.fetchJobs();
  }
}
