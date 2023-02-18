import { CloseOutlined } from '@mui/icons-material';
import { Box, Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import React from 'react';

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ open, onClose: handleClose, videoUrl }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent sx={{ padding: '1rem 0.5rem' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Record Video</Typography>
          <IconButton onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        </Box>
        <video width="100%" height="auto" controls src={videoUrl} />
      </DialogContent>
    </Dialog>
  );
};
