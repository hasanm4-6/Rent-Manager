import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';

// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { NumericFormat } from 'react-number-format';

// project imports
import Dot from 'components/@extended/Dot';

const headCells = [
  { id: 'UserID', align: 'left', disablePadding: false, label: 'User ID' },
  { id: 'UserName', align: 'left', disablePadding: true, label: 'Username' },
  { id: 'DisplayName', align: 'left', disablePadding: false, label: 'Display Name' },
  { id: 'IsActive', align: 'center', disablePadding: false, label: 'Status' },
  { id: 'Email', align: 'left', disablePadding: false, label: 'Email' }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| USER STATUS DOT ||============================== //

function UserStatus({ status }) {
  const color = status ? 'success' : 'error';
  const title = status ? 'Active' : 'Inactive';

  return (
    <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

UserStatus.propTypes = {
  status: PropTypes.bool
};

// ==============================|| ORDER TABLE COMPONENT ||============================== //

export default function OrderTable() {
  const [users, setUsers] = useState([]);
  const order = 'asc';
  const orderBy = 'UserID';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://dcr.api.rentmanager.com/users', {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with actual token
            'X-RM12Api-Version': '1.0.0'
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.UserID} hover tabIndex={-1}>
                <TableCell component="th" scope="row">
                  <Link color="secondary">{user.UserID}</Link>
                </TableCell>
                <TableCell>{user.UserName}</TableCell>
                <TableCell>{user.DisplayName}</TableCell>
                <TableCell align="center">
                  <UserStatus status={user.IsActive} />
                </TableCell>
                <TableCell>{user.Email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
