// 'use client'
// import * as React from 'react';
// import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import axios from 'axios';

// // Define interfaces
// interface User {
//   id: number;
//   name: string;
//   age?: number; // Adjust according to your API response
// }

// interface RowData {
//   id: number;
//   firstName: string;
//   lastName: string;
//   age?: number;
// }

// // Define columns with appropriate typing
// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'firstName', headerName: 'First name', width: 130 },
//   { field: 'lastName', headerName: 'Last name', width: 130 },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params: GridRenderCellParams<RowData>) => {
//       // Debugging to check if params.row is undefined
//       if (!params.row) {
//         console.error('params.row is undefined:', params);
//         return '';
//       }
//       return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
//     },
//   },
// ];

// export default function DataTable() {
//   const [rows, setRows] = React.useState<RowData[]>([]);
//   const [loading, setLoading] = React.useState(true);

//   React.useEffect(() => {
//     // Fetch data from API
//     axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
//       .then((response) => {
//         // Map the API response to match the columns defined
//         const data = response.data.map((user) => ({
//           id: user.id,
//           firstName: user.name.split(' ')[0] || '', // Assuming name format is "First Last"
//           lastName: user.name.split(' ')[1] || '', // Handle cases where there's no last name
//           age: user.age || null, // Adjust according to your API response structure
//         }));
//         setRows(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <Paper sx={{ height: 400, width: '100%' }}>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           pagination
//           pageSize={5}
//           rowsPerPageOptions={[5, 10]}
//           checkboxSelection
//           sx={{ border: 0 }}
//         />
//       )}
//     </Paper>
//   );
// }
