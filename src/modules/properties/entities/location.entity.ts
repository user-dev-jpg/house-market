import { ILocation } from "src/interfaces";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity("location")
export class Location implements ILocation {

	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "text" })
	address: string;

	@Column({ type: "text" })
	street: string;

	@Column({ type: "text" })
	city: string;

	@Column({ type: "text" })
	state: string;

	@Column({ type: "int" })
	zipcode: number;

	@Column({ type: "text" })
	area: string;

	@Column({ type: "text" })
	country: string;

	@OneToOne(() => Property, (property) => property.location)
	@JoinColumn()
	property: Property["id"]
}