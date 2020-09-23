import React from 'react';
import Row from '../row';
import { PersonDetails, PersonList } from '../sw-components';
import { withRouter } from 'react-router-dom';

const PeoplePage = ({ history, match }) => {
  const { id } = match.params;

  return (
    <Row
      left={<PersonList onItemSelected={(id) => history.push(id)} />}
      right={<PersonDetails itemId={id} />}
    />
  );
};

export default withRouter(PeoplePage);
