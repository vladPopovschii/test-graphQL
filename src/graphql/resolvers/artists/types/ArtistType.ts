import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { AlbumDto } from "../../albums/types/album.dto";
import { AlbumType } from "../../albums/types/AlbumType";

export const ArtistType: GraphQLObjectType = new GraphQLObjectType({
  name: "ArtistType",
  description: "Artist wich can have albums",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    albums: {
      type: GraphQLList(AlbumType),
      resolve: async (source, _args, ctx) => {
        const albums: AlbumDto[] = await ctx.db.all(
          `SELECT * FROM albums WHERE ArtistId = ?`,
          [source.id]
        );
        return albums.map((album) => ({
          id: album.AlbumId,
          title: album.Title,
        }));
      },
    },
  }),
});

export const UpdateInputType = new GraphQLInputObjectType({
  name: "updateArtistInput",
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
  },
});
