import React, { useState } from "react";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
  useSingleUserQuery,
  useUpdateUserMutation,
} from "../redux/UserApi";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";
import AddUserModal from "./AddUserModal";

const Home = () => {
  const navigate = useNavigate();
  const [addUser, setAddUser] = useState<boolean>(false);
  const [editUserData, setEditUserData] = useState<any>('');  

  const { data, error, isLoading, isFetching, isSuccess } = useAllUsersQuery();

  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleViewUsers = (id: any) => {
    navigate(`/view/${id}`);
  };

  const handleEdit = async (id: any) => {
    setAddUser(true)
  const datas = data?.filter((item)=>item.id===id);
  const dataObj=datas && datas[0];
  setEditUserData(dataObj);
  // console.log(dataObj);
  
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
  };

  const handleOpen = ()=>{
    setAddUser(true);
    setEditUserData("");
  }

  return (
    <div>
      <h1>RTK tutorial</h1>
      {isLoading && <h2>...loading</h2>}
      {isFetching && <h2>...fetching</h2>}
      {error && <h2>Something went wrong</h2>}
      <div className="my-4 d-flex justify-content-center align-items-center">
        <Button variant="primary" onClick={handleOpen}>
          Add user
        </Button>
      </div>
      {isSuccess && (
        <div>
          <Table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((users: any, index: any) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{users.name}</td>
                  <td>{users.email}</td>
                  <td>
                    <Button
                      onClick={() => handleViewUsers(users.id)}
                      variant="primary"
                    >
                      View
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => handleEdit(users.id)}
                      variant="primary"
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => handleDelete(users.id)}
                      variant="primary"
                    >
                      Delete
                    </Button>
                  </td>
                  {/* <td>
                    <ViewUsers id={users.id} />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {
        addUser  && 
        <AddUserModal setEditUserData={setEditUserData} editUserData={editUserData} addUser={addUser} setAddUser={setAddUser} />
      }

    </div>
  );
};

export default Home;

// const ViewUsers=({id}:{id:any})=>{
//   const {data}=useSingleUserQuery(id);
//   return(<pre>{JSON.stringify(data)}</pre>)
// }
