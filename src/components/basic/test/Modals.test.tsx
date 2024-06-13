import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ModalImage } from '../Modals';
import { TPhoto } from '../../../utils/types';

const setWindowSize = (width: number) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

describe('ModalImage', () => {
  const photo: TPhoto = {
    id: 1,
    title: 'Test Photo',
    url: 'http://example.com/photo.jpg',
    thumbnailUrl: 'http://example.com/thumbnail.jpg',
    albumId: 1,
    description: 'Test Description',
  };

  const mockSetShowModal = jest.fn();
  const mockUpdatePhoto = jest.fn();

  beforeEach(() => {
    render(
      <ModalImage
        showModal={true}
        setShowModal={mockSetShowModal}
        updatePhoto={mockUpdatePhoto}
        photo={photo}
      />,
    );
  });

  it('should render the modal with the correct content', async () => {
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByAltText('Test Photo')).toBeInTheDocument();
    expect(screen.getByText('Test Photo')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
  });

  it('should call setShowModal with false when close button is clicked', async () => {
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /close/i }));
    });
    expect(mockSetShowModal).toHaveBeenCalledWith(false);
  });

  it('should call updatePhoto with the updated description when Update button is clicked', async () => {
    const updatedDescription = 'Updated Description';
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Add a description'), {
        target: { value: updatedDescription },
      });
      fireEvent.click(screen.getByRole('button', { name: /update/i }));
    });
    expect(mockUpdatePhoto).toHaveBeenCalledWith({
      ...photo,
      description: updatedDescription,
    });
  });

  it('should call setShowModal with false when Cancel button is clicked', async () => {
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    });
    expect(mockSetShowModal).toHaveBeenCalledWith(false);
  });

  it('should be responsive and adjust layout based on screen width', async () => {
    const imgElement = screen.getByAltText('Test Photo');
    const formElement =
      screen.getByText('Description').parentElement?.parentElement
        ?.parentElement;

    // Set window size to 576px (sm breakpoint)
    await act(async () => {
      setWindowSize(576);
    });
    expect(imgElement.parentElement).toHaveClass('col-md-8');
    expect(formElement).toHaveClass('col-md-4');

    // Set window size to 768px (md breakpoint)
    await act(async () => {
      setWindowSize(768);
    });
    expect(imgElement.parentElement).toHaveClass('col-md-8');
    expect(formElement).toHaveClass('col-md-4');

    // Set window size to 992px (lg breakpoint)
    await act(async () => {
      setWindowSize(992);
    });
    expect(imgElement.parentElement).toHaveClass('col-md-8');
    expect(formElement).toHaveClass('col-md-4');

    // Set window size to 1200px (xl breakpoint)
    await act(async () => {
      setWindowSize(1200);
    });
    expect(imgElement.parentElement).toHaveClass('col-md-8');
    expect(formElement).toHaveClass('col-md-4');
  });
});
