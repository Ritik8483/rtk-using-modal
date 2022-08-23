import React, { useEffect, useState } from "react";
import { CloseButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  useAddUserDataMutation,
  useUpdateUserMutation,
} from "../redux/UserApi";

const AddUserModal = (props: any) => {
  const { addUser, setAddUser, editUserData, setEditUserData } = props;

  const [inputText, setInputText] = useState({
    name: editUserData.name || "",
    email: editUserData.email || "",
  });
  // useEffect(()=>{
  //   if(editUserData.id){
  //     setInputText(inputText)
  //   }
  //   else{
  //     setInputText("");
  //   }
  // },[]);
  const [addUserData] = useAddUserDataMutation();
  const [updateUser] = useUpdateUserMutation();

  //   const {refetch}=useAllUsersQuery();

  const { name, email } = inputText;
  const inputEvent = (event: any) => {
    console.log("eve", event);
    const name = event.target.name;
    const value = event.target.value;
    setInputText((last) => {
      return {
        ...last,
        [name]: value,
      };
    });
  };
  const submitForm = async (e: any) => {
    e.preventDefault();
    if (editUserData.id) {
      await updateUser({ ...inputText, id: editUserData.id });
      setTimeout(() => {
        setAddUser(false);
      }, 10);
    } else {
      await addUserData(inputText);
      console.log("inputText", inputText);
      setTimeout(() => {
        // refetch();
        setAddUser(false);
      }, 10);
    }
  };

  
  const handleClose = () => {
    setAddUser(false);
    setEditUserData("");
  };
  


  return (
    <div>
      {/* backdrop={setEditUserData('')} */}
      <Modal show={addUser} onHide={setAddUser}>
        <Modal.Header>
          <Modal.Title>{editUserData.id ? "Edit" : "Add"} User</Modal.Title>
          <div>
            <CloseButton onClick={handleClose} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={submitForm}
            className="d-flex flex-column gap-3 w-100"
          >
            <input type="text" name="name" value={name} onChange={inputEvent} />
            <input
              type="text"
              name="email"
              value={email}
              onChange={inputEvent}
            />
            <div>
              <Button
                variant="secondary"
                onClick={() => {
                  setAddUser(false);
                  setEditUserData("");
                }}
              >
                Close
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal.Body>
        {/* <Modal.Footer> */}

        {/* </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default AddUserModal;
