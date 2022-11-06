import { GalleryItem, ImageSm } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, smallImg }) => {
  return (
    <GalleryItem className="gallery-item" key={id}>
      <ImageSm src={smallImg} alt="" />
    </GalleryItem>
  );
};
