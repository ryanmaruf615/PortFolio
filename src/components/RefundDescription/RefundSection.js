import React, {Component,Fragment,} from 'react';
import  {Container,Row,Col} from "react-bootstrap";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import ReactHtmlParser from "react-html-parser";
import Loading from "../Loading/loading";
import WentWrong from "../WentWrong/WentWrong";

class RefundSection extends Component {

    constructor() {
        super();
        this.state={
            refund:"",
            loading:true,
            error:false
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.Information).then(result=>{
            if(result == null){
                this.setState({error:true,loading:false})
            }
            else {
            this.setState({
                refund:result[0]['refund'],
                loading:false
            })
        }}).catch(error=>{
            this.setState({error:true,loading:false})
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
                                <p className="serviceDescription  ">{ReactHtmlParser(this.state.refund)}</p>
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

export default RefundSection;