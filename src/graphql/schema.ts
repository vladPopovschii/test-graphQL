import { GraphQLSchema } from "graphql";
import { rootQuery } from "./resolvers/root/query";
import { rootMutation } from "./resolvers/root/mutation";
import { rootSubscription } from "./resolvers/root/subscription";

export const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
  subscription: rootSubscription,
});
