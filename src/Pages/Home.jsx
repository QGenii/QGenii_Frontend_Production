// import TopHeader from "../components/header/HeaderNew";
import Section1 from "./HomePageSections/Section1";
import Section2 from "./HomePageSections/Section2";
import Section3 from "./HomePageSections/Section3";
import Section4 from "./HomePageSections/Section4";
import Footer from "../Components/Footer_Section/Footer/footer.jsx";
import Footerbottomarea from "../Components/Footer_Section/BottomSection/BottomSection.jsx";


function HomePage() {
    return (
        <>
            {/* <TopHeader /> */}
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Footer />
            <Footerbottomarea />


        </>
    );
}

export default HomePage;