import { Button, Form, Modal } from "react-bootstrap";
import { postCard } from "./ApiService";
import { useEffect, useState } from "react";
import { Card } from "../models/Card";

interface AddCardFormProperties {
    displayModal: boolean;
    closeModal: () => void;
    updateTable: (card:Card, action:string) => void;
    initialCard: Card;
    action: string
}

const AddCardForm: React.FC<AddCardFormProperties> = ({displayModal, closeModal, updateTable, initialCard, action}) => {
    const [formData, setFormData] = useState<Card>({...initialCard});

    useEffect(() => {
        setFormData({ ...initialCard });
      }, [initialCard]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    const submitCard = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response = postCard(formData);
          console.log('Data posted successfully:', response);
          updateTable(await response, action);
          setFormData(initialCard);
          closeModal();
        } catch (error) {
          console.error('Error posting data:', error);
        }
      };

    return(
        <Modal show={displayModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Card Infomation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitCard}>
                    <Form.Group controlId="formBankName">
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Control type="text" placeholder="Bank name" 
                        name="bankName" value={formData.bankName} onChange={handleChange} required/>
                    </Form.Group>

                    <Form.Group controlId="formEndingNumber" className="mt-3">
                        <Form.Label>Ending number</Form.Label>
                        <Form.Control type="number" placeholder="1234"
                        name="endingNumber" value={formData.endingNumber} onChange={handleChange} required />
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

export default AddCardForm;