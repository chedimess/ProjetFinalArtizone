import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import {Link} from "react-router-dom"

import {getcurrentprofile,clearCurrentProfile} from "../../js/action/profileactions"

import Swal from 'sweetalert2'

import {Spinner} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"



const Dashboard = ({profile,getprofilee}) => {
 
  const user =useSelector((state)=>state.authReducer.user)
  const isloading =useSelector((state)=>state.profileReducer.isloading)
  const dispatch = useDispatch();
 
  const getProfile = () => dispatch(getcurrentprofile());
    
  useEffect(() =>{
        
    (getProfile())
     
  },[]);
 
  const deleteprofilee=()=>{
    if (user.banned===false){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCurrentProfile(profile._id))
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }else{  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'you are not authorize to delete profile!!'
  })}

  }
     
    
     
if (isloading){
  return <div className="spin-container"><Spinner animation="grow" /></div>
}
 
  return (
    ( profile ===null )?(  
      <div>
           
           <div className="dashbord-container">
           <h1 className="large text-primary">Dashboard </h1>
           <p className="lead text-muted size">
        <i className="fas fa-user" />
        Welcome {user && user.firstName}
      </p>
      </div>
      <hr/><hr/>
      { (user.role==="artisan")?(
        <div className="link-container">
          <p>You have not yet setup a profile , please add some info</p>
      <Link to="/profileform"><button className="btn btn-primary my-1">create profile</button></Link>
      </div>):(<div></div>)}
               
                  </div>
      ):(
        
        <section className="section about-section gray-bg sec-container" id="about">
        <div className="container test">
            <div className="row align-items-center flex-row-reverse">
                <div className="col-lg-6">
                    <div className="about-text go-to">
                        <h3 className="title-profile">Profile  information</h3>
                        <br/>
                        <br/>
                        <hr/>
                        <h6 className="color-description">Description</h6>
                        <p>{profile.description}</p>
                        <hr/>
                        <div className="row about-list">
                            <div className="col-md-6">
                                <div className="media">
                                    <label>Category</label>
                                    <p>{profile.category}</p>
                                </div>
                                <div className="media">
                                    <label>Adress</label>
                                    <p>{profile.adress}</p>
                                </div>
                                <div className="media">
                                    <label>Postal</label>
                                    <p>{profile.codePostal}</p>
                                </div>
 
                            </div>
                            <div className="col-md-6">
                            <div className="media">
                                    <label>Phone</label>
                                      <p>{profile.phoneNumber}</p>
                                </div>
                                <div className="media">
                                    <label>Diploma</label>
                                      <p>{profile.Diploma}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div style={{
          width: "200px",
          height: "200px",
          fontSize: "1.5em",
        }} className="d-flex justify-content-center align-items-center mr-auto border rounded-circle text-light bg-info text-md">
                        <h1>{profile && profile.profileName && profile.profileName.split('')[0]}</h1>
                    </div>
                </div>
            </div>
            <br/>
            <div className="counter button-container">
                <div className="row ">
                 
                    <div className="">
                        <div className="count-data text-center">
                                 
    
    <Link to="/profileform"><button  className="btn btn-primary btn-block" onClick={()=> getprofilee(profile)}>Edit</button></Link>
    <br/>
    <Link to="/dashboard"><button type="submit" className="btn btn-primary btn-block" onClick={()=>deleteprofilee()}>Delete</button></Link >

                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        
       
  
            )
 
            )
          };
export default Dashboard;