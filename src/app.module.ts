import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { AlbumModule } from "./domain/album/album.module";
import { MusicianModule } from "./domain/musician/musician.module";
import { ReadModule } from "./domain/read/read.module";
import { RelationModule } from "./domain/relation/relation.module";
import { SongModule } from "./domain/song/song.module";
import { Neo4jModule } from "./neo4j/neo4j.module";

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: [".env"], isGlobal: true }),
		GraphQLModule.forRoot({
			typePaths: ["./**/*.graphql"],
			buildSchemaOptions: {
				dateScalarMode: "isoDate",
				numberScalarMode: "integer"
			}
		}),
		Neo4jModule.forRoot({
			scheme: "neo4j+s",
			host: process.env.NEO4J_HOST,
			username: process.env.NEO4J_USERNAME,
			password: process.env.NEO4J_PASSWORD
		}),
		SongModule,
		AlbumModule,
		MusicianModule,
		RelationModule,
		ReadModule
	]
})
export class AppModule {}
