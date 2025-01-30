import { useState } from "react";
import { PaystackButton } from "react-paystack";
import PropTypes from "prop-types"; // For prop type validation

const PaystackPayment = ({ email, amount }) => {
  const publicKey = process.env.PAYSTACK_PUBLIC_KEY;
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const onSuccess = (reference) => {
    console.log("Payment successful", reference);
    setPaymentSuccess(true);
    // TODO: Handle post-payment logic (e.g., updating DB, sending emails)
  };

  const onClose = () => {
    console.log("Payment closed");
  };

  return (
    <div className="text-center">
      {!paymentSuccess ? (
        <PaystackButton
          text="Pay Now"
          amount={amount} // In kobo
          email={email}
          //currency={currency}
          publicKey={publicKey}
          onSuccess={onSuccess}
          onClose={onClose}
          className="btn btn-primary btn-lg" // Bootstrap 5 classes
        />
      ) : (
        <div className="alert alert-success mt-3" role="alert">
          Payment Successful!
        </div>
      )}
    </div>
  );
};

// Prop type validation
PaystackPayment.propTypes = {
  email: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  //currency: PropTypes.string.isRequired,
};

export default PaystackPayment;
