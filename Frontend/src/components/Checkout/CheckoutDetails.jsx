import React from 'react'

const CheckoutDetails = ({ onNext }) => {
    return (
        <div className="mx-[160px] my-[80px] flex justify-center">
            <div className="bg-white">
                <div className='w-[100%] flex justify-center'>
                    <div className='w-[832px] h-[166px] items-center flex flex-col gap-[40px]'>
                        <h1 className="text-[54px] leading-[58px] font-bold mb-4">Check Out</h1>
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
                                    <div className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full">2</div>
                                    <span className="ml-[17px] text-[16px]">Checkout details</span>
                                </div>
                                <div className='mt-[26px] w-[100%] border-[1px] border-[solid] border-[black]'></div>
                            </div>
                            <div >
                                <div className="flex items-center w-[256px]">
                                    <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-white rounded-full">3</div>
                                    <span className="ml-[17px] text-[16px]">Order complete</span>
                                </div>
                                <div className='mt-[26px]'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-[64px] mt-[80px]">
                    <div>
                        <div className='p-[24px] rounded-[4px] border-[1px] border-[#6C7275] w-[643px] mb-[16px]'>
                            <h2 className="text-xl font-bold mb-4 mt-[8px]">Contact Information</h2>
                            <div className="mb-4">
                                <input type="text" placeholder="First name" className="border rounded-[6px] p-2 w-full mb-2" />
                                <input type="text" placeholder="Last name" className="border rounded-[6px] p-2 w-full" />
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder="Phone number" className="border rounded-[6px] p-2 w-full" />
                            </div>
                            <div className="mb-4">
                                <input type="email" placeholder="Your Email" className="border rounded-[6px] p-2 w-full" />
                            </div>
                        </div>
                        <div className='p-[24px] rounded-[4px] border-[1px] border-[#6C7275] w-[643px] mb-[16px]'>
                            <h2 className="text-xl font-bold mb-4 mt-[8px]">Shipping Address</h2>
                            <div className="mb-4">
                                <input type="text" placeholder="Street Address" className="border rounded-[6px] p-2 w-full" />
                            </div>
                            <div className="mb-4">
                                <select className="border rounded-[6px] p-2 w-full">
                                    <option>Vietnam</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder="Town / City" className="border rounded-[6px] p-2 w-full" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <input type="text" placeholder="State" className="border rounded-[6px] p-2 w-full" />
                                <input type="text" placeholder="Zip Code" className="border rounded-[6px] p-2 w-full" />
                            </div>
                            <div className="mb-4">
                                <input type="checkbox" id="billing-address" className="mr-2" />
                                <label htmlFor="billing-address">Use a different billing address (optional)</label>
                            </div>
                        </div>
                        <div className='p-[24px] rounded-[4px] border-[1px] border-[#6C7275] w-[643px] mb-[16px]'>
                            <h2 className="text-xl font-bold mb-4 mt-[8px]">Payment method</h2>
                            <div className="mb-4">
                                <input type="radio" id="card" name="payment" className="mr-2" />
                                <label htmlFor="card">Pay by Card Credit</label>
                            </div>
                            <div className="mb-4">
                                <input type="radio" id="paypal" name="payment" className="mr-2" />
                                <label htmlFor="paypal">Paypal</label>
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder="Card Number" className="border rounded-[6px] p-2 w-full" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <input type="text" placeholder="MM/YY" className="border rounded-[6px] p-2 w-full" />
                                <input type="text" placeholder="CVC code" className="border rounded-[6px] p-2 w-full" />
                            </div>

                        </div>
                        <button onClick={onNext} className="bg-black text-white w-full h-[48px] rounded-[8px] py-2">Place Order</button>
                    </div>
                    <div className="p-4 rounded-[6px] border-[1px] border-[#6C7275] w-[413px] h-fit">
                        <h2 className="text-xl font-bold mb-4">Order summary</h2>
                        <div className="flex items-center my-4 pb-6 relative border-b">
                            <img src="https://placehold.co/50x50" alt="Tray Table - Black" className="w-12 h-12 mr-4" />
                            <div className='flex flex-col gap-[6px]'>
                                <p className='font-bold'>Tray Table</p>
                                <p className="text-gray-500">Color: Black</p>
                                <div className='flex items-center'>
                                    <div className="w-fit rounded-[6px] border-[1px] border-[#6C7275]">
                                        <button className="px-2 py-1">-</button>
                                        <span className="px-2">2</span>
                                        <button className="px-2 py-1">+</button>
                                    </div>
                                </div>
                            </div>
                            <span className="absolute right-0 top-0 font-bold">$38.00</span>
                        </div>
                        <div className="flex items-center my-4 pb-6 relative border-b">
                            <img src="https://placehold.co/50x50" alt="Tray Table - Red" className="w-12 h-12 mr-4" />
                            <div className='flex flex-col gap-[6px]'>
                                <p className='font-bold'>Tray Table</p>
                                <p className="text-gray-500">Color: Black</p>
                                <div className='flex items-center'>
                                    <div className="w-fit rounded-[6px] border-[1px] border-[#6C7275]">
                                        <button className="px-2 py-1">-</button>
                                        <span className="px-2">2</span>
                                        <button className="px-2 py-1">+</button>
                                    </div>
                                </div>
                            </div>
                            <span className="absolute right-0 top-0 font-bold">$38.00</span>
                        </div>
                        <div className="flex items-center my-4 pb-6 relative border-b">
                            <img src="https://placehold.co/50x50" alt="Table Lamp - Gold" className="w-12 h-12 mr-4" />
                            <div className='flex flex-col gap-[6px]'>
                                <p className='font-bold'>Table Lamp</p>
                                <p className="text-gray-500">Color: Gold</p>
                                <div className='flex items-center'>
                                    <div className="w-fit rounded-[6px] border-[1px] border-[#6C7275]">
                                        <button className="px-2 py-1">-</button>
                                        <span className="px-2">1</span>
                                        <button className="px-2 py-1">+</button>
                                    </div>
                                </div>
                            </div>
                            <span className="absolute right-0 top-0 font-bold">$38.00</span>
                        </div>
                        <div className="my-6 flex gap-[16px]">
                            <input type="text" placeholder="Input" className="border rounded-[6px] p-2 flex-1 h-[52px]" />
                            <button className="bg-black text-white w-[135px] h-[52px] rounded-[8px] py-2">Apply</button>
                        </div>
                        <div className="mb-4">
                            <p className="text-green-500">JankataWIN -$25.00 <button className="text-red-500">(Remove)</button></p>
                        </div>
                        <div className="border-t mt-2 pt-2">
                            <div className="flex justify-between pb-3 border-b">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between mt-2 pb-3 border-b">
                                <span>Subtotal</span>
                                <span>$99.00</span>
                            </div>
                            <div className="flex justify-between mt-2 pb-3 border-b font-bold">
                                <span>Total</span>
                                <span>$234.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutDetails
