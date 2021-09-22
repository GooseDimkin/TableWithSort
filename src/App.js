import './App.css';
import Table from './components/table/Table';
import { useEffect, useState } from 'react';
import Pagination from './components/pagination/Pagination';

function App() {

  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getData = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/data');
        const jsonData = await response.json();
        
        setData(jsonData)
    } catch (err) {
        console.log(err.message)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Table data={data} currentPosts={currentPosts} postsPerPage={postsPerPage} totalPosts={data.length} paginate={paginate} />
    </div>
  );
}

export default App;
