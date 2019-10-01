import React from 'react';
import {Segment, Grid, Button, Divider} from 'semantic-ui-react';

import UserDetailsContainer from '../containers/UserDetailsContainer'

const ProfileDetailRow = (props) => {


    return (
      <Segment
        className="profileSegment"
        textAlign="left"
        raised>
        <Grid columns={2} relaxed='very'>
          <Grid.Column>
            <p>
              {props.label + ": " + props.info }
            </p>
          </Grid.Column>
          <Grid.Column>
            <Button>Edit</Button>
          </Grid.Column>
        </Grid>
        <Divider vertical></Divider>
      </Segment>
    )


}

export default ProfileDetailRow;
