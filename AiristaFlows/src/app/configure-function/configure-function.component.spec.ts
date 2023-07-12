import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureFunctionComponent } from './configure-function.component';

describe('ConfigureFunctionComponent', () => {
  let component: ConfigureFunctionComponent;
  let fixture: ComponentFixture<ConfigureFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureFunctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
