import React from "react";
import PropTypes from "prop-types";
import {Icon, Grid, Label, List, Segment, Container} from "semantic-ui-react";
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
            <List horizontal>
              <List.Item>
                <List.Content>
                  <Icon fitted name="circle" /> {utils.choiceWorder(correctAnswer)}
                </List.Content>
              </List.Item>
            </List>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Label color="red" ribbon>
              Incorrect Answer{choices.length > 1 ? "s" : ""}
            </Label>
            <br />
            <List horizontal>
              {choices.map((choice) => {
                const choiceString = utils.choiceWorder(choice);
                return (
                  <List.Item key={choiceString}>
                    <List.Content>
                      <Icon fitted name="circle outline" /> {choiceString}
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <span>
          <Icon name="info circle" /> {" "}
          There will be {props.choicesOffered} choices.
        </span>
      </Grid.Row>
    </Grid>
  );
};

QaReviewChoices.propTypes = {
  choices: PropTypes.arrayOf(QA_UNIT_OBJECT_TYPE).isRequired,
  choicesOffered: PropTypes.number.isRequired,
};

export default QaReviewChoices;
