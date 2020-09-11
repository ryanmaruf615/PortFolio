import React, {Component,Fragment,} from 'react';
import  {Container,Row,Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook} from "@fortawesome/free-brands-svg-icons";
import {faYoutube} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";


class Footer extends Component {

    constructor() {
        super();
        this.state={
            address:"",
            email:"",
            phone:"",
            facebook:"",
            youtube:"",
            footer_credit:"",


        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.Footer).then(result=>{

            this.setState({
                address:result[0]['address'],
                email:result[0]['email'],
                phone:result[0]['phone'],
                facebook:result[0]['facebook'],
                youtube:result[0]['youtube'],
                footer_credit:result[0]['footer_credit']

            })
        }).catch(error=>{

        })
    }


    render() {



        return (
            <Fragment>
                <Container fluid={true} className="text-center footerSection ">
                    <Row>
                        <Col lg={3} md={6} sm={12} className="p-5 text-justify">
                            <h2 className="serviceName">Follow Me</h2>
                            <a className="socialLink" target="_blank" href={"//" + this.state.facebook}> <FontAwesomeIcon  icon={faFacebook} /> FaceBook</a><br/>
                            <a className="socialLink" target="_blank" href={"//" + this.state.youtube}> <FontAwesomeIcon  icon={faYoutube} /> YouTube</a>
                        </Col>

                        <Col lg={3} md={6} sm={12} className="p-5 text-justify">
                            <h2 className="serviceName ">Address</h2>
                            <p className="serviceDescription ">{this.state.address}</p>
                            <p className="serviceDescription"><FontAwesomeIcon  icon={faEnvelope} /> {this.state.email}</p>
                            <p className="serviceDescription"><FontAwesomeIcon  icon={faPhone} /> {this.state.phone}</p>
                        </Col>

                        <Col lg={3} md={6} sm={12} className="p-5 text-justify">
                            <h2 className="serviceName">Information</h2>
                            <Link  className="footerLink" to="/about">About Me </Link><br/>
                            <Link  className="footerLink" to="/contact">Contact Me </Link><br/>

                        </Col>

                        <Col lg={3} md={6} sm={12} className="p-5 text-justify">
                            <h2 className="serviceName">Legal</h2>
                         <Link  className="footerLink" to="/Refund">Refund Policy </Link><br/>
                         <Link  className="footerLink" to="/Terms">Terms And Condition </Link><br/>
                         <Link  className="footerLink" to="/privacy">Privacy Policy </Link><br/>
                        </Col>
                    </Row>
                </Container>

                <Container fluid={true} className="text-center copyRightSection ">
                    <a className="copyRightLink" href="#">maruf.com &copy; 2020-2021</a>
                </Container>
            </Fragment>
        );
    }
}

export default Footer;