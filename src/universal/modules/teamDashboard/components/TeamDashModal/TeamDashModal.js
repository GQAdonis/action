import React, {PropTypes} from 'react';
import {DashModal} from 'universal/components/Dashboard';
import IconLink from 'universal/components/IconLink/IconLink';
import Type from 'universal/components/Type/Type';

const TeamDashModal = (props) => {
  const {onClick} = props;
  return (
    <DashModal>
      <Type align="center" bold marginBottom="1.5rem" scale="s7" theme="cool">
        Oh, hi there!
      </Type>
      <Type align="center" bold scale="s4">
        The dashboard for Engineering is disabled <br />
        as we are actively meeting to review <br />
        Projects and Agenda Items.
      </Type>
      <IconLink
        icon="arrow-circle-right"
        iconPlacement="right"
        label="Join Meeting"
        marginTop="1.5rem"
        onClick={onClick}
        scale="large"
        theme="warm"
      />
    </DashModal>
  );
};

TeamDashModal.propTypes = {
  onClick: PropTypes.func
};

TeamDashModal.defaultProps = {
  onClick() {
    console.log('Go to meeting');
  }
};

export default TeamDashModal;
