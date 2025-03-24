import React from 'react'
import { useState } from 'react';
// import checkSolid from '../../assets/check-solid.svg'

const ShoppingCart = ({ onNext }) => {
    const [selectedShipping, setSelectedShipping] = useState("free-shipping");

    return (
        <div className="mx-[160px] my-[80px] flex justify-center">
            <div className="bg-white">
                <div className='w-[100%] flex justify-center'>
                    <div className='w-[832px] h-[166px] items-center flex flex-col gap-[40px]'>
                        <h1 className="text-[54px] leading-[58px] font-bold mb-4">Cart</h1>
                        <div className="flex items-center gap-[32px] mb-6">
                            <div >
                                <div className="flex items-center w-[256px]">
                                    <div className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full">1</div>
                                    <span className="ml-[17px] text-[16px]">Shopping cart</span>
                                </div>
                                <div className='mt-[26px] w-[100%] border-[1px] border-[solid] border-[black]'></div>
                            </div>
                            <div >
                                <div className="flex items-center w-[256px]">
                                    <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-white rounded-full">2</div>
                                    <span className="ml-[17px] text-[16px]">Checkout details</span>
                                </div>
                                <div className='mt-[26px]'></div>
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
                <div className='w-[1120px] my-[80px] flex gap-[80px]'>
                    <table className="w-[643px] bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-[#6C7275] flex">Product</th>
                                <th className="py-2 px-4 border-b border-[#6C7275]">Quantity</th>
                                <th className="py-2 px-4 border-b border-[#6C7275]">Price</th>
                                <th className="py-2 px-4 border-b border-[#6C7275]">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex">
                                        <img src="https://placehold.co/50x50" alt="Tray Table - Black" className="w-12 h-12 mr-4" />
                                        <div>
                                            <p>Tray Table</p>
                                            <p className="text-gray-500">Color: Black</p>
                                            <button className="text-red-500">
                                                <i className="fa-solid fa-xmark"></i>
                                                <span className='pl-2'>Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <div className='flex justify-center'>
                                        <div className="w-fit rounded-[6px] border-[1px] border-[#6C7275]">
                                            <button className="px-2 py-1">-</button>
                                            <span className="px-2">2</span>
                                            <button className="px-2 py-1">+</button>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <span className='flex justify-center'>$19.00</span>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <span className='flex justify-center font-bold'>$38.00</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex">
                                        <img src="https://placehold.co/50x50" alt="Tray Table - Red" className="w-12 h-12 mr-4" />
                                        <div>
                                            <p>Tray Table</p>
                                            <p className="text-gray-500">Color: Red</p>
                                            <button className="text-red-500">
                                                <i className="fa-solid fa-xmark"></i>
                                                <span className='pl-2'>Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <div className='flex justify-center'>
                                        <div className="w-fit rounded-[6px] border-[1px] border-[#6C7275]">
                                            <button className="px-2 py-1">-</button>
                                            <span className="px-2">2</span>
                                            <button className="px-2 py-1">+</button>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <span className='flex justify-center'>$19.00</span>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <span className='flex justify-center font-bold'>$38.00</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex">
                                        <img src="https://placehold.co/50x50" alt="Table Lamp - Gold" className="w-12 h-12 mr-4" />
                                        <div>
                                            <p>Table Lamp</p>
                                            <p className="text-gray-500">Color: Gold</p>
                                            <button className="text-red-500">
                                                <i className="fa-solid fa-xmark"></i>
                                                <span className='pl-2'>Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <div className='flex justify-center'>
                                        <div className="w-fit rounded-[6px] border-[1px] border-[#6C7275]">
                                            <button className="px-2 py-1">-</button>
                                            <span className="px-2">1</span>
                                            <button className="px-2 py-1">+</button>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <span className='flex justify-center'>$39.00</span>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <span className='flex justify-center font-bold'>$39.00</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="p-4 rounded-[6px] border-[1px] border-[#6C7275] w-[413px]">
                        <h2 className="text-xl font-bold mb-4">Cart summary</h2>

                        {/* Free Shipping */}
                        <div
                            className={`mb-[12px] flex items-center gap-2 p-[14px] border-2 rounded-md ${selectedShipping === "free-shipping" ? "border-black" : "border-gray-400"
                                }`}
                        >
                            <input
                                type="radio"
                                id="free-shipping"
                                name="shipping"
                                className="cursor-pointer"
                                checked={selectedShipping === "free-shipping"}
                                onChange={() => setSelectedShipping("free-shipping")}
                            />
                            <label htmlFor="free-shipping" className="flex-1 cursor-pointer">
                                Free shipping
                            </label>
                            <span>$0.00</span>
                        </div>

                        {/* Express Shipping */}
                        <div
                            className={`mb-[12px] flex items-center gap-2 p-[14px] border-2 rounded-md ${selectedShipping === "express-shipping" ? "border-black" : "border-gray-400"
                                }`}
                        >
                            <input
                                type="radio"
                                id="express-shipping"
                                name="shipping"
                                className="cursor-pointer"
                                checked={selectedShipping === "express-shipping"}
                                onChange={() => setSelectedShipping("express-shipping")}
                            />
                            <label htmlFor="express-shipping" className="flex-1 cursor-pointer">
                                Express shipping
                            </label>
                            <span>+$15.00</span>
                        </div>

                        {/* Pick Up */}
                        <div
                            className={`mb-[12px] flex items-center gap-2 p-[14px] border-2 rounded-md ${selectedShipping === "pick-up" ? "border-black" : "border-gray-400"
                                }`}
                        >
                            <input
                                type="radio"
                                id="pick-up"
                                name="shipping"
                                className="cursor-pointer"
                                checked={selectedShipping === "pick-up"}
                                onChange={() => setSelectedShipping("pick-up")}
                            />
                            <label htmlFor="pick-up" className="flex-1 cursor-pointer">
                                Pick Up
                            </label>
                            <span>+$21.00</span>
                        </div>

                        <div className="mt-2 mb-[32px] pt-2">
                            <div className="border-b flex justify-between py-[13px]">
                                <span>Subtotal</span>
                                <span>$1234.00</span>
                            </div>
                            <div className="flex justify-between font-bold py-[13px] text-[20px]">
                                <span>Total</span>
                                <span>$1345.00</span>
                            </div>
                        </div>

                        <button onClick={onNext} className="bg-black text-white w-full h-[48px] rounded-[8px] py-2 mt-4">Checkout</button>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-6">
                    <div>
                        <p className="mb-2 text-[20px]">Have a coupon?</p>
                        <p className='text-[#6C7275]'>Add your code for an instant cart discount</p>
                        <div className="flex mt-[16px]">
                            <input type="text" placeholder="Coupon Code" className="border border-[#6C7275] rounded-[8px] p-2 mr-2" />
                            <button className="bg-black text-white w-full h-[48px] rounded-[8px]">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart
