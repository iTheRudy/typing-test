import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCountDownComponent } from './main-count-down.component';

describe('MainCountDownComponent', () => {
  let component: MainCountDownComponent;
  let fixture: ComponentFixture<MainCountDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCountDownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCountDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
