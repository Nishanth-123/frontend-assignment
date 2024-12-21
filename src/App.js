import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchProjects } from './services/products';

function App() {

  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
      console.log(data);
    })
  }, [])

  const totalPages = useMemo(() => Math.ceil(projects.length / itemsPerPage), [projects.length]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  const currentProjects = useMemo(() => {
    const startIndex = currentPage * itemsPerPage;
    return projects.slice(startIndex, startIndex + itemsPerPage);
  }, [projects, currentPage]);

  return (
    <div className="app-container">
      <h1>Kickstarter Projects</h1>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.map((project, index) => (
            <tr key={index}>
              <td>{project['s.no']}</td>
              <td>{project['percentage.funded']}</td>
              <td>{project['amt.pledged']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>Previous</button>
        <span>{` Page ${currentPage + 1} of ${totalPages} `}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Next</button>
      </div>
    </div>
  );
};

export default App;
