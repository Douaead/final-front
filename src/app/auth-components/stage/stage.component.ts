// src/app/components/stage/stage.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Maroc } from '../../maroc.model';
import { EmploiService } from '../emploi/emploi-services/emploi.service';
import { FavorisService } from '../favoris/favoris-services/favoris.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit, OnDestroy {
  jobs: any[];
  annouces: any[];
  marocList: Maroc[];
  filteredMarocList: Maroc[];
  subscription: Subscription = new Subscription();
  titleSearch: string = '';
  citySearch: string = '';

  constructor(private emploiService: EmploiService, private favorisService: FavorisService) {}

  ngOnInit(): void {
    this.fetchMaroc();

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

  fetchMaroc(): void {
    this.subscription.add(
      this.emploiService.scrapeMaroc().subscribe({
        next: (data: Maroc[]) => {
          this.marocList = data;
          this.applyFilters();
        },
        error: (error) => {
          console.error('Une erreur est survenue lors de la récupération des annonces Maroc : ', error);
        }
      })
    );
  }

  applyFilters(): void {
    this.filteredMarocList = this.marocList.filter(maroc => {
      return (!this.titleSearch || maroc.title.toLowerCase().includes(this.titleSearch.toLowerCase())) &&
             (!this.citySearch || maroc.city.toLowerCase().includes(this.citySearch.toLowerCase()));
    });
  }

  toggleFavorite(job: any) {
    this.favorisService.toggleFavorite(job);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(): void {
    this.applyFilters();
  }
}
