import React, { Component } from 'react';
import ListCoursesComponent from './ListCoursesComponent';
import RefundCoinsComponent from './RefundCoinsComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CourseComponent from './CourseComponent';

class InstructorApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <h1>Vending Machine</h1>
                    <Switch>
                        <Route path="/" exact component={ListCoursesComponent} />
                        <Route path="/courses" exact component={ListCoursesComponent} />
                        <Route path="/refund" component={RefundCoinsComponent} />
                    </Switch>
                </>
            </Router>
        )
    }
}

export default InstructorApp