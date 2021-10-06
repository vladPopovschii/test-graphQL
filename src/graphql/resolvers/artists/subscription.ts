import { GraphQLFieldConfigMap, GraphQLID, GraphQLNonNull } from "graphql";
import { Context } from "../../context";
import { Events } from "./Events";
import { ArtistType } from "./types/ArtistType";
import { withFilter } from "graphql-subscriptions";

export const subscription: GraphQLFieldConfigMap<any, Context> = {
  onArtistChange: {
    type: ArtistType,
    description: "Subscribes to artist's changes",
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    subscribe: withFilter(
      (_parent, _args, ctx) => ctx.socket.asyncIterator(Events.ArtistUpdated),
      (payload, args) => {
        return payload.onArtistChange.id.toString() === args.id;
      }
    ),
  },
};
