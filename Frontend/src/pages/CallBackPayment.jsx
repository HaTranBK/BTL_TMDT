
import { useNavigate, useLocation } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import qs from 'qs';
import { useEffect } from 'react';

const CallBackPayment = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const vnp_HashSecret = 'EIAM95U756QRWCHCFNZ1ZXHNE60WKS3H';
    
    const verifyHash = (params) => {
        const secureHash = params['vnp_SecureHash'];
        delete params['vnp_SecureHash'];
        delete params['vnp_SecureHashType'];

        const sortedParams = sortObject(params);
        const signData = qs.stringify(sortedParams, { encode: false });
        const signed = CryptoJS.HmacSHA512(signData, vnp_HashSecret).toString(CryptoJS.enc.Hex);

        return secureHash === signed;
    };

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const vnp_Params = {};
        for (let [key, value] of query.entries()) {
            vnp_Params[key] = value;
        }

        const isValid = verifyHash({ ...vnp_Params });

        // TODO: Navigate 2 page thanh toan thanh cong hay that bai giùm tui nha ^^
        if (vnp_Params['vnp_ResponseCode'] === '00') {
            console.log('Thanh toán thành công');
        } else {
            // Thất bại
            console.log('Thanh toán thất bại');
        }
  }, [location.search, navigate]);

    return (
        <div>
            <p>Đang xác minh thanh toán...</p>
        </div>
    );
};


function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}



export default CallBackPayment