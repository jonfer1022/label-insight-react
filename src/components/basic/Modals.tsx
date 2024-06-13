import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import { TPhoto } from '../../utils/types';

interface IModalImage {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  updatePhoto: (photo: TPhoto) => void;
  photo: TPhoto;
}

export const ModalImage = ({
  photo,
  showModal,
  setShowModal,
  updatePhoto,
}: IModalImage) => {
  const [photoSelected, setPhotoSelected] = useState<TPhoto>({} as TPhoto);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    setPhotoSelected(photo);
    setDescription(photo?.description || '');
  }, [photo, showModal]);

  const handleUpdate = () => {
    updatePhoto({ ...photoSelected, description });
    setDescription('');
    setPhotoSelected({} as TPhoto);
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <Row>
          <Col md={8}>
            <img
              src={photo?.url}
              alt={photo?.title}
              style={{ width: '100%', height: 'auto' }}
            />
          </Col>
          <Col md={4}>
            <Form>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={photo?.title}
                  style={{ resize: 'none' }}
                  disabled
                />
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description"
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="mt-3 d-flex justify-content-end">
          <Col className="d-flex justify-content-end">
            <Button variant="outline-primary" onClick={handleUpdate}>
              Update
            </Button>
            <Button
              className="ms-2"
              variant="outline-danger"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
