import Avatar from "HostApp/Avatar";
import Divider from "HostApp/Divider";
import List from "HostApp/List";
import ListItem from "HostApp/ListItem";
import ListItemAvatar from "HostApp/ListItemAvatar";
import ListItemText from "HostApp/ListItemText";
import PageContainer from "HostApp/PageContainer";
import Typography from "HostApp/Typography";
import React from "react";
import { useEffect, useState } from "react";

const Notification = () => {
    const [listNotifications, setListNotifications] = useState<string[]>([])
    useEffect(() => {
    
        const eventSource = new EventSource(`/api/user/public/user-events`);

        eventSource.onmessage = (event) => {
            console.log("New event:", event.data);
            setListNotifications([...listNotifications, event.data])
        };

        return () => eventSource.close();
    }, []);

    return (
        <PageContainer title="List notifications">
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    listNotifications.map((item: string, index: number) => (
                    <React.Fragment key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" >P</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`Num notification ${index}`}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            sx={{ color: 'text.primary', display: 'inline' }}
                                        >
                                            {index} - 
                                        </Typography>
                                    {item}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))
                }
            </List>
        </PageContainer>
    )
}
export default Notification