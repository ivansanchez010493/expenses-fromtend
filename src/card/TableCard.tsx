import { useState, useEffect } from "react";
import { Card } from "../models/Card";
import { deleteCard, getCards } from "./CardAPIClient";
import Actions from "../common/ActionButtons";
import { Button, Col, Row, Table } from "react-bootstrap";
import AddCardForm from "./CreateCardModal";
import '../common/CommonStyles.css';

const TableCard =() => {
    const initialCard = {bankName: ''};
    const [card, setCard] = useState<Card>(initialCard);
    const[show, setShow] = useState(false);
    const[action, setAction] = useState('');

    const onClickEdit = (card: Card) => {
        setAction('edit');
        setCard(card);
        setShow(true);
        console.log('Edit card.');
    };

    const onClickRemove = (cardId: any) => {
        deleteCard(cardId);
        setCards(cards.filter(card => card.cardId !== cardId));
        console.log('Remove card.');
    };

    const onClickAdd = () => {
        setAction('create');
        setShow(true);
        setCard(initialCard);;
    };

    const closeModal = () => {
        setShow(false);
        setCard(initialCard);
    };

    const updateTable = (cardDto:Card, action: string) => {
        if(action === 'create')
            setCards([...cards, cardDto]);
        
        if(action === 'edit'){
            const updatedCards = cards.map(card =>
                card.cardId === cardDto.cardId ? cardDto : card
            );
            setCards(updatedCards);
        }
    };

    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const cardsData = await getCards();
                setCards(cardsData);
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        fetchCards();
    }, []);

    return (
        <>
        <div className="mt-4 container">
            <Row>
                <Col>
                    <h2>Card</h2>
                </Col>
                <Col className="text-end">
                    <Button variant="success" onClick={onClickAdd}>New Card</Button>
                </Col>
            </Row>
        </div>
        <div className="table-responsive container">
            <Table hover className="table table-striped table-bordered text-center">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Bank Name</th>
                        <th>Ending Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map((card) => (
                        <tr key={card.cardId}>
                            <td>{card.cardId}</td>
                            <td>{card.bankName}</td>
                            <td>{card.endingNumber}</td>
                            <td>{<Actions onClickEdit={() => onClickEdit(card)} onClickRemove={() => onClickRemove(card.cardId)}/>}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        <AddCardForm 
            displayModal={show} 
            closeModal={closeModal} 
            updateTable={updateTable} 
            initialCard={card}
            action={action}
        /></>
    );
}

export default TableCard;