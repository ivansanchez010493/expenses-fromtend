import { Button, Form, Modal } from "react-bootstrap";
import { postPurchase } from "./PurchaseAPIClient";
import { useEffect, useState } from "react";
import { Purchase } from "../models/Purchase";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

interface AddPurchaseFormProperties {
    displayModal: boolean;
    closeModal: () => void;
    updateTable: (purchase:Purchase, action:string) => void;
    initialPurchase: Purchase;
    action: string
}

const AddPurchaseForm: React.FC<AddPurchaseFormProperties> = ({displayModal, closeModal, updateTable, initialPurchase, action}) => {
    const [formData, setFormData] = useState<Purchase>({...initialPurchase});
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        setFormData({ ...initialPurchase });
      }, [initialPurchase]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const submitPurchase = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response = postPurchase(formData);
          console.log('Data posted successfully:', response);
          updateTable(await response, action);
          setFormData(initialPurchase);
          closeModal();
        } catch (error) {
          console.error('Error posting data:', error);
        }
      };

    return(
        <Modal show={displayModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Purchases</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitPurchase}>
                    <Form.Group controlId="formItem">
                        <Form.Label>Item</Form.Label>
                        <Form.Control type="text" placeholder="Item name" 
                        name="item" value={formData.itemName} onChange={handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formCategory" className="mt-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Category name"
                        name="category" value={formData.category} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formAmount" className="mt-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" placeholder="0.0"
                        name="amount" value={formData.amount} onChange={handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formPurchaseDate" className="mt-3">
                        <Form.Label>Purchase Date</Form.Label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy/MM/dd"
                        />
                        {/* <Form.Control type="date" placeholder="example@mail.com"
                        name="email" value={formData.email} onChange={handleChange} required/> */}
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

export default AddPurchaseForm;