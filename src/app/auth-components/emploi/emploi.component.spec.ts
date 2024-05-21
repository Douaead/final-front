import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmploiComponent } from './emploi.component';
import { MatFormFieldModule } from '@angular/material/form-field'; // Importez le module MatFormFieldModule

describe('EmploiComponent', () => {
  let component: EmploiComponent;
  let fixture: ComponentFixture<EmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmploiComponent],
      imports: [MatFormFieldModule] // Ajoutez MatFormFieldModule aux imports
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
