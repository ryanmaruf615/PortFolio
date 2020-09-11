import React, {Component,Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import CountUp from 'react-countup';
import VisibilitySensor from "react-visibility-sensor";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Loading from "../Loading/loading";
import WentWrong from "../WentWrong/WentWrong";

class Summary extends Component {
    constructor() {
        super();
        this.state={
            total_project:"",
            total_client:"",
            loading:true,
            error:false
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.TotalProjectClient).then(result=>{
            if(result==null){
                this.setState({ error:true,loading:false})
            }else {
                this.setState({
                    total_project: result[0]['total_project'],
                    total_client: result[0]['total_client'],
                    loading: false
                })
            }}).catch(error=>{
            this.setState({ error:true,loading:false})
        })
    }

    render() {
        if(this.state.loading==true && this.state.error==false ){
            return  <Loading/>
        }
        else if(this.state.loading==false  && this.state.error==false)  {
            return (
                <Fragment>
                    <Container fluid={true} className="SummaryBanner SummarySection p-0">
                        <div className="SummaryBannerOverlay">
                            <Container className="text-center">
                                <Row>
                                    <Col lg={8} md={6} sm={12}>
                                        <Row className="countSection">
                                            <Col>
                                                <h1 className="countNumber">
                                                    <CountUp start={0} end={this.state.total_project}>
                                                        {({countUpRef, start}) => (
                                                            <VisibilitySensor onChange={start} delayedCall>
                                                                <span ref={countUpRef}/>
                                                            </VisibilitySensor>
                                                        )}
                                                    </CountUp>
                                                </h1>
                                                <h4 className="countTitle">Total Projects</h4>
                                                <hr className="bg-white w-25"/>
                                            </Col>

                                            <Col>
                                                <h1 className="countNumber">
                                                    <CountUp start={0} end={this.state.total_client}>
                                                        {({countUpRef, start}) => (
                                                            <VisibilitySensor onChange={start} delayedCall>
                                                                <span ref={countUpRef}/>
                                                            </VisibilitySensor>
                                                        )}
                                                    </CountUp>
                                                </h1>
                                                <h4 className="countTitle">Total Clients</h4>
                                                <hr className="bg-white w-25"/>
                                            </Col>

                                        </Row>
                                    </Col>

                                    <Col lg={4} md={6} sm={12}>
                                        <Card className="workCard">
                                            <Card.Body>
                                                <Card.Title className="cardTitle text-justify">How i Work</Card.Title>
                                                <Card.Text>
                                                    <p className="cardSubTitle text-justify"><FontAwesomeIcon
                                                        className="iconBullet" icon={faCheckCircle}/> Requirement
                                                        Gathering </p>
                                                    <p className="cardSubTitle text-justify"><FontAwesomeIcon
                                                        className="iconBullet" icon={faCheckCircle}/> System Analysis
                                                    </p>
                                                    <p className="cardSubTitle text-justify"><FontAwesomeIcon
                                                        className="iconBullet" icon={faCheckCircle}/> Coding Testing</p>
                                                    <p className="cardSubTitle text-justify"><FontAwesomeIcon
                                                        className="iconBullet" icon={faCheckCircle}/> Implementation</p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                </Row>
                            </Container>
                        </div>
                    </Container>

                </Fragment>
            );
        }else if(this.state.error==true){
            return  <WentWrong/>
        }
    }
}

export default Summary;