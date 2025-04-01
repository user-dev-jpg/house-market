import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Attachments } from "./attachments.entity";
import { Location } from "./location.entity";
import { PropDetails } from "./prop-details.entity";

@Entity("property")
export class Property {

	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "int" })
	homeIndex: number

	@Column({ type: "int" })
	salePrice: number

	@Column({ type: "text" })
	description: string

	@Column({ type: "int" })
	rooms: number

	@OneToMany(() => Attachments, (attachments) => attachments.property, { cascade: true, onDelete: "CASCADE" })
	attachments: Attachments[]

	@OneToOne(() => Location, (location) => location.property, { cascade: true, onDelete: "CASCADE" })
	@JoinColumn()
	location: Location

	@OneToOne(() => PropDetails, (propDetails) => propDetails.property, { cascade: true, onDelete: "CASCADE" })
	@JoinColumn()
	propDetails: PropDetails

}