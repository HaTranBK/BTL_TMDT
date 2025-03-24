import React from 'react'
import { useState } from 'react';
import ShoppingCart from '../components/Checkout/ShoppingCart';
import CheckoutDetails from '../components/Checkout/CheckoutDetails';
import OrderComplete from '../components/Checkout/OrderComplete';

const Checkout = () => {
    const [step, setStep] = useState('shopping-cart');

    const handleNextStep = () => {
        if (step === 'shopping-cart') setStep('checkout-details');
        else if (step === 'checkout-details') setStep('order-complete');
    };

    return (
        <>
        {step === 'shopping-cart' && <ShoppingCart onNext={handleNextStep} />}
        {step === 'checkout-details' && <CheckoutDetails onNext={handleNextStep} />}
        {step === 'order-complete' && <OrderComplete onNext={handleNextStep} />}
        </>
    );
};

export default Checkout
