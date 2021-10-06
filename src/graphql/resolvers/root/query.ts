import { GraphQLObjectType } from "graphql";
import { query as albumsQuery } from "../albums/query";
import { query as artistsQuery } from "../artists/query";

export const rootQuery = new GraphQLObjectType({
  name: "query",
  fields: {
    ...artistsQuery,
    ...albumsQuery,
  },
});
