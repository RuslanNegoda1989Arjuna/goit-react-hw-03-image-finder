import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
export const ImageGallery = ({ gallery }) => {
  return (
    <>
      <Gallery>
        {gallery.map(({ id, webformatURL }) => {
          return <ImageGalleryItem key={id} smallImg={webformatURL} id={id} />;
        })}
      </Gallery>
    </>
  );
  // }
};
