import React from 'react';
import {Container, Icon} from 'semantic-ui-react';

const Footer = () => {
    return(
        <Container className="footer">
            
            <p className="trademark"><Icon name="copyright outline" />Made By Gianfranco Nuschese</p>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/Giagnus64/Bedfellows-Front-End"><Icon name="github"/></a>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/Giagnus64/Bedfellows-Front-End"><Icon name="address card"/></a>
        </Container>
    )
}

export default Footer