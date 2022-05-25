import React, {createContext, useContext, useState, useEffect} from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children})=> { 
    const [showCart, setshowCart] = useState(false);
    const [cartItems, setcartItems] = useState();
    const [totalPrice, settotalPrice] = useState();
    const [totalQuantities, settotalQuantities] = useState();
    const [qty, setQty] = useState(1);

    /**
     * If the product is already in the cart, then update the total price and total quantity, and
     * update the quantity of the product in the cart.
     * @param prodcut - the product that is being added to the cart
     * @param quanitity - the number of items the user wants to add to the cart
     */
    const onAdd = (prodcut, quanitity) => {
       const checkProductInCart  = cartItems.find((item) => item._id === product._id);

       if(checkProductInCart) {
            setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
            settotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

            const updatedCartItem =cartItems.map((cartProduct) => {
                if(cartProduct._id ===product._id) return{
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
       }
    }

    const incQty = () => {
        setQty((previousQty) => previousQty + 1);
    }

    const decQty = () => {setQty((previousQty) => { 
        if(previousQty- 1 < 1) return 1; 
        return previousQty - 1
    });}

    return(
        <Context.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
        }}>
            {children}
        </Context.Provider>
    )
}

/**
 * It returns the value of the Context object. Allows use to use our State like a Hook
 */
export const useStateContext = () => useContext(Context);