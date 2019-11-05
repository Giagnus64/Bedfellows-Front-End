import React from 'react';
import {Container, Icon} from 'semantic-ui-react';

const Footer = () => {
    return(
        <Container className="footer">
            
            <p className="trademark"><Icon name="copyright outline" />Made By <a style={{textDecoration: "underline"}} target="_blank" rel="noopener noreferrer" href="http://www.gianfranconuschese.com">Gianfranco Nuschese</a></p>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/Giagnus64/Bedfellows-Front-End"><Icon name="github"/></a>
            
        </Container>
    )
}

export default Footer