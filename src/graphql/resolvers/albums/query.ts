import {
  GraphQLFieldConfigMap,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import { Context } from "../../context";
import { AlbumDto } from "./types/album.dto";
import { AlbumType } from "./types/AlbumType";

export const query: GraphQLFieldConfigMap<any, Context> = {
  albums: {
    type: GraphQLList(AlbumType),
    description: "Get a list of albums",
    args: {
      limit: { type: GraphQLInt, defaultValue: 30 },
      page: { type: GraphQLInt, defaultValue: 1 },
    },
    resolve: async (_, args, ctx) => {
      const albums = await ctx.db.all<AlbumDto[]>(
        "SELECT * FROM albums LIMIT ? OFFSET ?",
        [args.limit, (args.page - 1) * args.limit]
      );
      return albums.map((album) => ({ id: album.AlbumId, title: album.Title }));
    },
  },
  album: {
    type: AlbumType,
    description: "Get a single album",
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_, args, ctx) => {
      const album = await ctx.db.get<AlbumDto>(
        "SELECT * FROM albums WHERE AlbumId = ?",
        [args.id]
      );
      return album ? { id: album.AlbumId, title: album.Title } : null;
    },
  },
};
