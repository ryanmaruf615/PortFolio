import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import ReactHtmlParser from "react-html-parser";
import Loading from "../Loading/loading";
import WentWrong from "../WentWrong/WentWrong";

class PrivacyDiscription extends Component {
    constructor() {
        super();
        this.state={
            privacy:"",
            loading:true,
            error:false
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.Information).then(result=>{
            if(result == null){
                this.setState({error:true ,loading:false})
            }
            else {
            this.setState({
                privacy:result[0]['privacy'],
                loading:false

            })
        }}).catch(error=>{
            this.setState({error:true ,loading:false})
        })
    }
    render() {
        if(this.state.loading==true && this.state.error==false){
            return <Loading/>
        }
        else if(this.state.loading==false && this.state.error==false){
            return (
                <Fragment>
                    <Container className="text-justify ">
                        <Row>
                            <Col lg={12} md={12} sm={12} className="mt-5">
                                <p className="serviceDescription">{ReactHtmlParser(this.state.privacy)}</p>
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
export default PrivacyDiscription;