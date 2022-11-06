import { Formik, Form } from 'formik';

const initualeValues = {
  search: '',
};
export const Searchbar = ({ onSubmit }) => {
  return (
    <div>
      <Fotmik>
        <header>
          <Form>
            <button type="submit" class="button">
              <span class="button-label">Search</span>
            </button>

            <input
              class="input"
              type="text"
              autocomplete="off"
              autofocus
              placeholder="Search images and photos"
            />
          </Form>
        </header>
      </Fotmik>
    </div>
  );
};
