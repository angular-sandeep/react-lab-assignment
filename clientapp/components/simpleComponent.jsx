import React, { Component } from 'react';

class SimpleComponent extends Component {
    
    // this will be used for state definition
    // and to accept data from parent component
    // the "props" represent data to received 
    // from the parent component.
    constructor(props) {
        super(props);

        // state declaration & event-binding to component
        this.state = {  }
    }
    // this method encapsulate DOM and its data with behavior
    // this returns DOM object aka "Virtual DOM"
    render() { 
        return ( 
            <div>
                <h1>My simple component calling </h1>
                <p>my name is : {this.props.myname}</p>
                <br />
                <NewComponent />
            </div>
         );
    }
}
 
class NewComponent extends Component {
    render() { 
        return ( 
            <div>
                <h3> New component</h3>
            </div>
         );
    }
}
 
export default SimpleComponent;