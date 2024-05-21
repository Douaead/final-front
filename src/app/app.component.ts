import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { StorageService } from './auth-services/storage-services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  logout() {
    StorageService.signout();
    this.router.navigateByUrl("/login");
    
    
    }
  title = 'pfeAngular';
  isAdminLoggedIn: boolean = false;
  isCustomerLoggedIn: boolean = false;
selectedOption: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialisation des états d'authentification
    this.updateLoginStates();
    
    // Abonnement aux événements du routeur
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Met à jour les états d'authentification lors de la navigation
        this.updateLoginStates();
      }
    });
  }

  // Méthode pour mettre à jour les états d'authentification
  updateLoginStates(): void {
    try {
      if (typeof localStorage !== 'undefined') {
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des états d\'authentification:', error);
    }
  }
  
}
