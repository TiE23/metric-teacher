import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Header, Icon, Segment } from "semantic-ui-react";

import {
  SITE_NAME,
  DOCUMENTATION_TO_METRIC,
  DOCUMENTATION_FROM_METRIC,
  SUBJECT_ICONS,
} from "../../constants";

const segmentSize = "tiny";
const iconColors = {
  missionStatement: "pink",
  howto: "violet",
  guide: "purple",
  length: "red",
  mass: "yellow",
  volume: "blue",
  temperature: "orange",
  velocity: "olive",
  area: "teal",
};

export default (
  <Grid columns="equal" stackable>
    <Grid.Row>
      <Grid.Column>
        <Segment size={segmentSize}>
          <Container as={Link} textAlign="center" to="/docs/1/missionstatement">
            <Header>
              <Icon name="bullhorn" color={iconColors.missionStatement} />
              Mission Statement
            </Header>
          </Container>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment size={segmentSize}>
          <Container as={Link} textAlign="center" to="/docs/1/howto">
            <Header>
              <Icon name="file alternate outline" color={iconColors.howto} />
              How To Use {SITE_NAME}
            </Header>
          </Container>
        </Segment>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Segment size={segmentSize}>
          <Container as={Link} textAlign="center" to="/docs/1/metric">
            <Header>
              <Icon name={DOCUMENTATION_TO_METRIC.icon} color={DOCUMENTATION_TO_METRIC.color} />
              Metric Perspective
            </Header>
          </Container>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment size={segmentSize}>
          <Container as={Link} textAlign="center" to="/docs/1/uscustomary">
            <Header>
              <Icon name={DOCUMENTATION_FROM_METRIC.icon} color={DOCUMENTATION_FROM_METRIC.color} />
              US Unit Perspective
            </Header>
          </Container>
        </Segment>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row centered>
      <Grid.Column width={15}>
        <Segment size={segmentSize} color={iconColors.guide}>
          <Container as={Link} textAlign="center" to="/docs/1/guide">
            <Header>
              <Icon name="graduation cap" color={iconColors.guide} />
              Tips and Guides
            </Header>
            <br />
          </Container>

          <Grid columns="equal" stackable>
            <Grid.Row>
              <Grid.Column>
                <Segment size={segmentSize} color={iconColors.length}>
                  <Container as={Link} textAlign="center" to="/docs/2/guide/length">
                    <Header>
                      <Icon name={SUBJECT_ICONS.Length} color={iconColors.length} />
                      Length
                    </Header>
                  </Container>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment size={segmentSize} color={iconColors.mass}>
                  <Container as={Link} textAlign="center" to="/docs/2/guide/mass">
                    <Header>
                      <Icon name={SUBJECT_ICONS.Mass} color={iconColors.mass} />
                      Mass
                    </Header>
                  </Container>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Segment size={segmentSize} color={iconColors.volume}>
                  <Container as={Link} textAlign="center" to="/docs/2/guide/volume">
                    <Header>
                      <Icon name={SUBJECT_ICONS.Volume} color={iconColors.volume} />
                      Volume
                    </Header>
                  </Container>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment size={segmentSize} color={iconColors.temperature}>
                  <Container as={Link} textAlign="center" to="/docs/2/guide/temperature">
                    <Header>
                      <Icon
                        name={SUBJECT_ICONS.Temperature}
                        color={iconColors.temperature}
                      />
                      Temperature
                    </Header>
                  </Container>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Segment size={segmentSize} color={iconColors.velocity}>
                  <Container as={Link} textAlign="center" to="/docs/2/guide/velocity">
                    <Header>
                      <Icon name={SUBJECT_ICONS.Velocity} color={iconColors.velocity} />
                      Velocity
                    </Header>
                  </Container>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment size={segmentSize} color={iconColors.area}>
                  <Container as={Link} textAlign="center" to="/docs/2/guide/area">
                    <Header>
                      <Icon name={SUBJECT_ICONS.Area} color={iconColors.area} />
                      Area
                    </Header>
                  </Container>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);
