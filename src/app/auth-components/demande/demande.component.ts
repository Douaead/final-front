import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../modules/admin/admin-services/admin.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../category.model';
import { DemandeService } from './demande-services/demande.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrl: './demande.component.css'
})
export class DemandeComponent implements OnInit {
  postedCategories: Category[] = [];
  categories: any = [];

  constructor(private demandeService: DemandeService) { }

  ngOnInit(): void {
    this.loadApprovedAndPostedCategories();
  }
  loadApprovedAndPostedCategories() {
    this.demandeService.getApprovedAndPostedCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    });
  }
  
  
}  