import React from "react";
import PropTypes from "prop-types";
import { Grid, Icon, Label, Segment } from "semantic-ui-react";
import cloneDeep from "lodash/cloneDeep";

import utils from "../../utils";

import {
  QA_UNIT_OBJECT_TYPE,
} from "../../propTypes";

const QaReviewChoices = (props) => {
  const choices = cloneDeep(props.choices);
  const correctAnswer = choices.shift();

  return (
    <Grid
      stackable
      stretched
      padded
      columns="equal"
    >
      <Grid.Row>
        <Grid.Column width={4}>
          <Segment>
            <Label color="olive" ribbon>
              Correct Answer
            </Label>
            <br />
            <Icon name="check circle" color="olive" />
            {utils.choiceWorder(correctAnswer)}
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Label color="red" ribbon>
              Incorrect Answer
              {choices.length > 1 ? "s" : ""}
            </Label>
            <br />
            {choices.map((choice) => {
              const choiceString = utils.choiceWorder(choice);
              return (
                <span key={choiceString}>
                  <Icon name="remove circle" color="red" />
                  {choiceString}
                  {"  "}
                </span>
              );
            })}
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <p>
          <Icon name="hashtag" /> There will be {props.choicesOffered} choices.
          {props.answerDetail &&
            <React.Fragment>
              <br />
              <Icon name="info circle" />
              &quot;{props.answerDetail}&quot;
            </React.Fragment>
          }
        </p>
      </Grid.Row>
    </Grid>
  );
};

QaReviewChoices.propTypes = {
  choices: PropTypes.arrayOf(QA_UNIT_OBJECT_TYPE).isRequired,
  choicesOffered: PropTypes.number.isRequired,
  answerDetail: PropTypes.string,
};

QaReviewChoices.defaultProps = {
  answerDetail: null,
};

export default QaReviewChoices;
