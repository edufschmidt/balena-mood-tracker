import { MoodLog } from "../entities/mood-log.entity";

export interface IMoodLog {
  moodLog: MoodLog
}

export interface IMoodLogsRO {
  items: MoodLog[]
  count: number
}