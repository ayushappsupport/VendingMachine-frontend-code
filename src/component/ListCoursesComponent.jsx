import React, { Component } from 'react'
import CourseDataService from '../service/CourseDataService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
const INSTRUCTOR = 'in28minutes'

class ListCoursesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            twohundred: 0,
            twohundredDis:0,
            onehundred: 0,
            onehundredDis: 0,
            fifty: 0,
            fiftyDis: 0,
            twenty:0,
            twentyDis:0,
            ten:0,
            tenDis:0,
            five: 0,
            fiveDis: 0,
            two: 0,
            twoDis: 0,
            one: 0,
            oneDis: 0,
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
       //let machineId = 1
      // alert('in submit function');
       let course = [
           {"machine":1,"denomination":200,"count":this.state.twohundred},
           {"machine":1,"denomination":100,"count":this.state.onehundred},
           {"machine":1,"denomination":50,"count":this.state.fifty},
           {"machine":1,"denomination":10,"count":this.state.ten},
           {"machine":1,"denomination":20,"count":this.state.twenty},
           {"machine":1,"denomination":5,"count":this.state.five},
           {"machine":1,"denomination":2,"count":this.state.two},
           {"machine":1,"denomination":1,"count":this.state.one}
           
       ]

      
           CourseDataService.createCourse(1, course)
           .then(
            response => {
                //this.setState({ message: `Delete of course ${id} Successful` })
                this.refreshCourses()
            }
        )
       
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
                <h3>Initalize the Vending Machine</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
               
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Denomnation</th>
                                <th>Number of Coins To Add</th>
                                <th>Coins Added</th>
                                <th>Add Coin</th>
                            </tr>
                        </thead>
                        <tbody>
                    <tr>
                        <th>1</th>
                        <th>200</th>
                        <th> 
            <input type="number" min="0" name="twohundred" pattern="[0-9]*"  value={this.state.twohundred} maxLength="10"  onChange={this.handleChange}/>
                       </th>
                       <th> 
            <input type="text" name="twohundredDis"  disabled = {true} value={this.state.twohundredDis} maxLength="10" />
                       </th>
                       <th>
                       <button className="btn btn-success" onClick={() => this.addCoin('200')}>Add</button>
                       </th>
                    </tr>
                    <tr>
                        <th>2</th>
                        <th>100</th>
                        <th> 
            <input type="number" min="0" name="onehundred" value={this.state.onehundred} maxLength="10" onChange={this.handleChange}/>
                       </th>
                       <th> 
            <input type="text" name="onehundredDis"  disabled = {true} value={this.state.onehundredDis} maxLength="10" />
                       </th>
                       <th>
                       <button className="btn btn-success"onClick={() => this.addCoin('100')}>Add</button>
                       </th>
                    </tr>
                    <tr>
                        <th>3</th>
                        <th>50</th>
                        <th> 
            <input type="number" min="0" name="fifty"  value={this.state.fifty}  maxLength="10" onChange={this.handleChange}/>
                       </th>
                       <th> 
            <input type="text" name="fiftyDis"  disabled = {true} value={this.state.fiftyDis} maxLength="10" />
                       </th>
                       <th>
                       <button className="btn btn-success" onClick={() => this.addCoin('50')}>Add</button>
                       </th>
                    </tr>
                    <tr>
                        <th>4</th>
                        <th>20</th>
                        <th> 
            <input type="number" min="0"  name="twenty" value={this.state.twenty} maxLength="10" onChange={this.handleChange} />
                       </th>
                       <th> 
            <input type="text" name="twentyDis"  disabled = {true} value={this.state.twentyDis} maxLength="10" />
                       </th>
                       <th>
                       <button className="btn btn-success" onClick={() => this.addCoin('20')}>Add</button>
                       </th>
                    </tr>
                    <tr>
                        <th>5</th>
                        <th>10</th>
                        <th> 
            <input type="number" min="0"  name="ten" value={this.state.ten} maxLength="10" onChange={this.handleChange}/>
                       </th>
                       <th> 
            <input type="text" name="tenDis"  disabled = {true} value={this.state.tenDis} maxLength="10" />
                       </th>
                       <th>
                       <button className="btn btn-success" onClick={() => this.addCoin('10')}>Add</button>
                       </th>
                    </tr>
                    <tr>
                        <th>6</th>
                        <th>5</th>
                        <th> 
            <input type="number" min="0" name="five" value={this.state.five} maxLength="10" onChange={this.handleChange}/>
                       </th>
                       <th> 
            <input type="text" name="fiveDis"  disabled = {true} value={this.state.fiveDis} maxLength="10" />
                       </th>
                       <th>
                       <button className="btn btn-success" onClick={() => this.addCoin('5')}>Add</button>
                       </th>
                    </tr>
                    <tr>
                        <th>7</th>
                        <th>2</th>
                        <th> 
            <input type="number" min="0" name="two"  value={this.state.two}  maxLength="10" onChange={this.handleChange}/>
                       </th>
                       <th> 
            <input type="text" name="twoDis"  disabled = {true} value={this.state.twoDis} maxLength="10" />
                       </th>
                       <th>
                       <button className="btn btn-success" onClick={() => this.addCoin('2')}>Add</button>
                       </th>
                    </tr>
                    <tr>
                        <th>8</th>
                        <th>1</th>
                        <th> 
            <input type="number" min="0" name="one" value={this.state.one} maxLength="10" onChange={this.handleChange}/>
                       </th>
                       <th> 
            <input type="text" name="oneDis"  disabled = {true} value={this.state.oneDis} maxLength="10" />
                       </th>
                       <th>
                       <button className="btn btn-success" onClick={() => this.addCoin('1')}>Add</button>
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

export default ListCoursesComponent