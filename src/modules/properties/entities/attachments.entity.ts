import { IAttachments } from "src/interfaces";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity("attachments")
export class Attachments implements IAttachments {

	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "text" })
	imgPath: string;

	@Column({ type: "text" })
	avatar: string;

	@ManyToOne(() => Property, (property) => property.attachments, {onDelete:"CASCADE"})
	property: Property["id"]

}