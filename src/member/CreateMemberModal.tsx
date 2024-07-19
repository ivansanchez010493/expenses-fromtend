import { Button, Form, Modal } from "react-bootstrap";
import { postMember } from "./ApiService";
import { useEffect, useState } from "react";
import { Member } from "../models/Member";

interface AddMemberFormProperties {
    displayModal: boolean;
    closeModal: () => void;
    updateTable: (member:Member, action:string) => void;
    initialMember: Member;
    action: string
}

const AddMemberForm: React.FC<AddMemberFormProperties> = ({displayModal, closeModal, updateTable, initialMember, action}) => {
    const [formData, setFormData] = useState<Member>({...initialMember});

    useEffect(() => {
        setFormData({ ...initialMember });
      }, [initialMember]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    const submitMember = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response = postMember(formData);
          console.log('Data posted successfully:', response);
          updateTable(await response, action);
          setFormData(initialMember);
          closeModal();
        } catch (error) {
          console.error('Error posting data:', error);
        }
      };

    return(
        <Modal show={displayModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Member Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitMember}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" 
                        name="name" value={formData.name} onChange={handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formLastName" className="mt-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name"
                        name="lastName" value={formData.lastName} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formPhone" className="mt-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="phone" placeholder="5512345678"
                        name="phone" value={formData.phone} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="example@mail.com"
                        name="email" value={formData.email} onChange={handleChange} required/>
                    </Form.Group>
                    <Button className="btn btn-danger mt-3 mx-1" onClick={closeModal}>
                        Close
                    </Button>
                    <Button className="btn btn-sucess mt-3 mx-1" type="submit">
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddMemberForm;