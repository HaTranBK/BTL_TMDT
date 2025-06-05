import React from 'react'
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const OrderComplete = () => {
    const [cart, setCart] = useState([]);
    const [totalCart, setTotalCart] = useState(0);
    const [loading, setLoading] = useState(true);

    // Generate a random order code like #XXXX_YYYYY
    const generateOrderCode = () => {
        const part1 = Math.floor(1000 + Math.random() * 9000); // 4 digits
        const part2 = Math.floor(10000 + Math.random() * 90000); // 5 digits
        return `#${part1}_${part2}`;
    };

    const orderCode = generateOrderCode();

    const formatNumber = (num) => {
        if (typeof num !== "number") num = Number(num);
        return num.toLocaleString('vi-VN');
    };

    const formattedDate = dayjs().format('MMMM D, YYYY');

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        const token = localStorage.getItem('token');
        const orderId = localStorage.getItem('latestOrderId');
        try {
            const response = await fetch(`https://be-tm-t.onrender.com/Orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setCart(data.data.Products);
            setTotalCart(data.data.total_price);
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div role="status">
                <svg aria-hidden="true" class="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    );

    return (
        <div className="mx-[160px] my-[80px] flex justify-center">
            <div className="bg-white">
                <div className='w-[100%] flex justify-center'>
                    <div className='w-[832px] h-[166px] items-center flex flex-col gap-[40px]'>
                        <h1 className="text-[54px] leading-[58px] font-bold mb-4">Complete!</h1>
                        <div className="flex items-center gap-[32px] mb-6">
                            <div >
                                <div className="flex items-center w-[256px]">
                                    <div className="flex items-center justify-center w-8 h-8 bg-[#45B26B] text-white rounded-full">
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <span className="ml-[17px] text-[16px] text-[#45B26B]">Shopping cart</span>
                                </div>
                                <div className='mt-[26px] w-[100%] border-[1px] border-[solid] border-[#45B26B]'></div>
                            </div>
                            <div >
                                <div className="flex items-center w-[256px]">
                                    <div className="flex items-center justify-center w-8 h-8 bg-[#45B26B] text-white rounded-full">
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <span className="ml-[17px] text-[16px] text-[#45B26B]">Checkout details</span>
                                </div>
                                <div className='mt-[26px] w-[100%] border-[1px] border-[solid] border-[#45B26B]'></div>
                            </div>
                            <div >
                                <div className="flex items-center w-[256px]">
                                    <div className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full">3</div>
                                    <span className="ml-[17px] text-[16px]">Order complete</span>
                                </div>
                                <div className='mt-[26px] w-[100%] border-[1px] border-[solid] border-[black]'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-center mt-[80px]'>
                    <div className="bg-white p-8 rounded-[8px] shadow-lg w-[738px] text-center">
                        <h1 className="text-3xl text-[#6C7275] font-medium mb-4">Thank you! 🎉</h1>
                        <h2 className="text-4xl font-medium mb-12">Your order has been received</h2>
                        <div className="flex justify-center space-x-4 mb-10">
                            {cart.map((item) => (
                                <div key={item.id} className="relative">
                                    <img src={item.image} alt="Black side table" className="w-24 h-24 object-cover rounded-md" />
                                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">{item.OrderProduct.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-center'>
                            <div className="text-left mb-10  w-[268px]">
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">Order code:</span>
                                    <span>{orderCode}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">Date:</span>
                                    <span>{formattedDate}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">Total:</span>
                                    <span>{formatNumber(totalCart)}VND</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">Payment method:</span>
                                    <span>Credit Card</span>
                                </div>
                            </div>
                        </div>
                        <button className="bg-black w-[203px] h-[52px] text-white py-2 px-4 rounded-full">Purchase history</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderComplete
