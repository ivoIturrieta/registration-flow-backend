"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
const users_middleware_1 = __importDefault(require("../users/middleware/users.middleware"));
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
class AuthRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "AuthRoutes");
    }
    configureRoutes() {
        this.app.post(`/auth`, [
            express_validator_1.body("email").isEmail(),
            express_validator_1.body("password")
                .isLength({ min: 8 })
                .withMessage("Must include password (8+ characters)"),
            express_validator_1.body("name").isLength({ min: 5 }),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            users_middleware_1.default.validateSameEmailDoesntExist,
            users_middleware_1.default.createUser,
            auth_controller_1.default.createJWT
        ]);
        this.app.post(`/login`, [
            express_validator_1.body("email").isEmail(),
            express_validator_1.body("password")
                .isLength({ min: 8 })
                .withMessage("Must include password (8+ characters)"),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            auth_middleware_1.default.verifyUserPassword,
            auth_controller_1.default.createJWT
        ]);
        return this.app;
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vYXV0aC9hdXRoLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBQ3BFLG9GQUEyRDtBQUUzRCxpSEFBdUY7QUFDdkYseURBQXlDO0FBQ3pDLDRGQUFtRTtBQUNuRSxtRkFBMEQ7QUFFMUQsTUFBYSxVQUFXLFNBQVEseUNBQWtCO0lBQ2hELFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNyQix3QkFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUN2Qix3QkFBSSxDQUFDLFVBQVUsQ0FBQztpQkFDYixRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ3BCLFdBQVcsQ0FBQyx1Q0FBdUMsQ0FBQztZQUN2RCx3QkFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNqQyxvQ0FBd0IsQ0FBQyxzQkFBc0I7WUFDL0MsMEJBQWUsQ0FBQyw0QkFBNEI7WUFDNUMsMEJBQWUsQ0FBQyxVQUFVO1lBQzFCLHlCQUFjLENBQUMsU0FBUztTQUN6QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDdEIsd0JBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUU7WUFDdkIsd0JBQUksQ0FBQyxVQUFVLENBQUM7aUJBQ2IsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNwQixXQUFXLENBQUMsdUNBQXVDLENBQUM7WUFDdkQsb0NBQXdCLENBQUMsc0JBQXNCO1lBQy9DLHlCQUFjLENBQUMsa0JBQWtCO1lBQ2pDLHlCQUFjLENBQUMsU0FBUztTQUN6QixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztDQUNGO0FBOUJELGdDQThCQyJ9