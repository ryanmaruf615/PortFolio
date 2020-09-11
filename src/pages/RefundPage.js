import React, {Component} from 'react';
import TopNavigation from "../components/TopNavigation/TopNavigation";
import PageTop from "../components/PageTop/PageTop";
import Footer from "../components/Footer/Footer";
import RefundSection from "../components/RefundDescription/RefundSection";

class RefundPage extends Component {
    componentDidMount() {
        window.scroll(0,0)
    }
    render() {
        return (
            <div>
                <TopNavigation title="Refund"/>
                <PageTop pagetitle="Refund Police"/>
                <RefundSection/>
                <Footer/>
            </div>
        );
    }
}
export default RefundPage;