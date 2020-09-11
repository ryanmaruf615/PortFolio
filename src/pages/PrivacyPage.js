import React, {Component} from 'react';
import TopNavigation from "../components/TopNavigation/TopNavigation";
import PageTop from "../components/PageTop/PageTop";
import Footer from "../components/Footer/Footer";
import PrivacyDiscription from "../components/PrivacyDiscription/PrivacyDiscription";

class PrivacyPage extends Component {
    componentDidMount() {
        window.scroll(0,0)
    }
    render() {
        return (
            <div>
                <TopNavigation title="Privacy"/>
                <PageTop pagetitle="Privacy"/>
                <PrivacyDiscription/>
                <Footer/>
            </div>
        );
    }
}
export default PrivacyPage;