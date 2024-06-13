import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CardImage } from '../CardImage';
import { TPhoto } from '../../../utils/types';

const setWindowSize = (width: number) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

describe('CardImage', () => {
  const photo: TPhoto = {
    id: 1,
    title: 'Test Photo',
    url: 'http://example.com/photo.jpg',
    thumbnailUrl: 'http://example.com/thumbnail.jpg',
    albumId: 1,
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    render(<CardImage photo={photo} onClick={mockOnClick} />);
  });

  it('should render the image with the correct src and alt attributes', () => {
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', photo.url);
    expect(imgElement).toHaveAttribute('alt', photo.title);
  });

  it('should call onClick when the button is clicked', () => {
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should apply the correct class names', () => {
    const colElement = screen.getByRole('button').parentElement;
    expect(colElement).toHaveClass('d-flex justify-content-center mt-3');
  });

  it('should be responsive and have different column sizes based on screen width', () => {
    const colElement = screen.getByRole('button').parentElement;

    // Set window size to 576px (sm breakpoint)
    setWindowSize(576);
    expect(colElement).toHaveClass('col-sm-6');

    // Set window size to 768px (md breakpoint)
    setWindowSize(768);
    expect(colElement).toHaveClass('col-md-4');

    // Set window size to 992px (lg breakpoint)
    setWindowSize(992);
    expect(colElement).toHaveClass('col-lg-3');

    // Set window size to 1200px (xl breakpoint)
    setWindowSize(1200);
    expect(colElement).toHaveClass('col-xl-2');
  });
});
