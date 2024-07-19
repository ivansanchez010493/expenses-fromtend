import React from 'react';
import { Button } from 'react-bootstrap';

interface ButtonProps {
  onClickEdit: ()  => void;
  onClickRemove: () => void;
};

const Actions: React.FC<ButtonProps> = ({ onClickEdit, onClickRemove }) => {
  return (
    // <footer className="footer mt-auto py-3 bg-light">
      <div className="container text-center">
        <Button className="btn btn-warning mx-1" onClick={onClickEdit}>
          Edit
        </Button>
        <Button className="btn btn-danger mx-1" onClick={onClickRemove}>
          Remove
        </Button>
      </div>
    // </footer>
  );
};

export default Actions;