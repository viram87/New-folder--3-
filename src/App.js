import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { getCountries } from "./api/countriesApi";
import "./App.css";
import Loader from "./components/Loader/index";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table/Table";

// Debounce function
const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

function App() {
  const pageArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [state, setState] = useState({
    countriesData: [],
    currentPage: 1,
    perPageLimit: 3,
    totalCount: 0,
    loader: false,
  });

  useEffect(() => {
    fetchCountries(state.currentPage);
  }, [state.currentPage, state.perPageLimit]);

  const fetchCountries = async (
    page = state.currentPage,
    searchQuery = "",
    perPage = state.perPageLimit
  ) => {
    setState((prevState) => ({ ...prevState, loader: true }));
    try {
      const response = await getCountries({
        currentOffset: page,
        limit: perPage,
        namePrefix: searchQuery,
      });
      setState((prevState) => ({
        ...prevState,
        countriesData: response?.data?.data,
        totalCount: response?.data?.metadata?.totalCount,
        loader: false,
      }));
    } catch (error) {
      console.error(error);
      setState((prevState) => ({ ...prevState, loader: false }));
    }
  };

  // Debounce the handleSearch function
  const debouncedSearch = debounce((query) => {
    fetchCountries(1, query);
    setState((prevState) => ({ ...prevState, currentPage: 1 }));
  }, 500);

  const handleSearch = (query) => {
    debouncedSearch(query);
  };

  const handlePageChange = (page) => {
    setState((prevState) => ({
      ...prevState,
      currentPage: page?.selected + 1,
    }));
  };

  const handleLimitChange = (event) => {
    const limit = parseInt(event.target.value);
    if (!isNaN(limit) && limit >= 0 && limit <= 10) {
      setState((prevState) => ({
        ...prevState,
        perPageLimit: limit,
        currentPage: 1,
      }));
    }
  };

  const { countriesData, currentPage, perPageLimit, totalCount, loader } =
    state;

  return (
    <>
      {loader && <Loader />}
      <div className="container">
        <SearchBox onSearch={handleSearch} />
        <Table searchData={countriesData} loader={loader} />

        <div className="pagination-container">
          <ReactPaginate
            disabledLinkClassName="disabled"
            className=""
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageChange}
            pageRangeDisplayed={perPageLimit}
            pageCount={Math.ceil(totalCount / perPageLimit)}
            previousLabel="< Previous"
            containerClassName={"pagination"}
            activeClassName={"active"}
            renderOnZeroPageCount={null}
          />
          <div className="pagination-limit">
            <input
              id="perPageLimit"
              type="number"
              value={perPageLimit}
              onChange={handleLimitChange}
            />

            {perPageLimit >= 10 && (
              <p className="warning">
                Please select a value less than or equal to 10.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
