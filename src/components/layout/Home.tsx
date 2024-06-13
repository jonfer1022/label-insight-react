import React, { useEffect, useCallback, useState, useContext } from 'react';
import { Row, Container } from 'react-bootstrap';
import axiosInstance from '../../utils/fetcher';
import { TPhoto, TPhotoUpdate } from '../../utils/types';
import { CardImage } from '../basic/CardImage';
import { ModalImage } from '../basic/Modals';
import { PhotosContext } from '../../Context/providers/photos.provider';

const Home: React.FC = () => {
  const { photos: _photos, handleSetPhotos } = useContext(PhotosContext);
  const [photos, setPhotos] = useState<TPhoto[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [photoSelected, setPhotoSelected] = useState<TPhoto>({} as TPhoto);

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get<TPhoto[]>('/photos');
      setPhotos(response.data.slice(0, 25));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleUpdate = useCallback(
    async (data: TPhoto) => {
      setShowModal(false);
      handleSetPhotos({ id: data.id, description: data.description || '' });
    },
    [handleSetPhotos, setShowModal],
  );

  const comparePhotos = () => {
    _photos.forEach((photo: TPhotoUpdate) => {
      const index = photos.findIndex((p: TPhoto) => p.id === photo.id);
      if (index !== -1) {
        photos[index].description = photo.description;
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (photos.length) comparePhotos();
    // eslint-disable-next-line
  }, [photos, _photos]);

  return (
    <Container className="col-12 p-5" fluid>
      <h1 className="text-center">Label Insight App</h1>
      <Row className="col-12 d-flex justify-content-center">
        {photos.map((photo: TPhoto) => (
          <CardImage
            key={photo.id}
            photo={photo}
            onClick={() => {
              setPhotoSelected(photo);
              setShowModal(true);
            }}
          />
        ))}
      </Row>
      <ModalImage
        photo={photoSelected}
        showModal={showModal}
        setShowModal={setShowModal}
        updatePhoto={handleUpdate}
      />
    </Container>
  );
};

export default Home;
