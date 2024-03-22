import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function App() {
  let [userlist,setuserlist]=useState([])
  let [inputdata,setinputdata]=useState({
    id:'',
    uname:'',
    email:'',
    phone:'',
    password:''
  })
  let changevalue=(event)=>{
    let obj = {
      id:inputdata.id,
      uname:inputdata.uname,
      email:inputdata.email,
      phone:inputdata.phone,
      password:inputdata.password
    }
    let inputName=event.target.name;
    let inputValue=event.target.value;
    console.log(inputName,inputValue);
    obj[inputName]=inputValue;
    setinputdata(obj)

  }
  let handleSubmit=(event)=>{
    event.preventDefault();
let user={
  uname:event.target.uname.value,
  email:event.target.email.value,
  phone:event.target.phone.value,
  password:event.target.password.value,
}
let checkstatus=userlist.filter((userItems)=>userItems.email==event.target.email.value)
if(checkstatus.length==0){
  if(inputdata.id===''){
    setuserlist([...userlist,user])
  NotificationManager.success('Data added');
  setinputdata({
    id:'',
    uname:'',
    email:'',
    phone:'',
    password:''
  })
  }
  else{
    let editfilterData=userlist.filter((v,i)=>{
      if(i==inputdata.id){
        v['uname']=inputdata.uname;
        v['email']=inputdata.email;
        v['phone']=inputdata.phone;
        v['password']=inputdata.password;
      }
      return v;
    })
    setuserlist(editfilterData);
    setinputdata({
      id:'',
      uname:'',
      email:'',
      phone:'',
      password:''
    })
  }
  
}
else{
  NotificationManager.error('Email id already exists');
}

  }
  let deleteRow=(index)=>{
    let filterData=userlist.filter((v,i)=>i!=index);
    setuserlist(filterData)
    NotificationManager.success('deletData'); 
  }
  let showEdit=(index)=>{
let filtereditData=userlist.filter((v,i)=>index==i)[0]
let obj={...filtereditData}
obj['id']=index;
setinputdata(obj)
  }
  return (
    <>
    <div className="container">
      <div className='row'>
        <div className='col-lg-4'>
        <form action="#" className="contact-form" onSubmit={handleSubmit} >
      <h5 className="title">Contact us</h5>
      <p className="description">Feel free to contact us if you need any assistance, any help or another question.
      </p>
      <div>
        <input type="text" class="form-control rounded border-white mb-3 form-input" id="name" placeholder="Name" name='uname'  value={inputdata.uname} onChange={changevalue}
        />
      </div>
      <div>
        <input type="email" class="form-control rounded border-white mb-3 form-input" placeholder="Email"name='email' value={inputdata.email} onChange={changevalue}
        />
      </div>
      <div>
        <input type="phone" class="form-control rounded border-white mb-3 form-input" placeholder="Phone"name='phone' value={inputdata.phone} onChange={changevalue}
        />
      </div>
      <div>
      <input type="password" class="form-control rounded border-white mb-3 form-input" placeholder="Password" name='password' value={inputdata.password} onChange={changevalue}
      />
      </div>
      <div className="submit-button-wrapper">
        <input type="submit" value={inputdata.id===''?'send':'update'}/>
      </div>
    </form>

        </div>
        <div className='col-lg-8 pt-5'>
          <h1>User List{userlist.length}</h1>
        <table className="table ">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  { 
   userlist.length>0 ?
   userlist.map((v,i)=>{
    return(
<tr>
    <th scope="row">{i+1}</th>
      <td>{v.uname}</td>
      <td>{v.email}</td>
      <td>{v.phone}</td>
      <td>{v.password}</td>
      <td><button onClick={()=>deleteRow(i)}>Delete</button> | <button onClick={()=>showEdit(i)}>Edit</button></td>
      </tr>
    )
   })
   
      :
      <tr align="center"><td colSpan={6}>No data found</td></tr>
      
   }
    
   
  </tbody>
</table>
        </div>
      </div>
      <NotificationContainer/>
    </div>
    </>
  )
}

export default App;
