import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import * as Sentiment from 'sentiment';

@Entity()
export class MoodLog {

  @PrimaryKey()
  id: number

  @Property()
  raw: string;

  @Property()
  mood: string;

  @Property()
  intensifier: string;

  @Property()
  sentiment: number;

  @Property()
  createdAt: Date = new Date();

  constructor(raw: string, mood: string, intensifier: string) {

    var analyzer = new Sentiment();

    this.raw = raw;
    this.mood = mood;
    this.sentiment = analyzer.analyze(mood).score
    this.intensifier = intensifier;
    this.createdAt = new Date()
  }
}
