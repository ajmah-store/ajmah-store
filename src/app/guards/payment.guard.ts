import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { first, map } from 'rxjs/operators';
import { ArrayList } from '@arjunatlast/jsds';
import { CartSlot } from '../models/cart-slot.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentGuard implements CanActivate {
  
  constructor(
    private cart: CartService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {


    return this.cart.getCart().pipe(

      map(

        (items: ArrayList<CartSlot>) => {

          if(items.isEmpty()) this.router.navigate(['store']);

          return !!items;
        }

      ),

      first(c => c !== undefined)
    );

  }
  
}
