import "./WhyBorrowly.css";

import {
  FaMoneyBillWave,
  FaRecycle,
  FaUsers,
  FaBookOpen,
} from "react-icons/fa";

const benefits = [
  {
    icon: <FaMoneyBillWave />,
    title: "Save Money",
    description:
      "Borrow textbooks instead of buying expensive new ones every semester.",
  },
  {
    icon: <FaRecycle />,
    title: "Reduce Waste",
    description:
      "Give books a second life instead of letting them collect dust.",
  },
  {
    icon: <FaUsers />,
    title: "Help Students",
    description:
      "Support fellow readers by sharing books you've already finished.",
  },
  {
    icon: <FaBookOpen />,
    title: "Reading Community",
    description:
      "Connect with students who love reading and knowledge sharing.",
  },
];

function WhyBorrowly() {
  return (
    <section className="why-borrowly">

      <h2>Why Choose Borrowly?</h2>

      <p className="why-subtitle">
        More than borrowing books — it's about sharing knowledge.
      </p>

      <div className="benefits-grid">
        {benefits.map((item, index) => (
          <div className="benefit-card" key={index}>

            <div className="benefit-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>

          </div>
        ))}
      </div>

    </section>
  );
}

export default WhyBorrowly;