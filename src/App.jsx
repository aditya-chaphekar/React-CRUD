import React from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import Table from './components/Table/Table';
import Form from './components/Form/Form';

const App = () => {
  const [data, setData] = React.useState([]);
  const [edit, setEdit] = React.useState({ isEdit: false, data: {} });
  const [isLoadingForm, setIsLoadingForm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const getData = async () => {
    setIsLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/list`).then((res) => {
      setData(res.data.data);
      setIsLoading(false);
    });
  };

  const editData = async (id) => {
    setIsLoadingForm(true);
    axios.get(`${process.env.REACT_APP_API_URL}/list/${id}`).then((res) => {
      setEdit({ isEdit: true, data: res.data.data });
      setIsLoadingForm(false);
    });
  };

  const deleteData = async (id) => {
    setIsLoading(true);
    axios.post(`${process.env.REACT_APP_API_URL}/delete`, { id }).then(() => {
      getData();
    });
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App ">
      <Header />
      <Form getData={getData} isEdit={edit} setEdit={setEdit} isLoading={isLoadingForm} />

      <Table data={data} onEdit={editData} onDelete={deleteData} isLoading={isLoading} />
    </div>
  );
};

export default App;
