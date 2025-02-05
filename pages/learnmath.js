import { Fragment, useState } from "react";
import dynamic from "next/dynamic";
const PaystackPayment = dynamic(() => import("../components/PaystackPayment"), {
  ssr: false,
});
import { learnMath, SEO, navigation } from "../config/config";
import { Header } from "../components/Header";
import { Nav } from "../components/Navbar";

const LearnMathPage = () => {
  const [currency, setCurrency] = useState("USD");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    lastClass: "Grade 7",
    purpose: "Improve my grades",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const exchangeRate = learnMath.rates || 1680;

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCurrencyToggle = () => {
    setCurrency((prev) => (prev === "USD" ? "NGN" : "USD"));
  };

  const validateForm = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.match(/^\S+@\S+\.\S+$/)
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
    }
  };

  // Currency conversion and formatting
  const formatPrice = (amount) => {
    if (currency === "USD") {
      return `$${amount.toFixed(2)}`;
    }
    return `₦${Math.round(amount * exchangeRate).toLocaleString()}`;
  };

  // Get actual amount in cents/kobo for Paystack
  const getPaymentAmount = (monthlyAmount, months) => {
    // Calculate total amount based on subscription duration
    const totalAmount = monthlyAmount * months;

    return currency === "USD"
      ? Math.round(totalAmount * exchangeRate) * 100
      : Math.round(totalAmount * exchangeRate) * 100;
  };

  return (
    <Fragment>
      <Header seo={SEO} />
      <Nav title={navigation.name} links={navigation.links} />
      <div className="container py-5">
        {/* Course Header */}
        <header className="text-center mb-5">
          <h1 className="display-4 mb-3">{learnMath.title}</h1>
          <p className="lead text-primary">{learnMath.bullet}</p>
          <p className="text-muted">{learnMath.description}</p>
        </header>

        {/* Course Curriculum */}
        <section className="mb-5">
          <h2 className="text-center mb-4">What you will learn</h2>
          <div className="row g-4">
            {learnMath.curriculum.map((item, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text text-muted">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Registration Form */}
        {!formSubmitted && (
          <section className="card shadow-lg mb-5">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Student Registration</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Class Completed</label>
                    <select
                      className="form-select"
                      name="lastClass"
                      value={formData.lastClass}
                      onChange={handleInputChange}
                    >
                      {[7, 8, 9, 10, 11, 12].map((grade) => (
                        <option key={grade} value={`Grade ${grade}`}>
                          Grade {grade}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Learning Purpose</label>
                    <select
                      className="form-select"
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                    >
                      {[
                        "Improve my grades",
                        "Prepare for exams",
                        "Personal satisfaction",
                      ].map((purpose) => (
                        <option key={purpose} value={purpose}>
                          {purpose}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 text-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={!validateForm()}
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        )}

        {/* Pricing Section */}
        {formSubmitted && (
          <section className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">Choose Your Plan</h2>
              <div className="d-flex align-items-center gap-2">
                <span>Currency:</span>
                <select
                  className="form-select form-select-sm"
                  value={currency}
                  onChange={handleCurrencyToggle}
                  style={{ width: "100px" }}
                >
                  <option value="USD">USD</option>
                  <option value="NGN">NGN</option>
                </select>
              </div>
            </div>

            <div className="row g-4">
              {learnMath.plans.map((plan, index) => (
                <div key={index} className="col-md-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body text-center">
                      <h4 className="card-title">{plan.title}</h4>
                      <div className="my-4">
                        <span className="display-6">
                          {formatPrice(plan.amount)}
                        </span>
                        <span className="text-muted d-block">
                          / {plan.duration}
                        </span>
                      </div>
                      <PaystackPayment
                        key={plan.title}
                        email={formData.email}
                        amount={getPaymentAmount(plan.amount, plan.months)}
                        //currency={currency} //Pass currency prop
                        userData={{
                          firstName: formData.firstName,
                          lastName: formData.lastName,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Success Message */}
        {formSubmitted && (
          <div className="alert alert-success mt-4 text-center">
            <h4 className="alert-heading">Student details registered! 🎉</h4>
            <p className="mb-0">
              Proceed to make payment and access the course by choosing any plan
              above. ({formData.email})
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default LearnMathPage;
