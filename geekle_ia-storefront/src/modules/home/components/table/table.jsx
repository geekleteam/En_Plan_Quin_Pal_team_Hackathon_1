import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const exampleJson = {
  comparison_points: ['language', 'difficulty', 'other'],
  filters: ['language'],
  solutions: [
    { solution: 'medusa', characteristics: { language: 'js', other: 'html' } },
    { solution: 'hercules', characteristics: { language: 'python', other: 'java', difficulty: 'easy' } },
    { solution: 'zeus', characteristics: { language: 'go', other: 'java' } },
  ],
};


const DataTable = () => {
  const [jsonData, setJsonData] = useState(null);
  const [filters, setFilters] = useState(['language']); // Initial filters

  // Function to fetch data based on filters
  const fetchData = async () => {
    setJsonData(exampleJson)
    // try {
    //   const response = await fetch(`/data?filters=${filters.join(',')}`);
    //   if (!response.ok) {
    //     throw new Error('Failed to fetch data');
    //   }
    //   const data = await response.json();
    //   setJsonData(data); // Update jsonData state with fetched data
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // }
  };

  // Fetch initial data on component mount
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means it runs once on mount

  // Function to handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // useEffect to fetch data when filters change
  useEffect(() => {
    fetchData();
  }, [filters]); // Fetch data again when filters change

  // Render loading state while waiting for data
  if (!jsonData) {
    return <div>Loading...</div>;
  }

  // Destructure jsonData for easier access
  const { comparison_points, solutions } = jsonData;

  // Prepare columns based on comparison points
  const columns = comparison_points.map((point, index) => ({
    field: `${point}`,
    headerName: `${point}`,
    width: 150,
    editable: false,
  }));

  // Prepare rows based on solutions
  const rows = solutions.map((solution, index) => {
    const row = {
      id: index + 1,
      solution: solution.solution,
    };

    comparison_points.forEach((point) => {
      row[`${point}`] = solution.characteristics[point] || '';
    });

    return row;
  });

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        slots={{ toolbar: GridToolbar }}
        filterModel={{ items: filters }} 
      />
    </div>
  );
};

export default DataTable;
