import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Edit, Trash } from 'react-feather';

import { Button } from '../Form/Form';

import './Table.css';

const Table = ({
  data, onEdit, onDelete, isLoading,
}) => (
  <div className="table-wrapper">
    <table className="table">
      <thead className="thead">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Class</th>
          <th scope="col">Email</th>
          <th scope="col">Date</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      {isLoading
        ? (
          <tbody>
            {[...Array(5)].map(() => (
              <tr>
                <td><Skeleton height="40px" /></td>
                <td><Skeleton height="40px" /></td>
                <td><Skeleton height="40px" /></td>
                <td><Skeleton height="40px" /></td>
                <td><Skeleton height="40px" /></td>
              </tr>
            ))}
          </tbody>
        )
        : (
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.classVar}</td>
                <td>{item.email}</td>
                <td>
                  {new Date(item.createdAt).toLocaleDateString(undefined, {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </td>
                <td className="action-col">
                  <Button label={<Edit /> || 'Edit'} onClickHandler={() => onEdit(item.id)} />
                  <Button label={<Trash /> || 'Delete'} onClickHandler={() => onDelete(item.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        )}

    </table>
  </div>
);

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      classVar: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Table;
