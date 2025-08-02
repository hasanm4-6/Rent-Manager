import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import dayjs from 'dayjs';

// MUI Components
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
import Pagination from '@mui/material/Pagination';
import TableSortLabel from '@mui/material/TableSortLabel';

// Project Components
import Dot from 'components/@extended/Dot';

// ==============================|| TABLE HEAD ||============================== //

const headCells = [
  { id: 'TenantID', align: 'left', label: 'Tenant ID', sortable: true },
  { id: 'TenantDisplayID', align: 'left', label: 'Display ID', sortable: true },
  { id: 'Name', align: 'left', label: 'Name', sortable: true },
  { id: 'RentPeriod', align: 'left', label: 'Rent Period', sortable: true },
  { id: 'Status', align: 'center', label: 'Status', sortable: true },
  { id: 'PostingStartDate', align: 'left', label: 'Start Date', sortable: true }
];

function TableHeader({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align}>
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

TableHeader.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onRequestSort: PropTypes.func
};

// ==============================|| TENANT STATUS DOT ||============================== //

function TenantStatusDot({ status }) {
  const color = status === 'Current' ? 'success' : 'warning';

  return (
    <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
      <Dot color={color} />
      <Typography>{status}</Typography>
    </Stack>
  );
}

TenantStatusDot.propTypes = { status: PropTypes.string };

// ==============================|| MAIN COMPONENT ||============================== //

export default function TenantTable() {
  const [tenants, setTenants] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [orderBy, setOrderBy] = useState('TenantID');
  const [order, setOrder] = useState('asc');
  const pageSize = 25;

  const fetchTenants = async () => {
    try {
      const orderQuery = `${orderBy}${order === 'desc' ? ' DESC' : ''}`;
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/tenants?pagenumber=${pageNumber}&pagesize=${pageSize}&orderby=${encodeURIComponent(orderQuery)}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-RM12Api-ApiToken': `${import.meta.env.VITE_APP_TOKEN}`,
          }
        }
      );

      setTenants(response.data);

      // Get Total Results from Header
      const totalResults = parseInt(response.headers['x-total-results'] || '0', 10);
      setTotalPages(Math.ceil(totalResults / pageSize));
    } catch (error) {
      console.error('Error fetching tenants:', error);
    }
  };

  useEffect(() => {
    fetchTenants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, orderBy, order]);

  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Box>
      <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
        <Table>
          <TableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.TenantID} hover tabIndex={-1}>
                <TableCell>
                  <Link component={RouterLink} to={`/Tenants/${tenant.TenantID}`} color="secondary">
                    {tenant.TenantID}
                  </Link>
                </TableCell>
                <TableCell>{tenant.TenantDisplayID}</TableCell>
                <TableCell>{tenant.Name}</TableCell>
                <TableCell>{tenant.RentPeriod}</TableCell>
                <TableCell align="center">
                  <TenantStatusDot status={tenant.Status} />
                </TableCell>
                <TableCell>{dayjs(tenant.PostingStartDate).format('YYYY-MM-DD')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Pagination count={totalPages} page={pageNumber} onChange={handlePageChange} color="primary" />
      </Stack>
    </Box>
  );
}
