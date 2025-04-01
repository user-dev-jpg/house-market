import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { Attachments } from "src/modules/properties/entities/attachments.entity";
import { Location } from "src/modules/properties/entities/location.entity";
import { PropDetails } from "src/modules/properties/entities/prop-details.entity";
import { Property } from "src/modules/properties/entities/property.entity";
import { User } from "src/modules/users/entities/user.entity";

export const TypeOrmConfig: TypeOrmModuleAsyncOptions = {
	useFactory: async (configService: ConfigService) => ({
		type: "postgres",
		url: configService.get<string>('DB_URL'),
		synchronize: true,
		logging: false,
		autoLoadEntities: true,
		entities: [User, Location, PropDetails, Attachments, Property],
	}),
	inject: [ConfigService]
}