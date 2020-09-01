import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

export const Layout = ({children}) => {
    return (
        <Container maxWidth="md">
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{marginTop: 30, padding: 20, display: 'flex'}}
            >
                {children}
            </Grid>
            
        </Container>
    )
}
