import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTokenModalComponent } from './add-token-modal.component';

describe('AddTokenModalComponent', () => {
  let component: AddTokenModalComponent;
  let fixture: ComponentFixture<AddTokenModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTokenModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTokenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
