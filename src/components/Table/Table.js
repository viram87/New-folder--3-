import React from "react";
import PropTypes from "prop-types";
import "./Table.css"; // Import CSS file for Table styling

const Table = ({ searchData }) => {
  console.log('searchData: ', searchData);
  // Calculate the number of items per page

  // Slice the searchData array to show only items for the current page

  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {searchData.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  searchData: PropTypes.array.isRequired,
};

export default Table;
