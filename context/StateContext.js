import React, {createContext, useContext, useState, useEffect} from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children})=> { 
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    /**
     * If the product is already in the cart, then update the total price and total quantity, and
     * update the quantity of the product in the cart.
     * @param prodcut - the product that is being added to the cart
     * @param quantity - the number of items the user wants to add to the cart
     */
    const onAdd = (product, quantity) => {
       const checkProductInCart  = cartItems.find((item) => item._id === product._id);

       setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
       setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

       if(checkProductInCart) {
            const updatedCartItem =cartItems.map((cartProduct) => {
                if(cartProduct._id ===product._id) return{
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, {...product}]);
       }
       toast.success(`${qty} ${product.name} added to the cart.`);
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
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
        }}>
            {children}
        </Context.Provider>
    )
}

/**
 * It returns the value of the Context object. Allows use to use our State like a Hook
 */
export const useStateContext = () => useContext(Context);