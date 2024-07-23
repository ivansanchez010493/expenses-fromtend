import { useState, useEffect } from "react";
import Actions from "../common/ActionButtons";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Member } from "../models/Member";
import { deleteMember, getMembers } from "./MemberAPIClient";
import AddMemberForm from "./CreateMemberModal";
import '../common/CommonStyles.css';

const TableMember =() => {
    const initialMember = {name: '', lastName: '', email: ''};
    const [member, setMember] = useState<Member>(initialMember);
    const[show, setShow] = useState(false);
    const[action, setAction] = useState('');

    const onClickEdit = (member: Member) => {
        setAction('edit');
        setMember(member);
        setShow(true);
        console.log('Edit Member.');
    };

    const onClickRemove = (memberId: any) => {
        deleteMember(memberId);
        setMembers(members.filter(member => member.memberId !== memberId));
        console.log('Remove member.');
    };

    const onClickAdd = () => {
        setAction('create');
        setShow(true);
        setMember(initialMember);;
    };

    const closeModal = () => {
        setShow(false);
        setMember(initialMember);
    };

    const updateTable = (memberDto:Member, action: string) => {
        if(action === 'create')
            setMembers([...members, memberDto]);
        
        if(action === 'edit'){
            const updatedMember = members.map(member =>
                member.memberId === memberDto.memberId ? memberDto : member
            );
            setMembers(updatedMember);
        }
    };

    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const membersData = await getMembers();
                setMembers(membersData);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, []);

    return (
        <>
        <div className="mt-4 container">
            <Row>
                <Col>
                    <h2>Members</h2>
                </Col>
                <Col className="text-end">
                    <Button variant="success" onClick={onClickAdd}>New Member</Button>
                </Col>
            </Row>
        </div>
        <div className="table-responsive container">
            <Table hover className="table table-striped table-bordered text-center">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.memberId}>
                            <td>{member.memberId}</td>
                            <td>{member.name} {member.lastName}</td>
                            <td>{member.phone}</td>
                            <td>{member.email}</td>
                            <td>{<Actions onClickEdit={() => onClickEdit(member)} onClickRemove={() => onClickRemove(member.memberId)}/>}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        <AddMemberForm 
            displayModal={show} 
            closeModal={closeModal} 
            updateTable={updateTable} 
            initialMember={member}
            action={action}
        /></>
    );
}

export default TableMember;