import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(() => ({
  maxWidth: "900",
  margin: 'auto',
  marginTop:'60px',
  transition: '0.3s',
  boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
  '&:hover': {
    boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
  },
}));

const YTSummary = ({ videoSummary }:any) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="start" minHeight="100vh">
      <StyledCard>
        <CardMedia
          component="img"
          height="140"
          image={videoSummary.video_thumbnail}
          alt="Video Thumbnail"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {videoSummary.video_title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            by {videoSummary.channel_name}
          </Typography>
          <Chip label={`${videoSummary.subsciber_count} subscribers`} color="primary" variant="outlined" sx={{ my: 1 }}/>
          <Typography variant="body2" color="text.secondary">
            Duration: {videoSummary.video_duration}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Views: {videoSummary.video_views}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Likes: {videoSummary.video_likes}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Comments: {videoSummary.total_comments}
          </Typography>
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth href={videoSummary.video_url} target="_blank">
              Watch Video
            </Button>
          </Box>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default YTSummary;
