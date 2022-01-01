import { Injectable } from "@nestjs/common";
import { Neo4jService } from "@root/neo4j/neo4j.service";
import { RequestMusician } from "./dto/RequestMusician.dto";

@Injectable()
export class MusicianRepository {
	constructor(private neo4jService: Neo4jService) {}

	createOne(data: RequestMusician) {
		const { name, company } = data;
		return this.neo4jService
			.write(
				`CREATE(m:MUSICIAN {
                    id: apoc.create.uuid(), 
                    name: '${name}', 
                    company: '${company}'
                }) RETURN m`,
				{}
			)
			.then((res) => {
				return res.records[0].get("m").properties;
			});
	}

	findOne(musicianId: string) {
		return this.neo4jService
			.read(
				`MATCH (m: MUSICIAN)
				WHERE m.id = '${musicianId}'  
				RETURN m`,
				{}
			)
			.then((result) => {
				return result.records[0]?.get("m");
			});
	}

	deleteOne(musicianId: string) {
		return this.neo4jService
			.write(
				`MATCH (m:MUSICIAN {id: '${musicianId}'})
				DETACH DELETE m 
				RETURN m`
			)
			.then((result) => {
				return result.records[0]?.get("m");
			});
	}
	updateOne(queryArr: string[], musicianId: string) {
		const query = `MATCH (m:MUSICIAN {id:'${musicianId}'}) SET ${queryArr.join(
			", "
		)} RETURN m`;
		return this.neo4jService.write(query, {}).then((result) => {
			return result.records[0].get("m").properties;
		});
	}
}
