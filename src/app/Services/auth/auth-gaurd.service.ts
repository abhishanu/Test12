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
            this.router.navigate(['login']);
            return false;
        }
        return true;
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
