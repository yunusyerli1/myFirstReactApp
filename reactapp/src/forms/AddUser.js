import React, { Component } from 'react';
import posed from 'react-pose';
import USerConsumer from '../context';
import axios from 'axios';
var uniqid = require('uniqid');

const Animation = posed.div({
    visible : {
        opacity : 1,
        applyAtStart : { display : "block"}
    },
    hidden : {
        opacity : 0,
        applyAtEnd : {display : "none"}
    }
});

 class AddUser extends Component {
     state = {
         visible : false, 
         name : "",
         department : "",
         salary : "",
         error : false
        }
     changeVisibility=(e)=>{
         this.setState({
             visible : !this.state.visible
         })
     }
     validateForm = () => {
         const {name, salary, department}= this.state;
         if(name === ""|| salary === "" || department === ""){return false;}
         return true;
     }
  /*   ChangeName=(e)=>{
        this.setState({
            name : e.target.value
        })
     }
     ChangeDepartment=(e)=>{
        this.setState({
            department : e.target.value
        })
     }
    
    ChangeSalary=(e)=>{
        this.setState({
            salary : e.target.value
        })
     }
    */

   changeInput= (e) =>{
    this.setState({
        [e.target.name] : e.target.value
    })
 }
 addUser= async (dispatch, e)=>{
     e.preventDefault();
      
     const {name, department, salary} = this.state;
     const newUSer = {
         id : uniqid(),     //tüm satırı siledebilirsin Json server id'yi kendi atıo
         name,
         department,
         salary
         
     }
     if(!this.validateForm()){
         this.setState({
             error : true
         })
         return;
     }
     
     const response = await axios.post("http://localhost:3004/users", newUSer);
     dispatch({type : 'ADD_USER', payload : newUSer }); // payload:response.data ile de yapabilriz.

     //Redirect
     this.props.history.push('/');
 }


    render() {
        const {visible, name, salary, department, error} = this.state;
        return (
            <USerConsumer>
                {
                    value => {
                        const {dispatch} = value;
                        return (
            <div className="col-md-8 mb-4">
                <button onClick={this.changeVisibility} className="btn btn-dark btn-block mb-2">{visible ? "Hide Form" : "Show Form"}</button>
                <Animation pose={this.state.visible ? 'visible' : 'hidden'} >
                <div className="card">

                    <div className="card-header">
                        <h4>Add User Form</h4>
                    </div>
                    <div className="card-body">
                        {
                            error ? 
                            <div className = "alert alert-danger">Lütfen bilgilerinizi kontrol ediniz.</div> : null
                        }
                        <form onSubmit={this.addUser.bind(this, dispatch)}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="id" placeholder="Enter Name" className="form-control" value={name} onChange={this.changeInput}/>

                            </div>
                            <div className="form-group">
                                <label htmlFor="department">Department</label>
                                <input type="text" name="department" id="department" placeholder="Enter Department" className="form-control" value={department} onChange={this.changeInput}/>

                            </div>
                            <div className="form-group">
                                <label htmlFor="salary">Salary</label>
                                <input type="text" name="salary" id="salary" placeholder="Enter Salary" className="form-control" value={salary} onChange={this.changeInput}/>

                            </div>
                            <button className="btn btn-danger btn-block" type="submit" >Add User</button>
                        </form>
                    </div>
                </div>
                </Animation>
            </div>
                        )}}
            </USerConsumer>
        
         ) }
}
export default AddUser;