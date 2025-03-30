import { IPropDetails } from "src/interfaces";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity("propDetails")
export class PropDetails implements IPropDetails {

	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "int" })
	baths: number;

	@Column({ type: "int" })
	beds: number;

	@Column({ type: "int" })
	price: number;

	@Column({ type: "int" })
	size: number;

	@Column({ type: "int" })
	garageSize: number;

	@Column({ type: "int" })
	garages: number;

	@Column({ type: "text" })
	yearBuild: string;

	@Column({ type: "text" })
	status: string;

	@Column({ type: "text" })
	type: string;

	@OneToOne(() => Property, (property) => property.propDetails)
	@JoinColumn()
	property:Property["id"]

}