import { BtnLoad } from './Button.styled';

export const LoadeMore = ({ onClick }) => {
  return (
    <BtnLoad type="button" onClick={onClick}>
      Load
    </BtnLoad>
  );
};
