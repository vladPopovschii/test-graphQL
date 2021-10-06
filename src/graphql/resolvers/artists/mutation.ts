import { GraphQLFieldConfigMap, GraphQLNonNull } from "graphql";
import { Context } from "../../context";
import { Events } from "./Events";
import { ArtistDto } from "./types/artist.dto";
import { ArtistType, UpdateInputType } from "./types/ArtistType";

export const mutation: GraphQLFieldConfigMap<any, Context> = {
  updateArtist: {
    type: ArtistType,
    args: {
      input: {
        type: new GraphQLNonNull(UpdateInputType),
      },
    },
    resolve: async (_parent, args, ctx) => {
      await ctx.db.exec(
        `UPDATE artists SET Name = '${args.input.name}' WHERE ArtistId = ${args.input.id}`
      );
      const artist = await ctx.db.get<ArtistDto>(
        "SELECT * FROM artists WHERE ArtistId = ?",
        [args.input.id]
      );
      const parsedArtist = artist
        ? { id: artist.ArtistId, name: artist.Name }
        : null;
      ctx.socket.publish(Events.ArtistUpdated, {
        onArtistChange: parsedArtist,
      });
      return parsedArtist;
    },
  },
};
