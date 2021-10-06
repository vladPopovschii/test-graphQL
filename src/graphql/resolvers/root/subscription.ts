import { GraphQLObjectType } from "graphql";
import { subscription as artistsSubscription } from "../artists/subscription";

export const rootSubscription = new GraphQLObjectType({
  name: "subscription",
  fields: {
    ...artistsSubscription,
  },
});
