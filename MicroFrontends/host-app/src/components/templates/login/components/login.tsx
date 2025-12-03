import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from "@mui/material";
import { invokeWS } from "../../../../config/api-service";
import { useNavigate } from "@tanstack/react-router";
import loginImg from '../../../../assets/login.webp';

const Login = () => {
    const navigate = useNavigate();
    const loginWithDevice = () => {
        invokeWS({
            url: "authorization/keycloak",
            method: "GET",
        }).then((result: any) => {
            console.log("result ", result);
            document.location.href = `${window.location.origin}${result?.url}`;
        });
    }
    
    return (
        <Container maxWidth="sm">
            <Box>
                <h2>Sign In to MicroFrontend</h2>
                <Card>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="500"
                        image={loginImg}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            MicroFrontend
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Get full experience with your account
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={loginWithDevice} color="secondary">Login</Button>
                        <Button size="small" onClick={() => navigate({to: '/register'})} color="secondary">Register</Button>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    )
}
export default Login