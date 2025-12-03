import type { CardProps } from '../models/card.model';
import type { FC } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

const CCard : FC<CardProps> = ({cardMedia, topTitle, title, subTitle, body, cardActions}) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      {
        cardMedia && 
        <CardMedia
          sx={{ height: 140 }}
          image={cardMedia.image}
          title={cardMedia.title}
        />
      }
      
      <CardContent>
        {
            topTitle && 
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>{topTitle}</Typography>
        }
        
        {
            title && 
            <Typography variant="h5" component="div">{title}</Typography>
        }
        {
            subTitle && 
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
        }
        {
            body && 
            <Typography variant="body2">{body}</Typography>
        }
      </CardContent>
      {
        cardActions && 
        <CardActions>
            {cardActions}
        </CardActions>
      }
    </Card>
  );
}
export default CCard