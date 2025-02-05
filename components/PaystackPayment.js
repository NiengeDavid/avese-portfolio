import { useState } from "react";
import { PaystackButton } from "react-paystack";
import PropTypes from "prop-types"; // For prop type validation
import { sendWelcomeEmail } from "../utils/mailgun";

const PaystackPayment = ({ email, amount, userData }) => {
  const publicKey = process.env.PAYSTACK_PUBLIC_KEY;
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const onSuccess = async (reference) => {
    console.log("Payment successful", reference);

    // Send welcome email
    await sendWelcomeEmail(email, `${userData.firstName} ${userData.lastName}`);

    setPaymentSuccess(true);

    // TODO: Add any additional post-payment logic here
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
          Payment Successful! Check your email for receipt and course access details.
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
  userData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
};

export default PaystackPayment;
