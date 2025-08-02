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

// project imports
import Dot from 'components/@extended/Dot';

// ==============================|| TABLE HEAD ||============================== //

const headCells = [
  { id: 'UserID', align: 'left', label: 'User ID' },
  { id: 'Username', align: 'left', label: 'Username' },
  { id: 'Name', align: 'left', label: 'Full Name' },
  { id: 'IsActive', align: 'center', label: 'Status' },
  { id: 'Email', align: 'left', label: 'Email' }
];

function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

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

// ==============================|| MAIN COMPONENT ||============================== //

export default function OrderTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://dcr.api.rentmanager.com/users', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-RM12Api-ApiToken': '-NMpair_ca076ad71a014487914e16001723e564XX6Bm9PZtnlasDxBexpGiOWS2U4YfYgYovBnP1ly94LwCJPcIecwMvn-9vPNAf6apLbfoYKc6iwSO-qGAE4uevv3ZLrKqWs2ivveId7o=',
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
      <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
        <Table aria-labelledby="tableTitle">
          <TableHeader />
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.UserID} hover tabIndex={-1}>
                <TableCell>
                  <Link color="secondary">{user.UserID}</Link>
                </TableCell>
                <TableCell>{user.Username || '-'}</TableCell>
                <TableCell>{user.Name || '-'}</TableCell>
                <TableCell align="center">
                  <UserStatus status={user.IsActive} />
                </TableCell>
                <TableCell>{user.Email || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
