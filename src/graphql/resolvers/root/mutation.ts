import { GraphQLObjectType } from "graphql";
import { mutation as artistsMutation } from "../artists/mutation";

export const rootMutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    ...artistsMutation,
  },
});
