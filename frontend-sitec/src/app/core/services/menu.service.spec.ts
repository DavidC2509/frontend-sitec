import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MenuService } from './menu.service';
import {HeaderService} from './header.service';
import {SessionService} from './session.service';
import {AuthGuard as AuthGuardTest} from 'src/app/core/guards/auth.guard';
import {AuthGuard} from 'src/app/core/guards/auth.guard';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ RouterTestingModule ],
      providers:[ MenuService, HeaderService, SessionService,
        {
          provide: AuthGuard,
          useClass: AuthGuardTest
        }
      ],
    });
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
