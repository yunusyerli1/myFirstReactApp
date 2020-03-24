import React, { Component } from 'react'
import PropTypes from 'prop-types'
import USerConsumer from '../context';
import axios from 'axios';
import {Link} from 'react-router-dom';

 class User extends Component {
     //2 tür state oluşturulabilir
     state = {
         isVisible:false
     }
    static defaultProps = {
        name : "Bilgi Yok",
        department : "Bilgi", 
        salary : "Bilgi Yok"
    }

   /* constructor(props){
        super(props);
        this.state = {
            isVisible : false
        }
        this.onClickEvent=this.onClickEvent.bind(this);
    } */
    onClickEvent(e){
        console.log(this);
        this.setState({
            isVisible : !this.state.isVisible
        });
    }
    //onclick fonksiyonuna değer göndermek istiyorsak this den sonra virgün ve 34 değerimizi yazarız. Fonksiyonda ise önce number sonra e yazarız.
    //onClickEventi arrow function ile yapsaydık constructorda ya da inlineda .bind(this) yapmaya gerek yoktu.Arrow function otomatik yapıyor.
    /*onClickEvent=(number, e)=>{
        console.log(this);
    }*/

    onDeleteUser = async (dispatch, e) => {
        //const {id, deleteUser} = this.props;
        //deleteUser(id);
        const {id} = this.props;
        //Delete Request
        await axios.delete(`http://localhost:3004/users/${id}`);

        //Consumer Dispatch
        dispatch ({type : "DELETE_USER", payload : id});
    }
    componentWillUnmount(){
        console.log("Component Will Unmount");
        //Componentleri kaldırmadan hemen önce belli abonelikler varsa bunları iptal etmek için kullanabiliriz. Veya kaynakları serbest bırakmak için kullanabiliriz.
    }

    render() {
        //destructing
        const {id,name, department, salary}=this.props;
        const {isVisible}=this.state;
        return(
            <USerConsumer>
                {
                    value => {
                        const {dispatch} = value;
                        return (
                        <div className="col-md-8 mb-4">
                        <div className="card" style = {isVisible ? {backgroundColor :"#96b1c1", color: "white"} : null}>
                                
                                <div className="card-header d-flex justify-content-between">   
                                    <h4 className="d-inline" onClick={this.onClickEvent.bind(this, 34)} style={{cursor:"pointer"}}>{name}</h4>
                                    <i onClick = {this.onDeleteUser.bind(this, dispatch)} className="far fa-trash-alt" style={{cursor:"pointer"}}></i>
                                </div>
                                {
                                isVisible ? <div className="card-body">
                                    <p className="card-text">Maaş : {salary}</p>
                                    <p className="card-text">Department : {department}</p> 
                                    <Link to = {`edit/${id}`}className = "btn btn-dark btn-block">Update User</Link>
                                    
                                </div> : null 
                                }
                                
                            </div>
                        </div>
                            )    


                    }
                }
            </USerConsumer>
        )




     
    }
}
User.protoTypes = {
    name : PropTypes.string.isRequired,
    salary : PropTypes.string.isRequired,
    department : PropTypes.string.isRequired,
    id : PropTypes.string.isRequired
};

/*User.defaultProps = {
    name : "Bilgi Yok",
    department : "Bilgi Yok",
    salary : "Bilgi Yok"
}*/

export default User;



//without destructing

/* class User extends Component {
    render(props) {
    
        return (
            <div>
                <ul>
                    <li>İsim :{this.props.name} </li>
                    <li>Departman : {this.props.department}</li>
                    <li>Maaş : {this.props.salary}</li>
                </ul>
            </div>
        )
    }
}*/