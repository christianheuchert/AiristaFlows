import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureTriggerComponent } from './configure-trigger.component';

describe('ConfigureTriggerComponent', () => {
  let component: ConfigureTriggerComponent;
  let fixture: ComponentFixture<ConfigureTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureTriggerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
