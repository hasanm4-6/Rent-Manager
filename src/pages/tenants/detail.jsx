import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

// material-ui
import { Box, Typography, Stack, Divider, Button, CircularProgress } from '@mui/material';

export default function TenantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/Tenants/${id}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-RM12Api-ApiToken': `${import.meta.env.VITE_APP_TOKEN}`,
          }
        });
        setTenant(response.data);
      } catch (error) {
        console.error('Error fetching tenant detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, [id]);
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }
  if (!tenant) {
    return (
      <Typography variant="h6" color="error">
        Tenant not found.
      </Typography>
    );
  }
  return (
    <Box p={4}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>

      <Typography variant="h4" gutterBottom>
        {tenant.Name} (ID: {tenant.TenantID})
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Stack spacing={2}>
        <Typography>
          <strong>Display ID:</strong> {tenant.TenantDisplayID}
        </Typography>
        <Typography>
          <strong>First Name:</strong> {tenant.FirstName}
        </Typography>
        <Typography>
          <strong>Last Name:</strong> {tenant.LastName}
        </Typography>
        <Typography>
          <strong>Status:</strong> {tenant.Status}
        </Typography>
        <Typography>
          <strong>Rent Period:</strong> {tenant.RentPeriod}
        </Typography>
        <Typography>
          <strong>Rent Due Day:</strong> {tenant.RentDueDay}
        </Typography>
        <Typography>
          <strong>Property ID:</strong> {tenant.PropertyID}
        </Typography>
        <Typography>
          <strong>Posting Start Date:</strong> {tenant.PostingStartDate}
        </Typography>
        <Typography>
          <strong>Create Date:</strong> {tenant.CreateDate}
        </Typography>
        <Typography>
          <strong>Created By User ID:</strong> {tenant.CreateUserID}
        </Typography>
        <Typography>
          <strong>Update Date:</strong> {tenant.UpdateDate}
        </Typography>
        <Typography>
          <strong>Updated By User ID:</strong> {tenant.UpdateUserID}
        </Typography>
        <Typography>
          <strong>Web Message:</strong> {tenant.WebMessage || 'N/A'}
        </Typography>
        <Typography>
          <strong>Comment:</strong> {tenant.Comment || 'N/A'}
        </Typography>
        <Typography>
          <strong>Check Payee Name:</strong> {tenant.CheckPayeeName}
        </Typography>
      </Stack>
    </Box>
  );
}
