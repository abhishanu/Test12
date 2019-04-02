import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {
    isUserLoggedIn: BehaviorSubject<Boolean> = new BehaviorSubject(false);
    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (!this.isUserLoggedIn.getValue()) {
            this.router.navigateByUrl('login');
            return false;
        }
        return true;
    }

    logout() {
        this.isUserLoggedIn.next(false);
        this.router.navigateByUrl('login');
    }

    // isPinCreated() {
    //   if ( this.commonService.getAppPin() !== undefined
    //       || this.commonService.getAppPin() !== null
    //       || this.commonService.getAppPin() !== '') {
    //     console.log('pin existed');
    //     this.isUserLoggedIn.next(true);
    //   } else {
    //     this.isUserLoggedIn.next(false);
    //   }
    // }
}
