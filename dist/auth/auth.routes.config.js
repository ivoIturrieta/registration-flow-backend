"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const jwt_middleware_1 = __importDefault(require("./middleware/jwt.middleware"));
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
class AuthRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "AuthRoutes");
    }
    configureRoutes() {
        this.app.post(`/auth`, [
            express_validator_1.body("email").isEmail(),
            express_validator_1.body("password").isString(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            auth_middleware_1.default.verifyUserPassword,
            auth_controller_1.default.createJWT
        ]);
        this.app.post(`/auth/refresh-token`, [
            jwt_middleware_1.default.validJWTNeeded,
            jwt_middleware_1.default.verifyRefreshBodyField,
            jwt_middleware_1.default.validRefreshNeeded,
            auth_controller_1.default.createJWT
        ]);
        return this.app;
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vYXV0aC9hdXRoLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBQ3BFLG9GQUEyRDtBQUMzRCxpRkFBd0Q7QUFDeEQsbUZBQTBEO0FBRTFELGlIQUF1RjtBQUN2Rix5REFBeUM7QUFFekMsTUFBYSxVQUFXLFNBQVEseUNBQWtCO0lBQ2hELFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNyQix3QkFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUN2Qix3QkFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUMzQixvQ0FBd0IsQ0FBQyxzQkFBc0I7WUFDL0MseUJBQWMsQ0FBQyxrQkFBa0I7WUFDakMseUJBQWMsQ0FBQyxTQUFTO1NBQ3pCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQ25DLHdCQUFhLENBQUMsY0FBYztZQUM1Qix3QkFBYSxDQUFDLHNCQUFzQjtZQUNwQyx3QkFBYSxDQUFDLGtCQUFrQjtZQUNoQyx5QkFBYyxDQUFDLFNBQVM7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FDRjtBQXJCRCxnQ0FxQkMifQ==