import { TestBed } from '@angular/core/testing';

import { HeaderService } from './header.service';
import { MenuService } from './menu.service';
import {SessionService} from './session.service';
import {AuthGuard as AuthGuardTest} from 'src/app/core/guards/auth.guard';
import {AuthGuard} from 'src/app/core/guards/auth.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderService', () => {
  let service: HeaderService;

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
    service = TestBed.inject(HeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
