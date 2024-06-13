import React from 'react';
import { TPhoto } from '../../utils/types';
import { Button, Col } from 'react-bootstrap';

interface ICardImage {
  photo: TPhoto;
  onClick: () => void;
}

export const CardImage = ({ photo, onClick }: ICardImage) => {
  return (
    <Col
      className="d-flex justify-content-center mt-3"
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
    >
      <Button variant="outline-light" className="p-0" onClick={onClick}>
        <img
          className="rounded pointer"
          src={photo.url}
          alt={photo.title}
          style={{ width: '100%', height: 'auto' }}
        />
      </Button>
    </Col>
  );
};
