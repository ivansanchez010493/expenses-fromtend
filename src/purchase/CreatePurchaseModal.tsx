import { Button, Form, Modal } from "react-bootstrap";
import { postPurchase } from "./PurchaseAPIClient";
import { useEffect, useState } from "react";
import { Purchase } from "../models/Purchase";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse } from "date-fns";

interface AddPurchaseFormProperties {
    displayModal: boolean;
    closeModal: () => void;
    updateTable: (purchase:Purchase, action:string) => void;
    initialPurchase: Purchase;
    action: string
}

const AddPurchaseForm: React.FC<AddPurchaseFormProperties> = ({displayModal, closeModal, updateTable, initialPurchase, action}) => {
    const [formData, setFormData] = useState<Purchase>({...initialPurchase});
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [purchaseAmount, setPurchaseAmount] = useState('0.00');

    useEffect(() => {
        setFormData({ ...initialPurchase });

        //Set existed date at edit purchase
        if(typeof(initialPurchase.purchaseDate) === 'string'){
            setSelectedDate(parse(initialPurchase.purchaseDate, 'dd/MM/yyyy', new Date()));
        }else{
            setSelectedDate(new Date());
        }
    }, [initialPurchase]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const amountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const amount = e.target.value;
        if (amount === '' || /^\d*\.?\d{0,2}$/.test(amount)) {
            setPurchaseAmount(amount);
        }
    };

    const submitPurchase = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

          //Set selected date before post purchase
          if(selectedDate){
            const formattedDate = format(selectedDate, 'dd/MM/yyyy');
            formData.purchaseDate = parse(formattedDate, 'dd/MM/yyyy', new Date());
          }
          formData.amount = parseFloat(purchaseAmount);
          const response = postPurchase(formData);
          console.log('Data posted successfully:', response);
          updateTable(await response, action);
          setFormData(initialPurchase);
          setSelectedDate(new Date());
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
                    <Form.Group controlId="formItemName" className="mt-3">
                        <Form.Label>Item name</Form.Label>
                        <Form.Control type="text" placeholder="Item name"
                        name="itemName" value={formData.itemName} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formCategory" className="mt-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Category name"
                        name="category" value={formData.category} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formAmount" className="mt-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="text" placeholder="0.0"
                        name="amount" onChange={amountChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formPurchaseDate" className="mt-3">
                        <Form.Label>Purchase Date</Form.Label>
                        <DatePicker
                            className="form-control"
                            selected={selectedDate}
                            onChange={(date: Date | null) => setSelectedDate(date)}
                            dateFormat="dd/MM/yyyy"
                            required
                        />
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