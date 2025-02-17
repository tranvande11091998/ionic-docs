import { Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthService implements CanActivate {
    constructor( private router: Router, private user: UserService ) {

    }

    async canActivate(route) {
        if (await this.user.isAuthenicated()) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
