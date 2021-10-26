import styled from "@emotion/styled";
import { DateTime, Duration } from "luxon";
import { Box } from "rendition";

type Props = {
  data: {
    id: number;
    description: string;
    sentiment: number;
    createdAt: string;
  }[];
  fromDatetime?: Date | null;
  toDatetime?: Date | null;
  colors?: string[];
  renderFromDateLabel?: (from: Date) => JSX.Element;
  renderToDateLabel?: (to: Date) => JSX.Element;
  onMouseEnter?: Function
  onMouseLeave?: Function
};

const Container = styled(Box)`
  position: relative;
  height: 200px;
`;

const SvgContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100%;

  svg {
    padding: 12px;
    margin: 16px;
  }

  .log {
    cursor: pointer;
    stroke-width: 0;
    opacity: 0.6;
    :hover {
      stroke-width: 2;
      opacity: 1;
    }
  }
`;

const LabelContainer = styled.div`
  position: absolute;
  bottom: 0;
`;

const Label = styled.span`
  width: max-content;
  height: max-content;
`;

const defaultRenderDateLabelComponent = (date: Date) => {
  return (
    <Label>
      {DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_SHORT)}
    </Label>
  );
};

const EventChart = (props: Props) => {

  const colors = props.colors || [
    "rgb(237, 125, 138)",
    "rgb(255, 165, 195)",
    "rgb(233, 233, 233)",
    "rgb(177, 234, 111)",
    "rgb(159, 206, 104)",
  ];

  const now = DateTime.now();

  const from = props.fromDatetime || now.minus({ years: 1 }).toJSDate();
  const to = props.toDatetime || now.toJSDate();

  const timeRange = DateTime.fromJSDate(to).diff(DateTime.fromJSDate(from));

  if (timeRange > Duration.fromObject({ years: 1 })) {
    // TODO: create ticks
  }

  const handleMouseEnter = (log:any) => {
    if (props.onMouseEnter) {
      props.onMouseEnter(log);
    }
  };

  const handleMouseLeave = () => {
    if (props.onMouseLeave) {
      props.onMouseLeave();
    }
  };

  const events = props.data.map((el) => {

    const timeOffset = DateTime.fromISO(el.createdAt).diff(
      DateTime.fromJSDate(from)
    );

    const distanceOffset = timeOffset.valueOf() / timeRange.valueOf();

    const fill = numberToColor(10*(el.sentiment + 5), 0, 100, colors);
    const cx = `${distanceOffset * 100}`;
    const cy = "0.125";
    const r = 1;

    return (
      <circle
        key={el.id}
        className="log"
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        stroke={fill}
        onMouseEnter={()=>handleMouseEnter(el)}
        onMouseLeave={handleMouseLeave}
      />
    );
  });

  const renderFromDateLabel = props.renderFromDateLabel || defaultRenderDateLabelComponent
  const renderToDateLabel = props.renderToDateLabel || defaultRenderDateLabelComponent

  return (
    <Container>
      <LabelContainer style={{ left: "0" }}>
        {renderFromDateLabel(from)}
      </LabelContainer>
      <LabelContainer style={{ right: "0" }}>
      {renderToDateLabel(to)}
      </LabelContainer>
      <SvgContainer>
        <svg width="auto" height="100px" viewBox={`0 -5 100 10`}>
          <rect x="0" y="0" width="100" height="0.1" fill="#eee" />
          {events}
        </svg>
      </SvgContainer>
    </Container>
  );
};

export default EventChart;

const numberToColor = (
  val: number,
  min: number = 0,
  max: number = 100,
  colors: string[] = ["#f00", "#0f0"]
): string => {
  const binSize = (max - min) / colors.length;
  const bin = Math.min(colors.length - 1, Math.floor(val / binSize));
  return colors[bin];
};
