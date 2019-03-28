import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRankPage } from './team-rank.page';

describe('TeamRankPage', () => {
  let component: TeamRankPage;
  let fixture: ComponentFixture<TeamRankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamRankPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamRankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
