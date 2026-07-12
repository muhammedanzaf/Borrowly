import "./HowItWorks.css";

import {
    FiUpload,
    FiBookOpen,
    FiSend,
    FiRefreshCw
} from "react-icons/fi";

const steps = [
    {
        icon: <FiUpload />,
        title: "Upload Books",
        description: "Share books you've already finished reading."
    },

    {
        icon: <FiBookOpen />,
        title: "Browse Books",
        description: "Discover books uploaded by fellow readers."
    },

    {
        icon: <FiSend />,
        title: "Borrow",
        description: "Send a borrow request directly to the owner."
    },

    {
        icon: <FiRefreshCw />,
        title: "Read & Return",
        description: "Enjoy reading and return the book when you're done."
    }
];

function HowItWorks() {

    return (

        <section className="how-it-works">

            <h2>How Borrowly Works</h2>

            <p className="section-subtitle">
                Share books in just four simple steps.
            </p>

            <div className="steps-container">

                {steps.map((step, index) => (

                    <div className="step-card" key={index}>

                        <div className="icon-circle">

                            {step.icon}

                        </div>

                        <h3>{step.title}</h3>

                        <p>{step.description}</p>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default HowItWorks;