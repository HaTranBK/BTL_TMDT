import React from 'react'
import { useState, useEffect } from 'react';

const CheckoutDetails = ({ onNext }) => {
    const [cart, setCart] = useState([]);
    const [totalCart, setTotalCart] = useState(0);
    const [loading, setLoading] = useState(true);

    const [voucherCode, setVoucherCode] = useState('');
    const [validCode, setValidCode] = useState('');
    const [discount, setDiscount] = useState(null);
    const [error, setError] = useState('');

    const formatNumber = (num) => {
        if (typeof num !== "number") num = Number(num);
        return num.toLocaleString('vi-VN');
    };

    useEffect(() => {
        fetchCart();
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
            setTotalCart(data.data.totalCart);
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleRemoveVoucher = () => {
        setVoucherCode('');
        setDiscount(null);
        setValidCode('');
    }
    const handleApplyVoucher = async () => {
        if (!voucherCode.trim()) {
            setError('Please enter a voucher code');
            setDiscount(null);
            return;
        }

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://be-tm-t.onrender.com/vouchers?code=${voucherCode}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) throw new Error('Invalid voucher');

            const data = await response.json();
            setDiscount(data.data.discount);
            setValidCode(data.data.code);
            setVoucherCode('');
            setError('');
        } catch (err) {
            setDiscount(null);
            setError('Voucher not found or invalid');

        }
    };

    const handleSubmitOrder = async () => {
        const token = localStorage.getItem('token');
        try {
            setLoading(true);
            // Bước 1: Lấy dữ liệu giỏ hàng
            const cartRes = await fetch(`https://be-tm-t.onrender.com/carts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (!cartRes.ok) throw new Error('Failed to fetch cart');

            const cartData = await cartRes.json();
            const productsInCart = cartData.data.cart.Products;

            // Bước 2: Tạo dữ liệu đơn hàng
            const orderData = {
                products: productsInCart.map(product => ({
                    productId: product.id,
                    quantity: product.quantity,
                })),
                voucherCodes: [
                    validCode
                ]
            };

            // Bước 3: Gửi đơn hàng
            const orderRes = await fetch(`https://be-tm-t.onrender.com/orders`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData),
            });

            if (!orderRes.ok) throw new Error('Failed to submit order');

            const result = await orderRes.json();
            console.log('Order submitted successfully:', result);
            localStorage.setItem('latestOrderId', result.data.order.id);
            // console.log('Order ID:', result.data.order.id);

            // Bước 4: Xoá từng sản phẩm trong giỏ hàng
            await Promise.all(
                productsInCart.map(product =>
                    fetch(`https://be-tm-t.onrender.com/carts/${product.id}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    })
                )
            );

        } catch (error) {
            console.error('Error submitting order:', error.message);
        } finally {
            // TODO: navigate to success screen
            onNext();
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
                        <button onClick={() => handleSubmitOrder()} className="bg-black text-white w-full h-[48px] rounded-[8px] py-2">Place Order</button>
                    </div>
                    <div className="p-4 rounded-[6px] border-[1px] border-[#6C7275] w-[413px] h-fit">
                        <h2 className="text-xl font-bold mb-4">Order summary</h2>
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center my-4 pb-6 relative border-b">
                                <img src={item.image} alt="Tray Table - Black" className="w-12 h-12 mr-4" />
                                <div className='flex flex-col gap-[6px]'>
                                    <p
                                        className="font-bold max-w-[200px] truncate"
                                        title={item.name}
                                    >
                                        {item.name}
                                    </p>
                                    {/* <p className="text-gray-500">Color: Black</p> */}
                                    <div className='flex items-center'>
                                        <div className="w-fit rounded-[6px] border-[1px] border-[#ababab]">
                                            <button className="px-2 py-1 cursor-not-allowed">-</button>
                                            <span className="px-2">{item.quantity}</span>
                                            <button className="px-2 py-1 cursor-not-allowed">+</button>
                                        </div>
                                    </div>
                                </div>
                                <span className="absolute right-0 top-0 font-bold">{formatNumber(item.price)}</span>
                            </div>
                        ))}
                        < div className="my-6 flex gap-[16px]" >
                            <input
                                type="text"
                                placeholder="Enter voucher code"
                                className="border rounded-[6px] p-2 flex-1 h-[52px]"
                                value={voucherCode}
                                onChange={(e) => setVoucherCode(e.target.value)}
                            />
                            <button onClick={handleApplyVoucher} className="bg-black text-white w-[135px] h-[52px] rounded-[8px] py-2">Apply</button>
                        </div>
                        {discount && (
                            <div className="mb-4">
                                <p>
                                    <span className="text-green-500">{validCode}</span> -{formatNumber(discount)}VND
                                    <button onClick={handleRemoveVoucher} className="text-red-500 ml-2">(Remove)</button>
                                </p>
                            </div>
                        )}
                        {error && (
                            <div className="mb-4">
                                <p className="text-red-500 font-medium">
                                    {error}
                                </p>
                            </div>
                        )}
                        {/* <div className="mb-4">
                            <p className="text-green-500">JankataWIN -25.000 <button className="text-red-500">(Remove)</button></p>
                        </div> */}
                        <div className="border-t mt-2 pt-2">
                            <div className="flex justify-between pb-3 border-b">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between mt-2 pb-3 border-b">
                                <span>Subtotal</span>
                                <span>{formatNumber(totalCart)}VND</span>
                            </div>
                            <div className="flex justify-between mt-2 pb-3 border-b">
                                <span>Discount</span>
                                <span>-{formatNumber(discount)}VND</span>
                            </div>
                            <div className="flex justify-between mt-2 pb-3 border-b font-bold">
                                <span>Total</span>
                                <span>{formatNumber(totalCart - discount)}VND</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CheckoutDetails
