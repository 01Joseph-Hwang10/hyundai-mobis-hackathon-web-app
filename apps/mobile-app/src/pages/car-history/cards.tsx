import { Deformation, Video } from '@hyundai-mobis-hackathon-web-app/firebase';
import { Maybe, NotImplemeneted } from '@hyundai-mobis-hackathon-web-app/utils';
import { MoreVert } from '@mui/icons-material';
import { Box, IconButton, Paper, styled, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../app/routes/routes';
import { ImageIcon } from '../../components/icon';
import { VideoModal } from './video';

const CircularCard = styled(Box)`
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  padding: 1rem;
  width: 100%;
`;

const StyledPaper = styled(Paper)`
  width: 100%;
  border-radius: 0.5rem;
  margin: 0.5rem 0;
`;

interface HistoryCardProps {
  icon: () => JSX.Element;
  title: string;
  createdAt: number;
  onClick: () => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ icon: Icon, title, createdAt, onClick }) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(dayjs.unix(createdAt).toDate());
  return (
    <StyledPaper elevation={5}>
      <CircularCard onClick={onClick}>
        <Box display="flex" alignItems="center">
          <Icon />
          <Box marginLeft={2}>
            <Typography variant="subtitle1">{title}</Typography>
            <Typography variant="subtitle2" color="grey" fontSize="0.75rem">
              created at {formattedDate}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={NotImplemeneted} color="inherit">
          <MoreVert />
        </IconButton>
      </CircularCard>
    </StyledPaper>
  );
};

const deformationIcon = 'https://cdn-icons-png.flaticon.com/512/1162/1162914.png';

export const DeformationCard: React.FC<{ deformation: Deformation }> = ({ deformation }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`${routes.main.root}/${routes.main.home}`);
  };
  return (
    <HistoryCard
      icon={() => <ImageIcon src={deformationIcon} alt="deformation status" size="2.5rem" />}
      title={'Deformation'}
      createdAt={deformation.createdAt}
      onClick={onClick}
    />
  );
};

const videoCard = 'https://cdn-icons-png.flaticon.com/512/4739/4739867.png';

export const AccidentVideoCard: React.FC<{ video: Video }> = ({ video }) => {
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<Maybe<string>>();

  useEffect(() => {
    if (videoUrl) return;
    (async () => {
      const url = await video.getVideoUrl();
      setVideoUrl(url);
    })();
  }, [video, videoUrl]);

  return (
    <>
      <HistoryCard
        icon={() => <ImageIcon src={videoCard} alt="accident record" size="2.5rem" />}
        title={'Video'}
        createdAt={video.createdAt}
        onClick={() => setOpen(true)}
      />
      {videoUrl && <VideoModal open={open} onClose={() => setOpen(false)} videoUrl={videoUrl} />}
    </>
  );
};
