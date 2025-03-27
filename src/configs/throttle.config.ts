import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerAsyncOptions } from "@nestjs/throttler";

export const ThrottlerConfig: ThrottlerAsyncOptions = {
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: async (configService: ConfigService) => ({
		throttlers: [
			{
				ttl: configService.get<number>('THROTTLE_TTL', 60), 
				limit: configService.get<number>('THROTTLE_LIMIT', 3), 
			}
		],
		errorMessage: 'Siz juda kop so`rov yubordingiz, 1 daqiqadan keyin qayta urinib koring'
	}),
};
