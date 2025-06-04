import React from 'react'
import { useState } from 'react';
import ShoppingCart from '../components/Checkout/ShoppingCart';
import CheckoutDetails from '../components/Checkout/CheckoutDetails';
import OrderComplete from '../components/Checkout/OrderComplete';

const Checkout = () => {
    // localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0OTA0Nzg0MiwiZXhwIjoxNzQ5MTM0MjQyfQ.J2CFsVv2XB2WinPowLcsby10YSrhoI7nAJtLQ1gB_iQ');

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