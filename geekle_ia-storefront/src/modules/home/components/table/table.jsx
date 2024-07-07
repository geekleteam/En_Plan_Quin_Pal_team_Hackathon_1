import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { medusaClient } from "@lib/config"


const exampleJson = {
  comparison_points: ['language', 'difficulty', 'other'],
  filters: [],
  solutions: [
    { solution: 'medusa', characteristics: { language: 'js', other: 'html' } },
    { solution: 'hercules', characteristics: { language: 'python', other: 'java', difficulty: 'easy' } },
    { solution: 'zeus', characteristics: { language: 'go', other: 'java' } },
  ],
};

const DataTable = () => {
  const [jsonData, setJsonData] = useState(null);

//   const fetch = async() =>{
//     const category = await medusaClient.productCategories
//       .list(
//         {
//           handle: '',
//         },
//         {
//           next: {
//             tags: ["categories"],
//           },
//         }
//       )
//       .then(({ product_categories: { [0]: category } }) => category)
//       .catch((err) => {
//         return {}
//       })
//     }
    
    useEffect(() =>{
        // fetch()
        setJsonData(exampleJson);
    },[])



  const columns = jsonData?.comparison_points.map((point, index) => ({
    field: point,
    headerName: point,
    width: 150,
    editable: false,
  })) || [];

  // Prepare rows based on solutions
  const rows = jsonData?.solutions.map((solution, index) => {
    const row = {
      id: index + 1,
      solution: solution.solution,
    };

    jsonData.comparison_points.forEach((point) => {
      row[point] = solution.characteristics[point] || '';
    });

    return row;
  }) || [];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
};

export default DataTable;
