import styled from "@emotion/styled";
import { useState } from "react";
import { Badge, Box, Heading, Txt } from "rendition";
import { DateTime } from "luxon";
import { DateTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import EventChart from "../components/event-chart";
import icons from "../assets/icons";
import { useQuery } from "react-query";
import withQuery from "with-query";

type IMoodLogRO = {
  count: number
  items: MoodLog[]
}

type MoodLog = {
  id: number;
  description: string;
  sentiment: number;
  createdAt: Date;
};

const Container = styled(Box)`
  height: 100vh;
  display: grid;
  grid-template: 1fr 1fr 1fr / 1fr auto 1fr;
  grid-template-areas:
    ". header ."
    ". timeline ."
    ". footer .";
  align-items: center;
`;

const numberToShade = (
  val: number,
  min: number = 0,
  max: number = 100,
  shades: number[] = [5, 2, 11, 6, 1]
): number => {
  const binSize = (max - min) / shades.length;
  const bin = Math.min(shades.length - 1, Math.floor(val / binSize));
  return shades[bin];
};

const Home = () => {
  const [moodLogs, setMoodLogs] = useState<any>([]);
  const [hoveredMoodLog, setHoveredEvent] = useState<any>(null);

  const [fromDate, setFromDate] = useState<Date | null>(
    DateTime.now().minus({ years: 1 }).toJSDate()
  );
  const [toDate, setToDate] = useState<Date | null>(DateTime.now().toJSDate());

  const handleMouseEnteredEvent = (el: any) => {
    setHoveredEvent(el);
  };

  const handleMouseLeftEvent = () => {
    setHoveredEvent(null);
  };

  const { isLoading, error, data } = useQuery<IMoodLogRO, Error>(
    ["moodLogs", fromDate, toDate],
    (): Promise<IMoodLogRO> => {

      const url = '/api/moods'
      let params: any = {
        from: fromDate?.toISOString(),
        to: toDate?.toISOString(),
      };

      return fetch(withQuery(url, params)).then((res) => res.json());
    },
    {
      onSuccess: (data) => {
        setMoodLogs(data.items);
      },
    }
  );

  return (
    <Container>
      <Box style={{ gridArea: "header", alignItems: "center" }}>
        <Heading align="center" fontSize={"24px"} my={"16px"}>
          moody
        </Heading>
        <Box mx="auto" width={"max-content"}>
          <icons.Moods height={"32px"} />
        </Box>
      </Box>
      <Box style={{ gridArea: "timeline" }}>
        <EventChart
          data={moodLogs}
          fromDatetime={fromDate}
          toDatetime={toDate}
          renderFromDateLabel={(date: Date) => (
            <DateTimePicker
              value={date}
              label="From"
              clearable={false}
              onChange={(date: DateTime | null): void =>
                setFromDate(
                  date
                    ? date.toJSDate()
                    : DateTime.now().minus({ years: 1 }).toJSDate()
                )
              }
              renderInput={(params) => <TextField {...params} />}
            ></DateTimePicker>
          )}
          renderToDateLabel={(date: Date) => (
            <DateTimePicker
              value={date}
              label="To"
              clearable={false}
              onChange={(date: DateTime | null): void =>
                setToDate(date ? date.toJSDate() : new Date())
              }
              renderInput={(params) => <TextField {...params} />}
            ></DateTimePicker>
          )}
          onMouseEnter={handleMouseEnteredEvent}
          onMouseLeave={handleMouseLeftEvent}
        ></EventChart>
      </Box>

      {hoveredMoodLog !== null && (
        <Box
          style={{
            gridArea: "footer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Heading align="center">
            {DateTime.fromISO(hoveredMoodLog.createdAt).toLocaleString(
              DateTime.DATETIME_SHORT
            )}
          </Heading>
          <Badge
            shade={numberToShade(10 * (hoveredMoodLog.sentiment + 5))}
            my={"8px"}
          >
            {hoveredMoodLog.mood}
          </Badge>
          <Txt color="#ccc" align="center">
            {hoveredMoodLog.sentiment}
          </Txt>
        </Box>
      )}
    </Container>
  );
};

export default Home;
