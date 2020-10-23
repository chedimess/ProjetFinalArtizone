import React,{useEffect} from 'react'
import { getuser } from '../../js/action/userAction'
import {useDispatch,useSelector} from "react-redux"
import Tablemember from './Tablemember'

import {Spinner} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"



function Memberlist() {
    const dispatch=useDispatch();
    const users = useSelector((state) => state.userReducer.users);
    const isloading= useSelector(state => state.profileReducer.isloading)
    const getuserr=()=>{
      dispatch(getuser())
    }
    useEffect(() => {
        getuserr();
      }, []);

      if (isloading) {
        return (
          <div className="spin-container"><Spinner animation="grow" /></div>
        );}
    return (
        <div className="container">
        <table className="table table-striped">
          <thead>
            <tr className="row">
              <td className="col-lg-3"><strong>User Name</strong></td>
              <td className="col-lg-3"><strong>Type of user</strong></td>
              <td className="col-lg-3"><strong>Email</strong></td>
              <td className="col-lg-3"><strong>Ban/Unban</strong></td>
            </tr>
          </thead>
          <tbody>
         {users.map((userr,i)=> <Tablemember key={i} userr={userr}/>)} 
          </tbody>
        </table>
    </div>
    )
}

export default Memberlist
