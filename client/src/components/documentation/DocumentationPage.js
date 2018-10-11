import React from "react";
import { Container } from "semantic-ui-react";

import Docs from "./DocumentationContent";

const DocumentationPage = () => (
  <Container>
    {/* Mission Statement */}
    {Docs.missionStatement.header}
    {Docs.missionStatement.content}

    {Docs.missionStatement.whyMetric.header}
    {Docs.missionStatement.whyMetric.content}

    {Docs.missionStatement.whyImperial.header}
    {Docs.missionStatement.whyImperial.content}

    {/* Imperial Details */}
    {Docs.imperialDetails.header}
    {Docs.imperialDetails.content}

    {Docs.imperialDetails.liquidDifferences.header}
    {Docs.imperialDetails.liquidDifferences.content}

    {Docs.imperialDetails.liquidDifferences.summary.header}
    {Docs.imperialDetails.liquidDifferences.summary.content}

    {/* Metric Details */}
    {Docs.metricDetails.header}
    {Docs.metricDetails.content}

    {Docs.metricDetails.metricPrefixes.header}
    {Docs.metricDetails.metricPrefixes.content}

    {/* Conversion Guides */}
    {Docs.conversionGuides.header}
    {Docs.conversionGuides.content}

    {Docs.conversionGuides.mentalMath.header}
    {Docs.conversionGuides.mentalMath.content}

    {Docs.conversionGuides.percentageTips.header}
    {Docs.conversionGuides.percentageTips.content}

    {Docs.conversionGuides.length.header}
    {Docs.conversionGuides.length.content}
    {Docs.conversionGuides.length.toMetric.header}
    {Docs.conversionGuides.length.toMetric.content}
    {Docs.conversionGuides.length.toMetric.description.header}
    {Docs.conversionGuides.length.toMetric.description.content}
    {Docs.conversionGuides.length.toMetric.chart.header}
    {Docs.conversionGuides.length.toMetric.chart.content}
    {Docs.conversionGuides.length.toMetric.tips.header}
    {Docs.conversionGuides.length.toMetric.tips.content}
    {Docs.conversionGuides.length.fromMetric.header}
    {Docs.conversionGuides.length.fromMetric.content}
    {Docs.conversionGuides.length.fromMetric.description.header}
    {Docs.conversionGuides.length.fromMetric.description.content}
    {Docs.conversionGuides.length.fromMetric.chart.header}
    {Docs.conversionGuides.length.fromMetric.chart.content}
    {Docs.conversionGuides.length.fromMetric.tips.header}
    {Docs.conversionGuides.length.fromMetric.tips.content}

    {Docs.conversionGuides.mass.header}
    {Docs.conversionGuides.mass.content}
    {Docs.conversionGuides.mass.toMetric.header}
    {Docs.conversionGuides.mass.toMetric.content}
    {Docs.conversionGuides.mass.toMetric.description.header}
    {Docs.conversionGuides.mass.toMetric.description.content}
    {Docs.conversionGuides.mass.toMetric.chart.header}
    {Docs.conversionGuides.mass.toMetric.chart.content}
    {Docs.conversionGuides.mass.toMetric.tips.header}
    {Docs.conversionGuides.mass.toMetric.tips.content}
    {Docs.conversionGuides.mass.fromMetric.header}
    {Docs.conversionGuides.mass.fromMetric.content}
    {Docs.conversionGuides.mass.fromMetric.description.header}
    {Docs.conversionGuides.mass.fromMetric.description.content}
    {Docs.conversionGuides.mass.fromMetric.chart.header}
    {Docs.conversionGuides.mass.fromMetric.chart.content}
    {Docs.conversionGuides.mass.fromMetric.tips.header}
    {Docs.conversionGuides.mass.fromMetric.tips.content}

    {Docs.conversionGuides.volume.header}
    {Docs.conversionGuides.volume.content}
    {Docs.conversionGuides.volume.toMetric.header}
    {Docs.conversionGuides.volume.toMetric.content}
    {Docs.conversionGuides.volume.toMetric.description.header}
    {Docs.conversionGuides.volume.toMetric.description.content}
    {Docs.conversionGuides.volume.toMetric.chart.header}
    {Docs.conversionGuides.volume.toMetric.chart.content}
    {Docs.conversionGuides.volume.toMetric.tips.header}
    {Docs.conversionGuides.volume.toMetric.tips.content}
    {Docs.conversionGuides.volume.fromMetric.header}
    {Docs.conversionGuides.volume.fromMetric.content}
    {Docs.conversionGuides.volume.fromMetric.description.header}
    {Docs.conversionGuides.volume.fromMetric.description.content}
    {Docs.conversionGuides.volume.fromMetric.chart.header}
    {Docs.conversionGuides.volume.fromMetric.chart.content}
    {Docs.conversionGuides.volume.fromMetric.relationsChart.header}
    {Docs.conversionGuides.volume.fromMetric.relationsChart.content}
    {Docs.conversionGuides.volume.fromMetric.tips.header}
    {Docs.conversionGuides.volume.fromMetric.tips.content}

    {Docs.conversionGuides.temperature.header}
    {Docs.conversionGuides.temperature.content}
    {Docs.conversionGuides.temperature.toMetric.header}
    {Docs.conversionGuides.temperature.toMetric.content}
    {Docs.conversionGuides.temperature.toMetric.description.header}
    {Docs.conversionGuides.temperature.toMetric.description.content}
    {Docs.conversionGuides.temperature.toMetric.chart.header}
    {Docs.conversionGuides.temperature.toMetric.chart.content}
    {Docs.conversionGuides.temperature.toMetric.tips.header}
    {Docs.conversionGuides.temperature.toMetric.tips.content}
    {Docs.conversionGuides.temperature.fromMetric.header}
    {Docs.conversionGuides.temperature.fromMetric.content}
    {Docs.conversionGuides.temperature.fromMetric.description.header}
    {Docs.conversionGuides.temperature.fromMetric.description.content}
    {Docs.conversionGuides.temperature.fromMetric.chart.header}
    {Docs.conversionGuides.temperature.fromMetric.chart.content}
    {Docs.conversionGuides.temperature.fromMetric.tips.header}
    {Docs.conversionGuides.temperature.fromMetric.tips.content}

    {Docs.conversionGuides.velocity.header}
    {Docs.conversionGuides.velocity.content}
    {Docs.conversionGuides.velocity.toMetric.header}
    {Docs.conversionGuides.velocity.toMetric.content}
    {Docs.conversionGuides.velocity.toMetric.description.header}
    {Docs.conversionGuides.velocity.toMetric.description.content}
    {Docs.conversionGuides.velocity.toMetric.chart.header}
    {Docs.conversionGuides.velocity.toMetric.chart.content}
    {Docs.conversionGuides.velocity.toMetric.tips.header}
    {Docs.conversionGuides.velocity.toMetric.tips.content}
    {Docs.conversionGuides.velocity.fromMetric.header}
    {Docs.conversionGuides.velocity.fromMetric.content}
    {Docs.conversionGuides.velocity.fromMetric.description.header}
    {Docs.conversionGuides.velocity.fromMetric.description.content}
    {Docs.conversionGuides.velocity.fromMetric.chart.header}
    {Docs.conversionGuides.velocity.fromMetric.chart.content}
    {Docs.conversionGuides.velocity.fromMetric.tips.header}
    {Docs.conversionGuides.velocity.fromMetric.tips.content}

    {Docs.conversionGuides.area.header}
    {Docs.conversionGuides.area.content}
    {Docs.conversionGuides.area.toMetric.header}
    {Docs.conversionGuides.area.toMetric.content}
    {Docs.conversionGuides.area.toMetric.description.header}
    {Docs.conversionGuides.area.toMetric.description.content}
    {Docs.conversionGuides.area.toMetric.chart.header}
    {Docs.conversionGuides.area.toMetric.chart.content}
    {Docs.conversionGuides.area.toMetric.tips.header}
    {Docs.conversionGuides.area.toMetric.tips.content}
    {Docs.conversionGuides.area.fromMetric.header}
    {Docs.conversionGuides.area.fromMetric.content}
    {Docs.conversionGuides.area.fromMetric.description.header}
    {Docs.conversionGuides.area.fromMetric.description.content}
    {Docs.conversionGuides.area.fromMetric.chart.header}
    {Docs.conversionGuides.area.fromMetric.chart.content}
    {Docs.conversionGuides.area.fromMetric.tips.header}
    {Docs.conversionGuides.area.fromMetric.tips.content}

  </Container>
);

export default DocumentationPage;
