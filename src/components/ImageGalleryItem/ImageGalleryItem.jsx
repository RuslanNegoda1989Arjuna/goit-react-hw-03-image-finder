import { GalleryItem, ImageSm } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, smallImg, index, openModal }) => {
  return (
    <GalleryItem className="gallery-item" key={id}>
      <ImageSm src={smallImg} alt="" onClick={() => openModal(index)} />
    </GalleryItem>
  );
};
