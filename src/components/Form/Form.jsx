import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import './Form.css';
import axios from 'axios';

const TextField = ({
  placeholder, value, onChangeHandler, name,
}) => (
  <div className="text-field">
    <input
      type="text"
      name={name}
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={onChangeHandler}
    />
  </div>
);

export const Button = ({ label, onClickHandler }) => (
  <div
    className="btn"
    onClick={onClickHandler}
    onKeyPress={onClickHandler}
    role="button"
    tabIndex={-1}
  >
    {label}
  </div>
);

const Form = ({
  getData, isEdit, setEdit, isLoading,
}) => {
  const [nameVar, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [classVar, setClassVar] = React.useState('');

  useEffect(() => {
    if (isEdit.isEdit) {
      setName(isEdit.data.name);
      setEmail(isEdit.data.email);
      setClassVar(isEdit.data.classVar);
    }
  }, [isEdit]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'classVar') {
      setClassVar(value);
    }
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setClassVar('');
    setEdit({ isEdit: false, data: {} });
  };

  const addData = async () => {
    const body = {
      name: nameVar,
      email,
      classVar,
      password: '12345',
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/add`,
      body,
    );
    if (data.code === 200) {
      return { error: false, message: data.message };
    }
    return { error: true, message: data.message };
  };

  const editData = async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/update`,
      {
        id: isEdit.data.id,
        name: nameVar,
        email,
        classVar,
        password: '12345',
      },
    );
    if (data.code === 200) {
      return { error: false, message: data.message };
    }
    return { error: true, message: data.message };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    if (isEdit.isEdit) {
      data = await editData();
    } else {
      data = await addData();
    }
    if (!data.error) {
      clearForm();
      getData();
    } else {
      // eslint-disable-next-line no-alert
      alert(data.message);
    }
  };

  return (
    <div>
      {isLoading
        ? (
          <div className="form-wrapper ">
            <Skeleton width="300px" height="40px" style={{ margin: '5px' }} />
            <Skeleton width="300px" height="40px" style={{ margin: '5px' }} />
            <Skeleton width="300px" height="40px" style={{ margin: '5px' }} />
          </div>
        )
        : (
          <form className="form-wrapper " onSubmit={handleSubmit}>
            <TextField
              placeholder="Name"
              name="name"
              onChangeHandler={onChangeHandler}
              value={nameVar}
            />
            <TextField
              placeholder="Class"
              name="classVar"
              onChangeHandler={onChangeHandler}
              value={classVar}
            />
            <TextField
              placeholder="Email"
              name="email"
              onChangeHandler={onChangeHandler}
              value={email}
            />
            {isEdit.isEdit ? (
              <>
                <Button label="Update" onClickHandler={handleSubmit} />
                <Button label="Clear" onClickHandler={clearForm} />
              </>
            ) : (
              <Button label="Add" onClickHandler={handleSubmit} />
            )}
          </form>
        )}
    </div>
  );
};

Form.propTypes = {
  getData: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  isEdit: PropTypes.object.isRequired,
  setEdit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

TextField.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeHandler: PropTypes.func,
  name: PropTypes.string,
};
TextField.defaultProps = {
  placeholder: '',
  value: '',
  onChangeHandler: () => {},
  name: '',
};
Button.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  label: PropTypes.any,
  onClickHandler: PropTypes.func,
};
Button.defaultProps = {
  label: '',
  onClickHandler: () => {},
};

export default Form;
