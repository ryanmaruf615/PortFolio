import React, {Component, Fragment} from 'react';
import {Container, Row} from "react-bootstrap";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import ReactHtmlParser from "react-html-parser";
import Loading from "../Loading/loading";
import WentWrong from "../WentWrong/WentWrong";

class TermsDescription extends Component {
    constructor() {
        super();
        this.state={
            terms:"",
            loading:true,
            error:false
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.Information).then(result=>{
            if(result==null){
                this.setState({ error:true,loading:false})
            }else{
            this.setState({
                terms:result[0]['terms'],
                loadding:false
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
                    <Container className="text-justify ">
                        <Row>
                            <p className="serviceDescription mt-5 ">{ReactHtmlParser(this.state.terms)}</p>
                        </Row>
                    </Container>

                </Fragment>
            );
        } else if(this.state.error==true){
            return  <WentWrong/>
        }
    }
}


export default TermsDescription;