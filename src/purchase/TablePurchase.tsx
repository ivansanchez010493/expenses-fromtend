import { useState, useEffect } from "react";
import Actions from "../common/ActionButtons";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Purchase } from "../models/Purchase";
import { deletePurchase, getPurchases } from "./PurchaseAPIClient";
import AddPurchaseForm from "./CreatePurchaseModal";
import '../common/CommonStyles.css';

const TablePurchase =() => {
    const initialPurchase = {itemName: '', category: '', amount: 0.0, purchaseDate: new Date()};
    const [purchase, setPurchase] = useState<Purchase>(initialPurchase);
    const [totalSum, setTotalSum] = useState(0);
    const[show, setShow] = useState(false);
    const[action, setAction] = useState('');

    const createOrEdit = (action: string, purchase?: Purchase) => {
        setAction(action);
        setPurchase(purchase ?? initialPurchase);
        setShow(true);
        console.log('Edit Purchase.');
    };

    const onClickRemove = (purchase: any) => {
        const purchaseId = purchase.purchaseId;
        deletePurchase(purchaseId);
        setPurchases(purchases.filter(purchase => purchase.purchaseId !== purchaseId));

        //Update total amount
        setTotalSum(totalSum - purchase.amount);
        console.log('New Sum: ' + totalSum);
        console.log('Remove purchase.');
    };

    const closeModal = () => {
        setShow(false);
        setPurchase(initialPurchase);
    };

    const updateTable = (purchaseDto:Purchase, action: string) => {
        if(action === 'create'){
            setPurchases([...purchases, purchaseDto]);            
            
            //Update total amount
            setTotalSum(totalSum + purchaseDto.amount);
        }
        
        if(action === 'edit'){
            const updatedPurchase = purchases.map(purchase =>
                purchase.purchaseId === purchaseDto.purchaseId ? purchaseDto : purchase
            );
            setPurchases(updatedPurchase);

            //Update total amount
            setTotalSum(updatedPurchase.reduce((acc, purchase) => acc + purchase.amount, 0));
            console.log('New Sum: ' + totalSum);
        }
    };

    const [purchases, setPurchases] = useState<Purchase[]>([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const purchaseData = await getPurchases();
                setPurchases(purchaseData);
                setTotalSum(purchaseData.reduce((acc, purchase) => acc + purchase.amount, 0));
            } catch (error) {
                console.error('Error fetching purchases:', error);
            }
        };

        fetchPurchases();
    }, []);

    return (
        <>
            <div className="mt-4 container">
                <Row>
                    <Col>
                        <h2>Purchases</h2>
                    </Col>
                    <Col className="text-end">
                        <Button variant="success" onClick={() => createOrEdit('create')}>New Purchase</Button>
                    </Col>
                </Row>
            </div>
            <div className="table-responsive container">
                <Table hover className="table table-striped table-bordered text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th>Item</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((purchase) => (
                            <tr key={purchase.purchaseId}>
                                <td>{purchase.itemName}</td>
                                <td>{purchase.category}</td>
                                <td>${purchase.amount.toFixed(2)}</td>
                                <td>{purchase.purchaseDate?.toString()}</td>
                                <td>{<Actions onClickEdit={() => createOrEdit('edit', purchase)} onClickRemove={() => onClickRemove(purchase)}/>}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="container">
                <Row>
                    <Col>
                        <h3>Total Sum: ${totalSum.toFixed(2)}</h3>
                    </Col>
                </Row>
            </div>
            <AddPurchaseForm 
                displayModal={show} 
                closeModal={closeModal} 
                updateTable={updateTable} 
                initialPurchase={purchase}
                action={action}
            />
        </>
    );
}

export default TablePurchase;