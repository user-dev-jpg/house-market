import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as CryptoJS from 'crypto-js';
import { User } from "src/modules/users/entities/user.entity";
import { of, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class TokenGenerator {
	private jwtSecretKey: string;
	private aesKey: string;
	private accessTime: string;
	private refreshTime: string;

	constructor(private readonly jwtService: JwtService) {
		this.jwtSecretKey = process.env.SECRET_KEY || '';
		this.aesKey = process.env.AES_KEY || '';
		this.accessTime = process.env.JWT_ACCESS_EXPIRES_TIME || '1m';
		this.refreshTime = process.env.JWT_REFRESH_EXPIRES_TIME || '7d';
	}

	private async extractNumber(time: string): Promise<number> {
		return firstValueFrom(
			of(time).pipe(
				map(value => parseInt(value.replace(/\D/g, ''), 10))
			)
		);
	}

	async generator(user: User)
		: Promise<{
			accToken: string,
			accessExpiresIn: string,
			refToken: string,
			refreshExpiresIn: string
		}> {
		try {
			if (!this.jwtSecretKey || !this.aesKey) {
				throw new HttpException('Missing secret keys', HttpStatus.INTERNAL_SERVER_ERROR);
			}

			const payload = { sub: user.id, login: user.login, role: user.role };

			const [accToken, refToken] = await Promise.all([
				this.jwtService.signAsync(payload, { secret: this.jwtSecretKey, expiresIn: this.accessTime, algorithm: "HS512" }),
				this.jwtService.signAsync(payload, { secret: this.jwtSecretKey, expiresIn: this.refreshTime, algorithm: "HS512" }),
			]);

			// JWT'ni AES-256 bilan shifrlash (string formatga o'tkazish)
			const encryptedAccToken = CryptoJS.AES.encrypt(accToken, this.aesKey).toString();
			const encryptedRefToken = CryptoJS.AES.encrypt(refToken, this.aesKey).toString();

			const accessNum = await this.extractNumber(this.accessTime);
			const refreshNum = await this.extractNumber(this.refreshTime);

			// vaqt qo'shish
			const accessDate = new Date();
			accessDate.setMinutes(accessDate.getMinutes() + accessNum);

			const refreshDate = new Date();
			refreshDate.setDate(refreshDate.getDate() + refreshNum);

			return {
				accToken: encryptedAccToken,
				accessExpiresIn: accessDate.toLocaleString(),
				refToken: encryptedRefToken,
				refreshExpiresIn: refreshDate.toLocaleString()
			};
		} catch (error: any) {
			throw error instanceof HttpException
				? error
				: new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
