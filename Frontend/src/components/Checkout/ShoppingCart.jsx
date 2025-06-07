import React from 'react'
import { useState, useEffect } from 'react';


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
        const token = localStorage.getItem('token');
        try {
            setLoading(true);
            const response = await fetch(`https://be-tm-t.onrender.com/carts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setCart(data.data.cart.Products);
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleIncrease = async (id, currentQuantity) => {
        const token = localStorage.getItem('token');
        const newQuantity = currentQuantity + 1;
        try {
            await fetch(`https://be-tm-t.onrender.com/carts`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId: id,
                    quantity: 1,
                })
            });

            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (error) {
            console.error("Error increasing quantity:", error);
        }
    };

    const handleDecrease = async (id, currentQuantity) => {
        const token = localStorage.getItem('token');
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            try {
                await fetch(`https://be-tm-t.onrender.com/carts/${id}`, {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ quantity: 1 })
                });

                setCart(prevCart =>
                    prevCart.map(item =>
                        item.id === id ? { ...item, quantity: newQuantity } : item
                    )
                );
            } catch (error) {
                console.error("Error decreasing quantity:", error);
            }
        }
    };

    const handleDeleteProduct = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await fetch(`https://be-tm-t.onrender.com/carts/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            setCart(prevCart => prevCart.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const formatNumber = (num) => {
        if (typeof num !== "number") num = Number(num);
        return num.toLocaleString('vi-VN');
    };

    const calculateSubtotal = (price, quantity) => {
        return (parseFloat(price) * quantity); // Giữ 2 chữ số thập phân
    };

    const cartSubTotal = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

    const fetchShippingOptions = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://673760e4aafa2ef222339c88.mockapi.io/shipping-fee");
            const data = await response.json();
            setShippingOptions(data);

            // Lấy phí vận chuyển của phương thức mặc định ban đầu
            setShippingFee(0);
        } catch (error) {
            console.error("Error fetching shipping options:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleShippingChange = (id, fee) => {
        setSelectedShipping(id);
        setShippingFee(parseFloat(fee));
    };

    const totalPay = (parseFloat(cartSubTotal) + shippingFee);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div role="status">
                <svg aria-hidden="true" className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );

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
                                                <p
                                                    className="max-w-[180px] truncate"
                                                    title={item.name}
                                                >
                                                    {item.name}
                                                </p>
                                                {/* <p className="text-gray-500">{item.variant}</p> */}
                                                <button className="text-red-500">
                                                    <i className="fa-solid fa-xmark"></i>
                                                    <span onClick={() => handleDeleteProduct(item.id)} className='pl-2'>Remove</span>
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
                                        <span className='flex justify-center'>{formatNumber(item.price)}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <span className='flex justify-center font-bold'>{formatNumber(calculateSubtotal(item.price, item.quantity))}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-4 rounded-[6px] border-[1px] border-[#6C7275] w-[413px]">
                        <h2 className="text-xl font-bold mb-4">Cart summary</h2>

                        {/* Free Shipping */}
                        {/* {shippingOptions.map(option => (
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
                        ))} */}
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
                                <span>+{formatNumber(option.fee)}</span>
                            </div>
                        ))}

                        <div className="mt-2 mb-[32px] pt-2">
                            <div className="border-b flex justify-between py-[13px]">
                                <span>Subtotal</span>
                                <span>{formatNumber(cartSubTotal)}VND</span>
                            </div>
                            <div className="flex justify-between font-bold py-[13px] text-[20px]">
                                <span>Total</span>
                                <span>{formatNumber(totalPay)}VND</span>
                            </div>
                        </div>

                        <button onClick={onNext} className="bg-black text-white w-full h-[48px] rounded-[8px] py-2 mt-4">Checkout</button>
                    </div>
                </div>
                {/* <div className="flex justify-between items-center mt-6">
                    <div>
                        <p className="mb-2 text-[20px]">Have a coupon?</p>
                        <p className='text-[#6C7275]'>Add your code for an instant cart discount</p>
                        <div className="flex mt-[16px]">
                            <input type="text" placeholder="Coupon Code" className="border border-[#6C7275] rounded-[8px] p-2 mr-2" />
                            <button className="bg-black text-white w-full h-[48px] rounded-[8px]">Apply</button>
                        </div>
                    </div>
                </div> */}
            </div>
        </div >
    );
}

export default ShoppingCart