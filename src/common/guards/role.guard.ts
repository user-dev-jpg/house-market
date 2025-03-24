import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/roles.decorator";
import { RolesEnum } from "src/enums";

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private reflector: Reflector) { }

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
			ROLES_KEY,
			[
				context.getHandler(),
				context.getClass(),
			]
		)

		if (!requiredRoles) return true

		const { user } = context.switchToHttp().getRequest()
		// console.log(user);

		return requiredRoles.some((el) => user.role?.includes(el))
	}
}