import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogreaderComponent } from './logreader.component';

describe('LogreaderComponent', () => {
  let component: LogreaderComponent;
  let fixture: ComponentFixture<LogreaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogreaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogreaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
