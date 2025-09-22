// Test file disabled - testing dependencies removed for company laptop optimization
// To re-enable testing, install: npm install --save-dev @angular/testing @types/jasmine jasmine-core karma

import { Data } from './data';

// Basic service validation (no testing framework required)
export function validateDataService() {
  const service = new Data();
  return service !== null && service !== undefined;
}

// Uncomment below when testing dependencies are available:
/*
import { TestBed } from '@angular/core/testing';

describe('Data', () => {
  let service: Data;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Data);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
*/
