/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ElementoService } from './elemento.service';

describe('Service: Elemento', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElementoService]
    });
  });

  it('should ...', inject([ElementoService], (service: ElementoService) => {
    expect(service).toBeTruthy();
  }));
});
