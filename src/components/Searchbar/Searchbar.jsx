import { Formik, Form, Field } from 'formik';
import { Searchbar } from './Searchbar.styled';

const initialValues = {
  searchvalue: '',
};
export const Searchbar = ({ onSubmit }) => {
  const searchSubmit = (values, { resetForm }) => {
    console.log(values);
    onSubmit(values);
    resetForm();
  };
  return (
    <Formik initialValues={initialValues} onSubmit={searchSubmit}>
      <Form>
        <Field
          type="text"
          name="searchvalue"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </Form>
    </Formik>
  );
};

//  <Formik initialValues={initialValues} onSubmit={searchSubmit}>
//       <Form>
//         <button type="submit" class="button">
//           <span class="button-label">Search</span>
//         </button>

//         <Field
//           // class="input"
//           type="text"
//           name="searchvalue"
//           autocomplete="off"
//           autofocus
//           placeholder="Search images and photos"
//         />
//       </Form>
//     </Formik>
