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
                <div className='w-[1120px] my-[80px] flex gap-[80px]'>
                    <button>Purchase History</button>
                </div>

            </div>
        </div>
    );
}

export default OrderComplete
