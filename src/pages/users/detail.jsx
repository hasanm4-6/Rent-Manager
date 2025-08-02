import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

// material-ui
import { Box, Typography, Stack, Divider, Button, CircularProgress, Chip } from '@mui/material';
import dayjs from 'dayjs';

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/Users/${id}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-RM12Api-ApiToken': `${import.meta.env.VITE_APP_TOKEN}`,
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Typography variant="h6" color="error">
        User not found.
      </Typography>
    );
  }

  return (
    <Box p={4}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Typography variant="h4" gutterBottom>
        {user.Name} (ID: {user.UserID})
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Stack spacing={2}>
        <Typography>
          <strong>Username:</strong> {user.Username}
        </Typography>
        <Typography>
          <strong>First Name:</strong> {user.Firstname}
        </Typography>
        <Typography>
          <strong>Last Name:</strong> {user.Lastname}
        </Typography>
        <Typography>
          <strong>Email:</strong> {user.Email || 'N/A'}
        </Typography>
        <Typography>
          <strong>Status:</strong> {user.IsActive ? <Chip label="Active" color="success" /> : <Chip label="Inactive" color="error" />}
        </Typography>
        <Typography>
          <strong>Admin:</strong> {user.IsAdmin ? 'Yes' : 'No'}
        </Typography>
        <Typography>
          <strong>Strong Password:</strong> {user.IsStrongPassword ? 'Yes' : 'No'}
        </Typography>
        <Typography>
          <strong>Inspector:</strong> {user.IsInspector ? 'Yes' : 'No'}
        </Typography>
        <Typography>
          <strong>API Access:</strong> {user.HasAPIAccess ? 'Yes' : 'No'}
        </Typography>
        <Typography>
          <strong>Mobile Access:</strong> {user.HasMobileRentManagerAccess ? 'Yes' : 'No'}
        </Typography>
        <Typography>
          <strong>Site Manager Access:</strong> {user.HasSiteManagerAccess ? 'Yes' : 'No'}
        </Typography>
        <Typography>
          <strong>Service User:</strong> {user.IsRmServiceUser ? 'Yes' : 'No'}
        </Typography>
        <Typography>
          <strong>Last Password Change:</strong> {dayjs(user.LastPasswordChangeDate).format('YYYY-MM-DD')}
        </Typography>
        <Typography>
          <strong>Phone Extension:</strong> {user.PhoneSystemExtension || 'N/A'}
        </Typography>
        <Typography>
          <strong>Default Location ID:</strong> {user.DefaultLocationID}
        </Typography>
        <Typography>
          <strong>Created At:</strong> {dayjs(user.CreateDate).format('YYYY-MM-DD HH:mm')}
        </Typography>
        <Typography>
          <strong>Created By User ID:</strong> {user.CreateUserID}
        </Typography>
        <Typography>
          <strong>Updated At:</strong> {dayjs(user.UpdateDate).format('YYYY-MM-DD HH:mm')}
        </Typography>
        <Typography>
          <strong>Updated By User ID:</strong> {user.UpdateUserID}
        </Typography>
      </Stack>
    </Box>
  );
}
