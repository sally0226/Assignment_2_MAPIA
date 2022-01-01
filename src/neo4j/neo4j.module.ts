import { DynamicModule, Global, Module } from "@nestjs/common";
import { Neo4jService } from "./neo4j.service";
import { NEO4J_CONFIG, NEO4J_DRIVER } from "./neo4j.constants";
import { createDriver } from "./neo4j.util";
import { Neo4jConfig } from "@root/neo4j-config.interface";

@Global()
@Module({})
export class Neo4jModule {
	// eslint-disable-next-line @typescript-eslint/ban-types
	static forRoot(config: Neo4jConfig): DynamicModule {
		return {
			module: Neo4jModule,
			providers: [
				Neo4jService,
				{
					provide: NEO4J_CONFIG,
					useValue: config
				},
				{
					provide: NEO4J_DRIVER,
					inject: [NEO4J_CONFIG],
					useFactory: async (config: Neo4jConfig) =>
						createDriver(config)
				}
			],
			exports: [Neo4jService]
		};
	}
}
