import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.css']
})
export class ShareModalComponent implements OnInit {
  @Input() jobLink: string;
  @Output() close: EventEmitter<void> = new EventEmitter<void>(); // Déclaration de l'événement de sortie close
  facebookShareUrl: string;
  twitterShareUrl: string;
  linkedinShareUrl: string;

  ngOnInit(): void {
    this.facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.jobLink)}`;
    this.twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.jobLink)}`;
    this.linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(this.jobLink)}`;
  }

  closeModal() {
    this.close.emit(); // Émission de l'événement close lors de la fermeture de la modalité
  }
}
