import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerInputComponent } from './trigger-input.component';

describe('TriggerInputComponent', () => {
  let component: TriggerInputComponent;
  let fixture: ComponentFixture<TriggerInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriggerInputComponent]
    });
    fixture = TestBed.createComponent(TriggerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
