import React, {Component,Fragment} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Loading from "../Loading/loading";
import WentWrong from "../WentWrong/WentWrong";

class ContactSection extends Component {
    constructor() {
        super();
        this.state={
            address:"",
            email:"",
            message:"",
            loading:true,
            error:false
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.Footer).then(result=>{
            if(result == null){
                this.setState({error:true,loading:false})
            }
            else {
            this.setState({
                address:result[0]['address'],
                email:result[0]['email'],
                phone:result[0]['phone'],
                loading:false
            })
    }}).catch(error=>{
            this.setState({error:true,loading:false})
    })
    }

    sendContact(){
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;

        let jsonObject={name:name,email:email,message:message};
        RestClient.PostRequest(AppUrl.ContactSend,JSON.stringify(jsonObject)).then(result=>{
            alert("Success");
        }).catch(error=>{
            alert("Error");
        })


    }


    render() {
        if(this.state.loading==true && this.state.error==false){
            return <Loading/>
        }
        else if(this.state.loading==false && this.state.error==false){
            return (
                <Fragment>
                    <Container className="mt-5">
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                <h1 className="serviceName">Quick Connect</h1>
                                <Form>
                                    <Form.Group>
                                        <Form.Label className="serviceDescription">Name</Form.Label>
                                        <Form.Control id="name" type="text"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="serviceDescription">Email Address</Form.Label>
                                        <Form.Control id="email" type="email"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="serviceDescription">Message</Form.Label>
                                        <Form.Control id="message" as="textarea" rows="3"/>
                                    </Form.Group>
                                    <Button onClick={this.sendContact} variant="primary">
                                        Send
                                    </Button>
                                </Form>


                            </Col>

                            <Col lg={6} md={6} sm={12}>
                                <h1 className="serviceName">Discuss Now</h1>
                                <p className="serviceDescription ">{this.state.address}</p>
                                <p className="serviceDescription"><FontAwesomeIcon
                                    icon={faEnvelope}/> {this.state.email}</p>
                                <p className="serviceDescription"><FontAwesomeIcon icon={faPhone}/> {this.state.phone}
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Fragment>
            );
        }else if(this.state.error == true){
            return <WentWrong/>
        }
    }
}

export default ContactSection;