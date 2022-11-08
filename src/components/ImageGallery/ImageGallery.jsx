import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
export const ImageGallery = ({ gallery, openModal }) => {
  return (
    <>
      <Gallery>
        {gallery.map(({ id, webformatURL }, index) => {
          return (
            <ImageGalleryItem
              key={id}
              smallImg={webformatURL}
              id={id}
              index={index}
              openModal={openModal}
            />
          );
        })}
      </Gallery>
    </>
  );
  // }
};
