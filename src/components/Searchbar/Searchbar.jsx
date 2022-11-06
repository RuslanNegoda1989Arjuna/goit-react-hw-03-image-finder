import { Formik } from 'formik';
import { ButtonSubmit, FormSearch, Header, Input } from './Searchbar.styled';
import { FiSearch } from 'react-icons/fi';

const initialValues = {
  searchvalue: '',
};
export const Searchbar = ({ onSubmit }) => {
  const searchSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };
  return (
    <Formik initialValues={initialValues} onSubmit={searchSubmit}>
      <Header>
        <FormSearch>
          <ButtonSubmit type="submit">
            <span>
              <FiSearch size={20} />
            </span>
          </ButtonSubmit>

          <Input
            type="text"
            name="searchvalue"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </FormSearch>
      </Header>
    </Formik>
  );
};
