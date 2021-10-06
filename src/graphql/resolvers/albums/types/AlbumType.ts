import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { ArtistDto } from "../../artists/types/artist.dto";
import { ArtistType } from "../../artists/types/ArtistType";

export const AlbumType: GraphQLObjectType = new GraphQLObjectType({
  name: "album",
  description: "Album",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    artist: {
      type: ArtistType,
      description: "Get Album's Author",
      resolve: async (album, _, ctx) => {
        const artist: ArtistDto | undefined = await ctx.db.get(
          `SELECT * FROM artists where ArtistId = ?`,
          [album.id]
        );
        return artist ? { id: artist.ArtistId, name: artist.Name } : null;
      },
    },
  }),
});
