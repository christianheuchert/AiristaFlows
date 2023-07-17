import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFlowComponent } from './create-flow.component';

describe('CreateFlowComponent', () => {
  let component: CreateFlowComponent;
  let fixture: ComponentFixture<CreateFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFlowComponent]
    });
    fixture = TestBed.createComponent(CreateFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
