import sqlite3 from "sqlite3";
import { Database } from "sqlite";
import { PubSub } from "graphql-subscriptions";

export type Context = {
  db: Database<sqlite3.Database, sqlite3.Statement>;
  socket: PubSub;
};
