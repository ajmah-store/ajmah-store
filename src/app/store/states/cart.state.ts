import { State, Selector, Action, StateContext } from "@ngxs/store";
import { AddToCart, RemoveFromCart, ChangeCount } from "../actions/cart.actions";
import { Dictionary } from "@arjunatlast/jsds";
import { CartSlot } from "../../models/cart-slot.model";

export interface CartStateModel {
    cart: Dictionary<CartSlot>
}

@State<CartStateModel>({
    name: 'cart',
    defaults: {
        cart: new Dictionary()
    }
})
export class CartState {

    @Selector()
    static getCart(state: CartStateModel) {
        return state.cart
    }

    @Action(AddToCart)
    addToCart(ctx: StateContext<CartStateModel>, {product, quantity}: AddToCart) {

        const cart = ctx.getState().cart;

        if(cart.containsKey(product.id)) cart.get(product.id).quantity += quantity;

        else cart.put(product.id, {product: product, quantity: quantity});

        ctx.patchState({
            cart: cart
        });
    }

    @Action(RemoveFromCart)
    removeFromCart(ctx: StateContext<CartStateModel>, {key}: RemoveFromCart) {

        const cart = ctx.getState().cart;
        cart.remove(key);

        ctx.patchState({
            cart: cart
        });

    }

    @Action(ChangeCount)
    changeCount(ctx: StateContext<CartStateModel>, {key, count}: ChangeCount) {

        const cart = ctx.getState().cart;

        if(!cart.containsKey(key)) throw new Error('Product does not exist in cart');

        const slot = cart.get(key);

        slot.quantity += count;

        if(slot.quantity <= 0) cart.remove(key);

        ctx.patchState({
            cart: cart
        });

    }
}