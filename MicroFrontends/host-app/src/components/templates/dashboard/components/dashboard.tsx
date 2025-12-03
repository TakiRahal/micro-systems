import { Box, Button, Card, CardActionArea, CardActions, CardContent, Divider, Grid, Typography } from "@mui/material";
import PageContainer from "../../../organisms/page-container/components/page-container";
import { listOfCards, listSwaggerCards } from "../constants/dashboard.constant";

const Dashboard: React.FC = () => {
    return (
        <Box pt={10} width={'100%'} >
            <PageContainer title="Dashboard" >
                <Grid container spacing={2} mb={4}>
                    {
                        listOfCards.map((card, index) => (
                            <Grid size={4} key={index}>
                                <Card sx={{ minWidth: 345 }}>
                                    <CardActionArea
                                        onClick={card.callback}
                                        sx={{
                                        height: '100%',
                                        '&[data-active]': {
                                            backgroundColor: 'action.selected',
                                            '&:hover': {
                                            backgroundColor: 'action.selectedHover',
                                            },
                                        },
                                        }}
                                    >
                                        <CardContent sx={{ height: '100%' }}>
                                            <Typography variant="h5" component="div">
                                                {card.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {card.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
                <Divider />
                <Grid container spacing={2} mt={10}>
                    {
                        listSwaggerCards.map((card, index) => (
                            <Grid size={4} key={index}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {card.title}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="secondary" onClick={card.firstCallback}>{card.firstTitleLink}</Button>
                                        <Button size="small" color="secondary" onClick={card.secondeCallback}>{card.secondeTitleLink}</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>

            </PageContainer>
        </Box>
    )
}
export default Dashboard;