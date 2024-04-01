import React from "react";
import PropTypes from "prop-types";
import "./Table.css"; // Import CSS file for Table styling
import Loader from "../Loader";

const Table = ({ searchData, loader }) => {
  if (loader) {
    return <Loader />;
  }

  let content = null;

  if (!searchData || searchData.length === 0) {
    content = (
      <tr>
        <td colSpan="3">
          {searchData === null || searchData === undefined || searchData === ""
            ? "Start searching"
            : "No result found"}
        </td>
      </tr>
    );
  } else {
    content = searchData.map((item, index) => (
      <tr key={item.id}>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>
          <div className="country-container">
            <img
              src={`https://flagsapi.com/${item?.countryCode}/flat/16.png`}
            />
            {item.country}
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
};

Table.propTypes = {
  searchData: PropTypes.array,
  loader: PropTypes.bool.isRequired,
};

export default Table;
