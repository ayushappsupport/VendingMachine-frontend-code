import React, { Component } from 'react'
import CourseDataService from '../service/CourseDataService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
const INSTRUCTOR = 'in28minutes'

class RefundCoinsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
            twohundredDisRefund:0,
           
            onehundredDisRefund: 0,
            
            fiftyDisRefund: 0,
            
            twentyDisRefund:0,
           
            tenDisRefund:0,
            
            fiveDisRefund: 0,
            
            twoDisRefund: 0,
            
            oneDisRefund: 0,
            refund: 0,
            message: ""
        }
        this.deleteCourseClicked = this.deleteCourseClicked.bind(this)
        this.updateCourseClicked = this.updateCourseClicked.bind(this)
        this.addCourseClicked = this.addCourseClicked.bind(this)
        this.refreshCourses = this.refreshCourses.bind(this)
        this.handleChange = this.handleChange.bind(this);
       
    }
    

    handleChange(event) {
        const re = /^[0-9\b]+$/;
        //event.target.value.replace(/\D/,'');
        if (event.target.value == "" || re.test(event.target.value) || event.target.value>=0) {
            this.setState({[event.target.name]: event.target.value});
         }
        
      }
      addCoin(denom){
        //alert('in add coin');
       // alert(denom);
        let coin = {"denomination":denom}
        CourseDataService.retrieveCourse(1, coin)
        .then(
         response => {
             //this.setState({ message: `Delete of course ${id} Successful` })
             this.refreshCourses()
         }
     )}

    componentDidMount() {
        this.refreshCourses();
    }

    refreshCourses() {
        //alert('refresh');
        var finalResponse=[];
        CourseDataService.retrieveAllCourses(INSTRUCTOR)//HARDCODED
            .then(
                response => {
                   response.data.map(
                    coin => {
                        //alert(coin.denomination);
                        if(coin.denomination==200){
                        this.setState({ twohundredDis: coin.count })
                        this.setState({ twohundred: 0 })
                        }
                        if(coin.denomination==100){
                            this.setState({ onehundredDis: coin.count })
                            this.setState({ onehundred: 0 })
                        }
                        if(coin.denomination==50){
                            this.setState({ fiftyDis: coin.count })
                            this.setState({ fifty: 0 })
                        }
                        if(coin.denomination==20){
                            this.setState({ twentyDis: coin.count })
                            this.setState({ twenty: 0 })
                        }
                        if(coin.denomination==10){
                            this.setState({ tenDis: coin.count })
                            this.setState({ ten: 0 })
                        }
                        if(coin.denomination==5){
                            this.setState({ fiveDis: coin.count })
                            this.setState({ five: 0 })
                        }
                        if(coin.denomination==2){
                            this.setState({ twoDis: coin.count })
                            this.setState({ two: 0 })
                        }
                        if(coin.denomination==1){
                            this.setState({ oneDis: coin.count })
                            this.setState({ one: 0 })
                        }
                      }
                    
                   )
                    
                }
            )
           // alert(finalResponse);
            
    }

    deleteCourseClicked(id) {
        CourseDataService.deleteCourse(INSTRUCTOR, id)
            .then(
                response => {
                    this.setState({ message: `Delete of course ${id} Successful` })
                    this.refreshCourses()
                }
            )

    }

    addCourseClicked() {
      
      alert(this.state.refund);
       let course ={"refundAmount":this.state.refund}
    var twohundredFlag=false;
    var onehundredFlag=false;
    var fiftyFlag=false;
    var twentyFlag=false;
    var tenFlag=false;
    var fiveFlag=false;
    var twoFlag=false;
    var oneFlag=false;
    var errormessageFlag=false;
           CourseDataService.updateCourse(1, course)
           .then(
           response => {
              
            response.data.map(
                coin => {
                    //alert(coin.denomination);
                    if(coin.denomination==200){
                    this.setState({ twohundredDisRefund: coin.count })
                    twohundredFlag=true;
                    }
                    else if(coin.denomination==100){
                        this.setState({ onehundredDisRefund: coin.count })
                        onehundredFlag=true;
                    }
                    else if(coin.denomination==50){
                        this.setState({ fiftyDisRefund: coin.count })
                        fiftyFlag=true;
                    }
                    else if(coin.denomination==20){
                        this.setState({ twentyDisRefund: coin.count })
                        twentyFlag=true;
                    }
                    else if(coin.denomination==10){
                        this.setState({ tenDisRefund: coin.count })
                        tenFlag=true;
                    }
                    else if(coin.denomination==5){
                        this.setState({ fiveDisRefund: coin.count })
                        fiveFlag=true;
                    }
                    if(coin.denomination==2){
                        this.setState({ twoDisRefund: coin.count })
                        twoFlag=true;
                    }
                    else if(coin.denomination==1){
                        this.setState({ oneDisRefund: coin.count })
                        oneFlag=true;
                    }
                  }
                
               )
               
            }
        ).catch((error) =>  {
            if (error.response) {
                this.setState({ message: error.response.data.message })
                errormessageFlag=true;
              }
          });
        if(!twohundredFlag){
            this.setState({ twohundredDisRefund: 0 })
        }
        if(!onehundredFlag){
            this.setState({ twohundredDisRefund: 0 })
        }
        if(!fiftyFlag){
            this.setState({ twohundredDisRefund: 0 })
        }
        if(!twentyFlag){
            this.setState({ twohundredDisRefund: 0 })
        }
        if(!tenFlag){
            this.setState({ twohundredDisRefund: 0 })
        }
        if(!fiveFlag){
            this.setState({ twohundredDisRefund: 0 })
        }
        if(!twoFlag){
            this.setState({ twohundredDisRefund: 0 })
        }
        if(!oneFlag){
            this.setState({ twohundredDisRefund: 0 })
        }
        if(!errormessageFlag){
            this.setState({ message: "" })
        }
       
       console.log(course);
    }

    updateCourseClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/courses/${id}`)
    }
    
    render() {
        console.log('render')
        return (
            
            <div className="container">
                <h3>Enter the Refund Amount</h3>
                
                <input type="number" min="0" name="refund" value={this.state.refund}  onChange={this.handleChange} />
                <button className="btn btn-success" onClick={this.addCourseClicked}>Refund</button>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
               
                    <table className="table">
                        <thead>
                            <tr>
                                
                                <th>Denomnation</th>
                                
                                <th>Coins Refunded</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                    <tr>
                       
                        <th>200</th>
                     
                       <th> 
            <input type="text" name="twohundredDis"  disabled = {true} value={this.state.twohundredDisRefund} maxLength="10" />
                       </th>
                      
                    </tr>
                    <tr>
                        
                        <th>100</th>
                       
                       <th> 
            <input type="text" name="onehundredDis"  disabled = {true} value={this.state.onehundredDisRefund} maxLength="10" />
                       </th>
                      
                    </tr>
                    <tr>
                        
                        <th>50</th>
                       
                       <th> 
            <input type="text" name="fiftyDis"  disabled = {true} value={this.state.fiftyDisRefund} maxLength="10" />
                       </th>
                       
                    </tr>
                    <tr>
                        
                        <th>20</th>
                      
                       <th> 
            <input type="text" name="twentyDis"  disabled = {true} value={this.state.twentyDisRefund} maxLength="10" />
                       </th>
                       
                    </tr>
                    <tr>
                        
                        <th>10</th>
                       
                       <th> 
            <input type="text" name="tenDis"  disabled = {true} value={this.state.tenDisRefund} maxLength="10" />
                       </th>
                       
                    </tr>
                    <tr>
                        
                        <th>5</th>
                       
                       <th> 
            <input type="text" name="fiveDis"  disabled = {true} value={this.state.fiveDisRefund} maxLength="10" />
                       </th>
                      
                    </tr>
                    <tr>
                       
                        <th>2</th>
                       
                       <th> 
            <input type="text" name="twoDis"  disabled = {true} value={this.state.twoDisRefund} maxLength="10" />
                       </th>
                      
                    </tr>
                    <tr>
                       
                        <th>1</th>
                       
                       <th> 
            <input type="text" name="oneDis"  disabled = {true} value={this.state.oneDisRefund} maxLength="10" />
                       </th>
                      
                    </tr>
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addCourseClicked}>Add Coins</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default RefundCoinsComponent