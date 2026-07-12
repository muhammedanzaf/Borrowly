import Hero from "../../components/Hero/Hero.jsx";
import RecentBooks from "../../components/RecentBooks/RecentBooks.jsx";
import HowItWorks from "../../components/HowItWorks/HowItWorks.jsx";
import WhyBorrowly from "../../components/WhyBorrowly/WhyBorrowly";
import Footer from "../../components/Footer/Footer";

function Home() {
    return (
        <>
            <Hero />
            <RecentBooks />
            <HowItWorks />
            <WhyBorrowly />
            <Footer />

        </>
    );
}

export default Home;