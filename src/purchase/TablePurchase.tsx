import { useState, useEffect } from "react";
import Actions from "../common/ActionButtons";
import { Button, Col, Row } from "react-bootstrap";
import { Purchase } from "../models/Purchase";
import { deletePurchase, getPurchases } from "./PurchaseAPIClient";
import AddPurchaseForm from "./CreatePurchaseModal";

const TablePurchase =() => {
    const initialPurchase = {itemName: '', category: '', amount: 0.0, purchaseDate: ''};
    const [purchase, setPurchase] = useState<Purchase>(initialPurchase);
    const[show, setShow] = useState(false);
    const[action, setAction] = useState('');

    const createOrEdit = (action: string, purchase?: Purchase) => {
        setAction(action);
        setPurchase(purchase ?? initialPurchase);
        setShow(true);
        console.log('Edit Purchase.');
    };

    const onClickRemove = (purchaseId: any) => {
        deletePurchase(purchaseId);
        setPurchases(purchases.filter(purchase => purchase.purchaseId !== purchaseId));
        console.log('Remove purchase.');
    };

    const closeModal = () => {
        setShow(false);
        setPurchase(initialPurchase);
    };

    const updateTable = (purchaseDto:Purchase, action: string) => {
        if(action === 'create')
            setPurchases([...purchases, purchaseDto]);
        
        if(action === 'edit'){
            const updatedPurchase = purchases.map(purchase =>
                purchase.purchaseId === purchaseDto.purchaseId ? purchaseDto : purchase
            );
            setPurchases(updatedPurchase);
        }
    };

    const [purchases, setPurchases] = useState<Purchase[]>([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const membersData = await getPurchases();
                setPurchases(membersData);
            } catch (error) {
                console.error('Error fetching purchases:', error);
            }
        };

        fetchPurchases();
    }, []);

    return (
        <><div className="container mt-4">
            <h2>Purchases</h2>
            <table className="table table-striped table-bordered text-center">
                <thead className="thead-dark">
                    <tr>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Paid Off</th>
                    </tr>
                </thead>
                <tbody>
                    {purchases.map((purchase) => (
                        <tr key={purchase.purchaseId}>
                            <td>{purchase.itemName}</td>
                            <td>{purchase.category}</td>
                            <td>{purchase.amount}</td>
                            <td>{purchase.purchaseDate}</td>
                            <td>{<Actions onClickEdit={() => createOrEdit('edit', purchase)} onClickRemove={() => onClickRemove(purchase.purchaseId)}/>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Row>
                <Col className="text-end">
                    <Button variant="success" onClick={() => createOrEdit('create')}>New Purchase</Button>
                </Col>
            </Row>
        </div>
        <AddPurchaseForm 
            displayModal={show} 
            closeModal={closeModal} 
            updateTable={updateTable} 
            initialPurchase={purchase}
            action={action}
        /></>
    );
}

export default TablePurchase;