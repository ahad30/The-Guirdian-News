import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {

    const {payment} = useParams();
    // console.log(payment)
    const price = payment === 'pro' ? 30 : 20;

    return (
        <div>   
            <div className="w-[500px] mx-auto bg-gray-200 rounded-lg p-5">
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={price}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;