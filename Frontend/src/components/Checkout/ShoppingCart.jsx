import React from 'react'
import { useState, useEffect } from 'react';
// import checkSolid from '../../assets/check-solid.svg'

const ShoppingCart = ({ onNext }) => {
    const [selectedShipping, setSelectedShipping] = useState("free-shipping");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingFee, setShippingFee] = useState(0);

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
        fetchShippingOptions();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await fetch("https://673760e4aafa2ef222339c88.mockapi.io/cart"); // Thay URL API thực tế
            const data = await response.json();
            setCart(data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (id, newQuantity) => {
        try {
            await fetch(`https://673760e4aafa2ef222339c88.mockapi.io/cart/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantity: newQuantity })
            });

            // Cập nhật state sau khi gọi API thành công
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleIncrease = (id, currentQuantity) => {
        const newQuantity = currentQuantity + 1;
        updateQuantity(id, newQuantity);
    };

    const handleDecrease = (id, currentQuantity) => {
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            updateQuantity(id, newQuantity);
        }
    };

    const calculateSubtotal = (price, quantity) => {
        return (parseFloat(price) * quantity).toFixed(2); // Giữ 2 chữ số thập phân
    };

    const cartSubTotal = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);

    const fetchShippingOptions = async () => {
        try {
            const response = await fetch("https://673760e4aafa2ef222339c88.mockapi.io/shipping-fee"); // Thay URL API thực tế
            const data = await response.json();
            setShippingOptions(data);

            // Lấy phí vận chuyển của phương thức mặc định ban đầu
            const defaultShipping = data.find(option => option.id === "free-shipping");
            setShippingFee(defaultShipping ? parseFloat(defaultShipping.fee) : 0);
        } catch (error) {
            console.error("Error fetching shipping options:", error);
        }
    };

    const handleShippingChange = (id, fee) => {
        setSelectedShipping(id);
        setShippingFee(parseFloat(fee));
    };

    const totalPay = (parseFloat(cartSubTotal) + shippingFee).toFixed(2);

    if (loading) return <p>Loading cart...</p>;

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
                            {cart.map((item) => (
                                <tr key={item.id}>
                                    <td className="py-2 px-4 border-b">
                                        <div className="flex">
                                            <img src={item.image} alt="Tray Table - Black" className="w-12 h-auto mr-4 object-contain" />
                                            <div>
                                                <p>{item.name}</p>
                                                <p className="text-gray-500">{item.variant}</p>
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
                                                <button onClick={() => handleDecrease(item.id, item.quantity)} className="px-2 py-1">-</button>
                                                <span className="px-2">{item.quantity}</span>
                                                <button onClick={() => handleIncrease(item.id, item.quantity)} className="px-2 py-1">+</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <span className='flex justify-center'>${item.price}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <span className='flex justify-center font-bold'>${calculateSubtotal(item.price, item.quantity)}</span>
                                    </td>
                                </tr>
                            ))}
                            {/* < tr >
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
                            </tr> */}
                        </tbody>
                    </table>
                    <div className="p-4 rounded-[6px] border-[1px] border-[#6C7275] w-[413px]">
                        <h2 className="text-xl font-bold mb-4">Cart summary</h2>

                        {/* Free Shipping */}
                        {shippingOptions.map(option => (
                            <div
                                key={option.id}
                                className={`mb-[12px] flex items-center gap-2 p-[14px] border-2 rounded-md ${selectedShipping === option.id ? "border-black" : "border-gray-400"}`}
                            >
                                <input
                                    type="radio"
                                    id={option.id}
                                    name="shipping"
                                    className="cursor-pointer"
                                    checked={selectedShipping === option.id}
                                    onChange={() => handleShippingChange(option.id, option.fee)}
                                />
                                <label htmlFor={option.id} className="flex-1 cursor-pointer">
                                    {option.name}
                                </label>
                                <span>+${option.fee}</span>
                            </div>
                        ))}

                        {/* Express Shipping */}
                        {/* <div
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
                        </div> */}

                        {/* Pick Up */}
                        {/* <div
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
                        </div> */}

                        <div className="mt-2 mb-[32px] pt-2">
                            <div className="border-b flex justify-between py-[13px]">
                                <span>Subtotal</span>
                                <span>${cartSubTotal}</span>
                            </div>
                            <div className="flex justify-between font-bold py-[13px] text-[20px]">
                                <span>Total</span>
                                <span>${totalPay}</span>
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
        </div >
    );
}

export default ShoppingCart
