import logo from "./logo.svg";
import "./App.css";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table/Table";
import Pagination from "./components/Pagination";
import { useState, useEffect } from "react";
import { getCountries } from "./api/countriesApi";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageLimit, setPerPageLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  console.log("totalCount: ", totalCount);

  const fetchCountries = async (
    page = currentPage,
    searchQuery = "",
    perPage = perPageLimit
  ) => {
    try {
      const response = await getCountries({
        currentOffset: page,
        limit: perPage,
        namePrefix: searchQuery,
      });
      setCountriesData(response?.data?.data);
      setTotalCount(response?.data?.metadata?.totalCount);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCountries(currentPage);
  }, [currentPage]);

  const handleSearch = (query) => {
    fetchCountries(1, query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <SearchBox onSearch={handleSearch} />
      {/* <Table searchData={countriesData} /> */}
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        perPage={perPageLimit}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
