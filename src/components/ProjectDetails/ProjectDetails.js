import React, {Component, Fragment} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import ReactHtmlParser from "react-html-parser";
import Loading from "../Loading/loading";
import WentWrong from "../WentWrong/WentWrong";

class ProjectDetails extends Component {
    constructor(props) {
        super();
        this.state = {
            myProjectId: props.id,
            img_one: "",
            project_name: "",
            project_short_description: "",
            project_features: "",
            live_preview: "",
            loading: true,
            error: false

        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.ProjectDetails + this.state.myProjectId).then(result => {
            if (result == null) {
                this.state({error: true,loading:false})
            } else {
                this.setState({
                    img_one: result[0]['img_one'],
                    project_name: result[0]['project_name'],
                    project_short_description: result[0]['project_short_description'],
                    project_features: result[0]['project_features'],
                    loading: false
                })

            }
        }).catch(error => {
            this.state({error: true,loading:false})
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

                                <img className="courseImg" src={this.state.img_one}/>

                            </Col>

                            <Col lg={6} md={6} sm={12}>
                                <h2 className="serviceName">{this.state.project_name}</h2>
                                <p className="serviceDescription"> {this.state.project_short_description}</p>
                                <p className="serviceDescription">{ReactHtmlParser(this.state.project_features)}</p>
                                <Button variant="primary">More Info</Button>
                            </Col>


                        </Row>
                    </Container>


                </Fragment>
            );
        } else if (this.state.error == true) {
            return <WentWrong/>
        }
    }
}

export default ProjectDetails;