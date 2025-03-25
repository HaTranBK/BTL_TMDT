import React from 'react'

const OrderComplete = () => {
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
                            <div className="relative">
                                <img src="https://placehold.co/100x100" alt="Black side table" className="w-24 h-24 object-cover rounded-md" />
                                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">2</span>
                            </div>
                            <div className="relative">
                                <img src="https://placehold.co/100x100" alt="Red side table" className="w-24 h-24 object-cover rounded-md" />
                                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">2</span>
                            </div>
                            <div className="relative">
                                <img src="https://placehold.co/100x100" alt="Lamp" className="w-24 h-24 object-cover rounded-md" />
                                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">1</span>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <div className="text-left mb-10  w-[268px]">
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">Order code:</span>
                                    <span>#0123_45678</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">Date:</span>
                                    <span>October 19, 2023</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">Total:</span>
                                    <span>$1,345.00</span>
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
