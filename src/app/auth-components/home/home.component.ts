import { Component, Input, ViewChild } from '@angular/core';

import { MatSlider } from '@angular/material/slider';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { title } from 'process';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {



 


  showHiddenContent() {
    const hiddenContent = document.getElementById('hidden-content');
    const readMoreBtn = document.getElementById('read-more-btn');

    // Vérifiez si l'élément de contenu caché et le bouton "Read More" existent
    if (hiddenContent && readMoreBtn) {
      hiddenContent.style.display = 'block'; // Afficher le contenu caché
      readMoreBtn.style.display = 'none'; // Masquer le bouton "Read More"
    }
  }
  showContentAboutUs: boolean = false;
  showContentObjectives: boolean = false;
  
  // Définition de la fonction toggleContent avec un paramètre section pour identifier la section à afficher ou masquer
  toggleContent(section: string) {
      if (section === 'about-us') {
          // Basculer la valeur de showContentAboutUs entre true et false
          this.showContentAboutUs = !this.showContentAboutUs;
      } else if (section === 'objectives') {
          // Basculer la valeur de showContentObjectives entre true et false
          this.showContentObjectives = !this.showContentObjectives;
      }
    }

  search() {
    console.log('Recherche en cours...');
  }

  constructor(){
   
}
}
