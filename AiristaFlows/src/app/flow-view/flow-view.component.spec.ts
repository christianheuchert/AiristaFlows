import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowViewComponent } from './flow-view.component';

describe('FlowViewComponent', () => {
  let component: FlowViewComponent;
  let fixture: ComponentFixture<FlowViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
