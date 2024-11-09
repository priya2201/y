'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination,
} from '@mui/material';

interface Post {
  id: number;
  title: string;
  body: string;
}

const Data: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Post>('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);  // New loading state

  useEffect(() => {
    // Fetch data
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setPosts(response.data);
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  // Handle sorting
  const handleRequestSort = (property: keyof Post) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedPosts = () => {
    return posts.sort((a, b) => {
      if (orderBy === 'id') {
        return order === 'asc' ? a.id - b.id : b.id - a.id;
      }
      if (orderBy === 'title') {
        return order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      }
      return 0;
    });
  };

  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedPosts = sortedPosts().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) {
    return <div>Loading...</div>;  // Show loading state until data comes
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Posts Table with Sorting and Pagination</h1>
      <TableContainer component={Paper}>
        <Table aria-label="posts table">
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === 'id' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : 'asc'}
                  onClick={() => handleRequestSort('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'title' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'title'}
                  direction={orderBy === 'title' ? order : 'asc'}
                  onClick={() => handleRequestSort('title')}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <TablePagination
        component="div"
        count={posts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Data;
