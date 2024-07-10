import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const DataTable = () => {
  const [jsonData, setJsonData] = useState({
    comparison_points: ['language', 'difficulty', 'other'],
    solutions: [],
  });

  const initSolutions = async () => {
    try {
      const response = await fetch(`http://localhost:9000/store/solutions/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch solutions');
      }
      const data = await response.json();
      const formattedSolutions = data.solutions.map(solution => ({
        id: solution.id,
        solution: solution.name,
        created_at: solution.created_at,
        updated_at: solution.updated_at,
        details: solution.details
      }));

      setJsonData({
        ...jsonData,
        solutions: formattedSolutions,
      });

    } catch (error) {
      console.error('Error initializing chat:', error);
    }
  };

  useEffect(() => {
    initSolutions();
  }, []);

  const columns = [
    { field: 'solution', headerName: 'Solution', width: 150, editable: false },
  
    { field: 'created_at', headerName: 'Created At', width: 200, editable: false },
    { field: 'updated_at', headerName: 'Updated At', width: 200, editable: false },
    { field: 'details', headerName: 'Details', width: 250, editable: false },
  ];

  const rows = jsonData.solutions;

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default DataTable;
