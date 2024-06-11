import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import './CheckoutForm.css'
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { Helmet } from "react-helmet-async";

const CheckoutForm = ({price}) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [subscriptionPeriod, setSubscriptionPeriod] = useState('3 minute');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation()

    // const searchParams = new URLSearchParams(location.search);
    // const price = parseFloat(searchParams.get('price')) || 0;
    // console.log(price)

    useEffect(() => {
        axiosSecure.post('/create-payment-intent' , {price})
            .then(res => {
                setClientSecret(res.data.clientSecret);
            });
    }, [axiosSecure, subscriptionPeriod]);


    const handleSubmit = async (event) => {
        event.preventDefault();
     
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            setError(confirmError.message);
        } else {
             setLoading(true);
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);
              
                const payment = {
                    email: user.email,
                    price: price,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    subscriptionPeriod: subscriptionPeriod
                };

                const res = await axiosSecure.post('/payments', payment);
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Subscription successful",
                        showConfirmButton: false,
                        timer: 3000
                    });
                    setLoading(false)
                    navigate('/')
                }
            }
        }
    }

    return (
        <>
           <Helmet>
        <title>Guirdian | Payment</title>
      </Helmet>
        {
            loading ? <><div className="flex justify-center">
                <Spin></Spin>
            </div></>
         : (
            <div className="">
        
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div>
                <p className="font-bold mb-2">Select Period</p>
                <select className="border p-2 rounded-lg w-full" value={subscriptionPeriod} onChange={(e) => setSubscriptionPeriod(e.target.value)}>
                    <option value="3 minute">3 minute</option>
                    <option value="5 days">5 days</option>
                    <option value="10 days">10 days</option>
                </select>
            </div>
            <div className="flex justify-end">
                <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </div>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
    
        </form>
        </div>
         )
        
        }
        </>
    );

};

export default CheckoutForm;
