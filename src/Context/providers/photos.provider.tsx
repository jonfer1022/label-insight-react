import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
import { TPhotoUpdate } from '../../utils/types';

export type PhotosContextType = {
  photos: TPhotoUpdate[];
  handleSetPhotos: (photos: TPhotoUpdate) => void;
};

export const PhotosContext = createContext<PhotosContextType>({
  photos: [],
  handleSetPhotos: () => {},
});

export const PhotosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [photos, setPhotos] = useState<TPhotoUpdate[]>([]);

  useEffect(() => {
    const _photos = localStorage.getItem('photos');
    if (_photos) setPhotos(JSON.parse(_photos));
  }, []);

  const handleSetPhotos = (_photos: TPhotoUpdate) => {
    setPhotos((prevPhotos) => {
      const index = prevPhotos.findIndex((p) => p.id === _photos.id);
      if (index !== -1) {
        prevPhotos[index] = _photos;
      } else prevPhotos.push(_photos);
      localStorage.setItem('photos', JSON.stringify(prevPhotos));
      return [...prevPhotos];
    });
  };

  return (
    <PhotosContext.Provider value={{ photos, handleSetPhotos }}>
      {children}
    </PhotosContext.Provider>
  );
};
