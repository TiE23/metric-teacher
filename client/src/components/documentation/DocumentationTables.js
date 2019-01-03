/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Icon, Table } from "semantic-ui-react";

import XLink from "../misc/ExternalLink";

export default {
  imperialVsUSVolumes: (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Unit</Table.HeaderCell>
          <Table.HeaderCell>US <Icon name="long arrow alternate right" />Imperial</Table.HeaderCell>
          <Table.HeaderCell>Unit Difference</Table.HeaderCell>
          <Table.HeaderCell>Imperial <Icon name="long arrow alternate right" />US</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row verticalAlign="top">
          <Table.Cell>
            <b>Fluid Ounce (fl oz)</b>
          </Table.Cell>
          <Table.Cell>
            1 US fl oz = 1.04 imp fl oz
            <br />
            1 US fl oz = <i>29.6 ml</i>
          </Table.Cell>
          <Table.Cell>
            US Fluid Ounce is 4% larger
          </Table.Cell>
          <Table.Cell>
            1 imp fl oz = 0.96 US fl oz
            <br />
            1 imp fl oz = <i>28.4 ml</i>
          </Table.Cell>
        </Table.Row>

        <Table.Row verticalAlign="top">
          <Table.Cell>
            <b>Pint (pt)</b>
          </Table.Cell>
          <Table.Cell>
            1 US pt = 8 US fl oz
            <br />
            1 US pt = 16.7 imp fl oz
            <br />
            1 US pt = 0.83 imp pt
            <br />
            1 US pt = <i>473.2 ml</i>
          </Table.Cell>
          <Table.Cell>
            Imperial Pint is 20% larger
          </Table.Cell>
          <Table.Cell>
            1 imp pt = 20 imp fl oz
            <br />
            1 imp pt = 19.2 US fl oz
            <br />
            1 imp pt = 1.2 US pt
            <br />
            1 imp pt = <i>568.3 ml</i>
          </Table.Cell>
        </Table.Row>

        <Table.Row verticalAlign="top">
          <Table.Cell>
            <b>Quart (qt)</b>
          </Table.Cell>
          <Table.Cell>
            1 US qt = 2 US pt
            <br />
            1 US qt = 32 US fl oz
            <br />
            1 US qt = 33.3 imp fl oz
            <br />
            1 US qt = 0.83 imp qt
            <br />
            1 US qt = <i>946.4 ml</i>
          </Table.Cell>
          <Table.Cell>
            Imperial Quart is 20% larger
          </Table.Cell>
          <Table.Cell>
            1 imp qt = 2 imp pt
            <br />
            1 imp qt = 40 imp fl oz
            <br />
            1 imp qt = 38 US fl oz
            <br />
            1 imp qt = 1.2 US qt
            <br />
            1 imp qt = <i>1136.5 ml</i>
          </Table.Cell>
        </Table.Row>

        <Table.Row verticalAlign="top">
          <Table.Cell>
            <b>Gallon (gal)</b>
          </Table.Cell>
          <Table.Cell>
            1 US gal = 4 US qt
            <br />
            1 US gal = 128 US fl oz
            <br />
            1 US gal = 133 imp fl oz
            <br />
            1 US gal = 0.83 imp gal
            <br />
            1 US gal = <i>3785.4 ml</i>
          </Table.Cell>
          <Table.Cell>
            Imperial Gallon is 20% larger
          </Table.Cell>
          <Table.Cell>
            1 imp gal = 4 imp qt
            <br />
            1 imp gal = 160 imp fl oz
            <br />
            1 imp gal = 153 US fl oz
            <br />
            1 imp gal = 1.2 US gal
            <br />
            1 imp gal = <i>4546.1 ml</i>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),

  metricPrefixes: (
    <Table celled compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Prefix</Table.HeaderCell>
          <Table.HeaderCell>Symbol</Table.HeaderCell>
          <Table.HeaderCell>Decimal</Table.HeaderCell>
          <Table.HeaderCell>English Word</Table.HeaderCell>
          <Table.HeaderCell>Note</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>tera</Table.Cell>
          <Table.Cell>T</Table.Cell>
          <Table.Cell>1&nbsp;000&nbsp;000&nbsp;000&nbsp;000</Table.Cell>
          <Table.Cell>trillion</Table.Cell>
          <Table.Cell>&nbsp;</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>giga</Table.Cell>
          <Table.Cell>G</Table.Cell>
          <Table.Cell>1&nbsp;000&nbsp;000&nbsp;000</Table.Cell>
          <Table.Cell>billion</Table.Cell>
          <Table.Cell>&nbsp;</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>mega</Table.Cell>
          <Table.Cell>M</Table.Cell>
          <Table.Cell>1&nbsp;000&nbsp;000</Table.Cell>
          <Table.Cell>million</Table.Cell>
          <Table.Cell>&nbsp;</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>kilo</Table.Cell>
          <Table.Cell>k</Table.Cell>
          <Table.Cell>1&nbsp;000</Table.Cell>
          <Table.Cell>thousand</Table.Cell>
          <Table.Cell>&nbsp;</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>hecto</Table.Cell>
          <Table.Cell>h</Table.Cell>
          <Table.Cell>100</Table.Cell>
          <Table.Cell>hundred</Table.Cell>
          <Table.Cell>Rare, but used in the hectare.</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>deca</Table.Cell>
          <Table.Cell>da</Table.Cell>
          <Table.Cell>10</Table.Cell>
          <Table.Cell>ten</Table.Cell>
          <Table.Cell>Uncommon.</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>&nbsp;</Table.Cell>
          <Table.Cell>&nbsp;</Table.Cell>
          <Table.Cell>1</Table.Cell>
          <Table.Cell>one</Table.Cell>
          <Table.Cell>No prefix.</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>deci</Table.Cell>
          <Table.Cell>d</Table.Cell>
          <Table.Cell>0.1</Table.Cell>
          <Table.Cell>tenth</Table.Cell>
          <Table.Cell>Uncommon.</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>centi</Table.Cell>
          <Table.Cell>c</Table.Cell>
          <Table.Cell>0.01</Table.Cell>
          <Table.Cell>hundredth</Table.Cell>
          <Table.Cell>&nbsp;</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>milli</Table.Cell>
          <Table.Cell>m</Table.Cell>
          <Table.Cell>0.001</Table.Cell>
          <Table.Cell>thousandth</Table.Cell>
          <Table.Cell>&nbsp;</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>micro</Table.Cell>
          <Table.Cell>µ</Table.Cell>
          <Table.Cell>0.000&nbsp;001</Table.Cell>
          <Table.Cell>millionth</Table.Cell>
          <Table.Cell>Symbol is the <XLink to="https://en.wikipedia.org/wiki/Mu_(letter)#Measurement">Greek letter <i>mu</i></XLink>.</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>nano</Table.Cell>
          <Table.Cell>n</Table.Cell>
          <Table.Cell>0.000&nbsp;000&nbsp;001</Table.Cell>
          <Table.Cell>billionth</Table.Cell>
          <Table.Cell>&nbsp;</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),

  length: {
    toMetric: (
      <Table celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Imperial</Table.HeaderCell>
            <Table.HeaderCell>Metric Base Unit</Table.HeaderCell>
            <Table.HeaderCell>Friendly Unit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>1/16 Inch (in)</Table.Cell>
            <Table.Cell>0.0016 Meters (m)</Table.Cell>
            <Table.Cell>1.6 Millimeters (mm)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Inch (in)</Table.Cell>
            <Table.Cell>0.0254 Meters (m)</Table.Cell>
            <Table.Cell>2.54 Centimeters (cm)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Foot (ft)</Table.Cell>
            <Table.Cell>0.3048 Meters (m)</Table.Cell>
            <Table.Cell>30.48 Centimeters (cm)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Yard (yd)</Table.Cell>
            <Table.Cell>0.9144 Meters (m)</Table.Cell>
            <Table.Cell>91.44 Centimeters (cm)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Mile (mi)</Table.Cell>
            <Table.Cell>1609.34 Meters (m)</Table.Cell>
            <Table.Cell>1.609 Kilometers (km)</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    ),

    fromMetric: (
      <Table celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Metric</Table.HeaderCell>
            <Table.HeaderCell>Imperial Base Unit</Table.HeaderCell>
            <Table.HeaderCell>Friendly Unit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>1 Millimeter (mm)</Table.Cell>
            <Table.Cell>0.0033 Feet (ft)</Table.Cell>
            <Table.Cell>0.0394 Inches (in) or about 1/25 of an Inch (in)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Centimeter (cm)</Table.Cell>
            <Table.Cell>0.0328 Feet (ft)</Table.Cell>
            <Table.Cell>0.3937 Inches (in)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Meter (m)</Table.Cell>
            <Table.Cell>3.2808 Feet (ft)</Table.Cell>
            <Table.Cell>3 Feet (ft), 3.37 Inches (in)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Kilometer (km)</Table.Cell>
            <Table.Cell>3280.84 Feet (ft)</Table.Cell>
            <Table.Cell>0.6213 Miles (mi)</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    ),

    usCustomaryUnitRelations: (
      <Table celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>One unit...</Table.HeaderCell>
            <Table.HeaderCell>Is made of...</Table.HeaderCell>
            <Table.HeaderCell>Makes up...</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row verticalAlign="top">
            <Table.Cell>1 Mile (mi)</Table.Cell>
            <Table.Cell>
              5280 Feet (ft)
              <br />
              1760 Yards (yd)
            </Table.Cell>
            <Table.Cell>-</Table.Cell>
          </Table.Row>
          <Table.Row verticalAlign="top">
            <Table.Cell>1 Yard (yd)</Table.Cell>
            <Table.Cell>
              3 Feet (ft)
              <br />
              36 Inches (in)
            </Table.Cell>
            <Table.Cell>1/1760 Mile (mi)</Table.Cell>
          </Table.Row>
          <Table.Row verticalAlign="top">
            <Table.Cell>1 Foot (ft)</Table.Cell>
            <Table.Cell>
              12 Inches (in)
            </Table.Cell>
            <Table.Cell>
              1/3 Yard (yd)
              <br />
              1/5280 Mile (mi)
            </Table.Cell>
          </Table.Row>
          <Table.Row verticalAlign="top">
            <Table.Cell>1 Inch (in)</Table.Cell>
            <Table.Cell>-</Table.Cell>
            <Table.Cell>
              1/12 Foot (ft)
              <br />
              1/36 Yard (yd)
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    ),
  },

  mass: {
    toMetric: (
      <Table celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Imperial</Table.HeaderCell>
            <Table.HeaderCell>Metric Base Unit</Table.HeaderCell>
            <Table.HeaderCell>Friendly Unit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>1 Ounce (oz)</Table.Cell>
            <Table.Cell>0.0283 Kilograms (kg)</Table.Cell>
            <Table.Cell>28.3 Grams (g)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Pound (lb)</Table.Cell>
            <Table.Cell>0.4536 Kilograms (kg)</Table.Cell>
            <Table.Cell>453.6 Grams (g)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 US Ton (ton)</Table.Cell>
            <Table.Cell>907.2 Kilograms (kg)</Table.Cell>
            <Table.Cell>0.9072 Tonne (t)</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    ),

    fromMetric: (
      <Table celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Metric</Table.HeaderCell>
            <Table.HeaderCell>Imperial Base Unit</Table.HeaderCell>
            <Table.HeaderCell>Friendly Unit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>1 Gram (g)</Table.Cell>
            <Table.Cell>0.0022 Pounds (lb)</Table.Cell>
            <Table.Cell>0.035 Ounces (oz)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Kilogram (kg)</Table.Cell>
            <Table.Cell>2.204 Pounds (lb)</Table.Cell>
            <Table.Cell>2 Pounds (lb), 3.3 Ounces (oz)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Tonne (t)</Table.Cell>
            <Table.Cell>2204 Pounds (lb)</Table.Cell>
            <Table.Cell>1.10 US Tons (ton)</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    ),
  },

  volume: {
    toMetric: (
      <Table celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>US Customary</Table.HeaderCell>
            <Table.HeaderCell>Metric Base Unit</Table.HeaderCell>
            <Table.HeaderCell>Friendly Unit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>1 Fluid Ounce (fl oz)</Table.Cell>
            <Table.Cell>0.0296 Liters (l) </Table.Cell>
            <Table.Cell>29.6 Milliliters (ml)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Cup (cup)</Table.Cell>
            <Table.Cell>0.2366 Liters (l) </Table.Cell>
            <Table.Cell>236.6 Milliliters (ml)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Pint (pt)</Table.Cell>
            <Table.Cell>0.4732 Liters (l) </Table.Cell>
            <Table.Cell>473.2 Milliliters (ml)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Quart (qt)</Table.Cell>
            <Table.Cell>0.9464 Liters (l) </Table.Cell>
            <Table.Cell>946.4 Milliliters (ml)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Gallon (gal)</Table.Cell>
            <Table.Cell>3.785 Liters (l) </Table.Cell>
            <Table.Cell>3785 Milliliters (ml) </Table.Cell>
            <Table.Cell>-</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    ),

    fromMetric: (
      <Table celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Metric</Table.HeaderCell>
            <Table.HeaderCell>US Customary Base Unit</Table.HeaderCell>
            <Table.HeaderCell>Friendly Unit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>1 Milliliter (ml)</Table.Cell>
            <Table.Cell>0.0338 Fluid Ounces (fl oz)</Table.Cell>
            <Table.Cell>-</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Liter (l)</Table.Cell>
            <Table.Cell>33.8 Fluid Ounces(fl oz)</Table.Cell>
            <Table.Cell>1.06 Quarts (qt)</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    ),

    usCustomaryUnitRelations: (
      <Table celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>One unit...</Table.HeaderCell>
            <Table.HeaderCell>Is made of...</Table.HeaderCell>
            <Table.HeaderCell>Makes up...</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row verticalAlign="top">
            <Table.Cell>1 Gallon (gal)</Table.Cell>
            <Table.Cell>
              4 Quarts (qt),
              <br />
              or 8 Pints (pt),
              <br />
              or 16 Cups (cup),
              <br />
              or 128 Fluid Ounces (fl oz).
            </Table.Cell>
            <Table.Cell>-</Table.Cell>
          </Table.Row>
          <Table.Row verticalAlign="top">
            <Table.Cell>1 Quart (qt)</Table.Cell>
            <Table.Cell>
              2 Pints (pt),
              <br />
              or 4 Cups (cup),
              <br />
              or 32 Fluid Ounces (fl oz).
            </Table.Cell>
            <Table.Cell>1/4 Gallon (gal).</Table.Cell>
          </Table.Row>
          <Table.Row verticalAlign="top">
            <Table.Cell>1 Pint (pt)</Table.Cell>
            <Table.Cell>
              2 Cups (cup),
              <br />
              or 16 Fluid Ounces (fl oz).
            </Table.Cell>
            <Table.Cell>
              1/8 Gallon (gal),
              <br />
              or 1/2 Quart (qt).
            </Table.Cell>
          </Table.Row>
          <Table.Row verticalAlign="top">
            <Table.Cell>1 Cup (cup)</Table.Cell>
            <Table.Cell>8 Fluid Ounces (fl oz).</Table.Cell>
            <Table.Cell>
              1/16 Gallon (gal),
              <br />
              or 1/4 Quart (qt),
              <br />
              or 1/2 Pint (pt).
            </Table.Cell>
          </Table.Row>
          <Table.Row verticalAlign="top">
            <Table.Cell>1 Fluid Ounce (fl oz)</Table.Cell>
            <Table.Cell>-</Table.Cell>
            <Table.Cell>
              1/128 Gallon (gal),
              <br />
              or 1/32 Quart (qt),
              <br />
              or 1/16 Pint (pt),
              <br />
              or 1/8 Cup (cup).
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    ),
  },

  temperature: {
    toMetric: (
      <Table celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Need</Table.HeaderCell>
            <Table.HeaderCell>Formula</Table.HeaderCell>
            <Table.HeaderCell>In English</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <b>Absolute temperature</b>
            </Table.Cell>
            <Table.Cell>
              ([°F] - 32) × (5/9) = [°C]
            </Table.Cell>
            <Table.Cell>
              "With Fahrenheit subtract 32, then multiply by 5, then divide by 9."
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <b>Temperature Difference</b>
            </Table.Cell>
            <Table.Cell>
              [°F] × (5/9) = [°C]
            </Table.Cell>
            <Table.Cell>
              "With Fahrenheit multiply by 5, then divide by 9.
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    ),

    fromMetric: (
      <Table celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Need</Table.HeaderCell>
            <Table.HeaderCell>Formula</Table.HeaderCell>
            <Table.HeaderCell>In English</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <b>Absolute temperature</b>
            </Table.Cell>
            <Table.Cell>
              ([°C] × (9/5)) + 32 = [°F]
            </Table.Cell>
            <Table.Cell>
              "With Celsius multiply by 9, then divide by 5, then add 32."
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <b>Temperature Difference</b>
            </Table.Cell>
            <Table.Cell>
              [°C] × (9/5) = [°F]
            </Table.Cell>
            <Table.Cell>
              "With Celsius multiply by 9, then divide by 5."
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    ),
  },

  velocity: {
    toMetric: (
      <Table celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Imperial</Table.HeaderCell>
            <Table.HeaderCell>Metric Base Unit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>1 Mile per Hour (mph)</Table.Cell>
            <Table.Cell>1.609 Kilometers per Hour (km/h)</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    ),

    fromMetric: (
      <Table celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Metric</Table.HeaderCell>
            <Table.HeaderCell>Imperial Base Unit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>1 Kilometer per Hour (km/h)</Table.Cell>
            <Table.Cell>0.621 Miles per Hour (mph)</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    ),
  },

  area: {
    toMetric: (
      <Table celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Imperial</Table.HeaderCell>
            <Table.HeaderCell>Metric Base Unit</Table.HeaderCell>
            <Table.HeaderCell>Friendly Unit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>1 Square Foot (ft²)</Table.Cell>
            <Table.Cell>0.093 Square Meters (m²)</Table.Cell>
            <Table.Cell>-</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Acre (ac)</Table.Cell>
            <Table.Cell>4047 Square Meters (m²)</Table.Cell>
            <Table.Cell>0.405 Hectares (ha)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Square Mile (mi²)</Table.Cell>
            <Table.Cell>2,590,000 Square Meters (m²)</Table.Cell>
            <Table.Cell>2.59 Square Kilometers (km²)</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    ),

    fromMetric: (
      <Table celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Metric</Table.HeaderCell>
            <Table.HeaderCell>Imperial Base Unit</Table.HeaderCell>
            <Table.HeaderCell>Friendly Unit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>1 Square Meter (m²)</Table.Cell>
            <Table.Cell>10.76 Square Feet (ft²)</Table.Cell>
            <Table.Cell>-</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Hectare (ha)</Table.Cell>
            <Table.Cell>107,639 Square Feet (ft²)</Table.Cell>
            <Table.Cell>2.47 Acres (ac)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 Square Kilometer (km²)</Table.Cell>
            <Table.Cell>10,760,000 Square Feet (ft²)</Table.Cell>
            <Table.Cell>0.386 Square Miles (mi²)</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    ),
  },
};
