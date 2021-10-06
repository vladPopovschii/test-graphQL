import {
  GraphQLFieldConfigMap,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import { ArtistType } from "./types/ArtistType";
import { ArtistDto } from "./types/artist.dto";
import { Context } from "../../context";

export const query: GraphQLFieldConfigMap<any, Context> = {
  artists: {
    type: GraphQLList(ArtistType),
    description: "Get a list of artists",
    args: {
      limit: { type: GraphQLInt, defaultValue: 30 },
      page: { type: GraphQLInt, defaultValue: 1 },
    },
    resolve: async (_, args, ctx) => {
      const artists = await ctx.db.all<ArtistDto[]>(
        "SELECT * FROM artists LIMIT ? OFFSET ?",
        [args.limit, (args.page - 1) * args.limit]
      );
      return artists.map((artist) => ({
        id: artist.ArtistId,
        name: artist.Name,
      }));
    },
  },
  artist: {
    type: ArtistType,
    description: "Get a single album",
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_, args, ctx) => {
      return await ctx.db.get("SELECT * FROM artists WHERE AlbumId = ?", [
        args.id,
      ]);
    },
  },
};
