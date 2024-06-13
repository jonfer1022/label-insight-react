import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../Home';
import { PhotosContext } from '../../../Context/providers/photos.provider';
import axiosInstance from '../../../utils/fetcher';
import { TPhoto, TPhotoUpdate } from '../../../utils/types';

jest.mock('../../../utils/fetcher');

const mockPhotosContext = {
  photos: [] as TPhotoUpdate[],
  handleSetPhotos: jest.fn(),
};

const mockPhotos: TPhoto[] = [
  {
    id: 1,
    title: 'Photo 1',
    url: 'http://example.com/photo1.jpg',
    thumbnailUrl: 'http://example.com/thumb1.jpg',
    albumId: 1,
    description: 'Description 1',
  },
  {
    id: 2,
    title: 'Photo 2',
    url: 'http://example.com/photo2.jpg',
    thumbnailUrl: 'http://example.com/thumb2.jpg',
    albumId: 1,
    description: 'Description 2',
  },
];

describe.only('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: mockPhotos });
  });

  const renderComponent = (contextValue = mockPhotosContext) => {
    return render(
      <PhotosContext.Provider value={contextValue}>
        <Home />
      </PhotosContext.Provider>,
    );
  };

  it('should render the component and fetch photos', async () => {
    renderComponent();

    expect(screen.getByText('Label Insight App')).toBeInTheDocument();
    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(2));
  });

  it('should open the modal when a photo is clicked', async () => {
    renderComponent();
    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(2));

    const photo = screen.getAllByRole('img')[0];
    fireEvent.click(photo);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should call handleSetPhotos when the update button is clicked', async () => {
    renderComponent();
    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(2));

    const photo = screen.getAllByRole('img')[0];
    fireEvent.click(photo);

    const descriptionTextarea =
      screen.getByPlaceholderText('Add a description');
    fireEvent.change(descriptionTextarea, {
      target: { value: 'Updated Description' },
    });

    const updateButton = screen.getByRole('button', { name: /update/i });
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockPhotosContext.handleSetPhotos).toHaveBeenCalledWith({
        id: 1,
        description: 'Updated Description',
      });
    });
  });

  it('should close the modal when the cancel button is clicked', async () => {
    renderComponent();
    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(2)); // Ajusta según el número de imágenes

    const photo = screen.getAllByRole('img')[0];
    fireEvent.click(photo);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('should compare and update photos based on context photos', async () => {
    const updatedPhotos: TPhotoUpdate[] = [
      { id: 1, description: 'Updated Description 1' },
      { id: 2, description: 'Updated Description 2' },
    ];

    renderComponent({ ...mockPhotosContext, photos: updatedPhotos });

    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(2));

    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'Photo 1');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'Photo 2');

    const photos = screen
      .getAllByRole('img')
      .map((img) => img.getAttribute('alt'));
    expect(photos).toEqual(['Photo 1', 'Photo 2']);
  });
});
