import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearClaveComponent } from './crear-clave.component';

describe('CrearClaveComponent', () => {
  let component: CrearClaveComponent;
  let fixture: ComponentFixture<CrearClaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearClaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
