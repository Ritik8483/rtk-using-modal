import React from 'react';
import { useParams } from 'react-router-dom';
import { useSingleUserQuery } from "../redux/UserApi";


const ViewUsers = () => {
    const params=useParams();
    console.log('II',params.id);
    const {data}=useSingleUserQuery(params.id);
    console.log('DDo',data);

  return (
    <div>
        <div className='d-flex gap-3 justify-content-center align-items-center flex-column'>
          <h1>Name : {data?.name}</h1>
          <h1>Email : {data?.email}</h1>
        </div>
    </div>
  )
}

export default ViewUsers