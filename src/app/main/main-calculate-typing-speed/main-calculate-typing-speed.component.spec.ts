import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCalculateTypingSpeedComponent } from './main-calculate-typing-speed.component';

describe('MainCalculateTypingSpeedComponent', () => {
  let component: MainCalculateTypingSpeedComponent;
  let fixture: ComponentFixture<MainCalculateTypingSpeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCalculateTypingSpeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCalculateTypingSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
