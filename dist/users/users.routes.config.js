"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const users_controller_1 = __importDefault(require("./controllers/users.controller"));
const users_middleware_1 = __importDefault(require("./middleware/users.middleware"));
const jwt_middleware_1 = __importDefault(require("../auth/middleware/jwt.middleware"));
const common_permission_middleware_1 = __importDefault(require("../common/middleware/common.permission.middleware"));
const common_permissionflag_enum_1 = require("../common/middleware/common.permissionflag.enum");
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "UsersRoutes");
    }
    configureRoutes() {
        this.app
            .route(`/users`)
            .get(jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.ADMIN_PERMISSION), users_controller_1.default.listUsers)
            .post(express_validator_1.body("email").isEmail(), express_validator_1.body("password")
            .isLength({ min: 5 })
            .withMessage("Must include password (5+ characters)"), body_validation_middleware_1.default.verifyBodyFieldsErrors, users_middleware_1.default.validateSameEmailDoesntExist, users_controller_1.default.createUser);
        this.app.param(`userId`, users_middleware_1.default.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(users_middleware_1.default.validateUserExists, jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.onlySameUserOrAdminCanDoThisAction)
            .get(users_controller_1.default.getUserById)
            .delete(users_controller_1.default.removeUser);
        this.app.put(`/users/:userId`, [
            express_validator_1.body("email").isEmail(),
            express_validator_1.body("password")
                .isLength({ min: 5 })
                .withMessage("Must include password (5+ characters)"),
            express_validator_1.body("firstName").isString(),
            express_validator_1.body("lastName").isString(),
            express_validator_1.body("permissionFlags").isInt(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            users_middleware_1.default.validateSameEmailBelongToSameUser,
            users_middleware_1.default.userCantChangePermission,
            common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.PAID_PERMISSION),
            users_controller_1.default.put
        ]);
        this.app.patch(`/users/:userId`, [
            express_validator_1.body("email").isEmail().optional(),
            express_validator_1.body("password")
                .isLength({ min: 5 })
                .withMessage("Password must be 5+ characters")
                .optional(),
            express_validator_1.body("firstName").isString().optional(),
            express_validator_1.body("lastName").isString().optional(),
            express_validator_1.body("permissionFlags").isInt().optional(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            users_middleware_1.default.validatePatchEmail,
            users_middleware_1.default.userCantChangePermission,
            common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.PAID_PERMISSION),
            users_controller_1.default.patch
        ]);
        /**
         * This route does not currently require extra permissions.
         *
         * Please update it for admin usage in your own application!
         */
        this.app.put(`/users/:userId/permissionFlags/:permissionFlags`, [
            jwt_middleware_1.default.validJWTNeeded,
            common_permission_middleware_1.default.onlySameUserOrAdminCanDoThisAction,
            common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.FREE_PERMISSION),
            users_controller_1.default.updatePermissionFlags
        ]);
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3VzZXJzL3VzZXJzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBQ3BFLHNGQUE2RDtBQUM3RCxxRkFBNEQ7QUFDNUQsdUZBQThEO0FBQzlELHFIQUFxRjtBQUNyRixnR0FBaUY7QUFDakYsaUhBQXVGO0FBQ3ZGLHlEQUF5QztBQUl6QyxNQUFhLFdBQVksU0FBUSx5Q0FBa0I7SUFDakQsWUFBWSxHQUF3QjtRQUNsQyxLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQ2YsR0FBRyxDQUNGLHdCQUFhLENBQUMsY0FBYyxFQUM1QixzQ0FBb0IsQ0FBQyxzQkFBc0IsQ0FDekMsMkNBQWMsQ0FBQyxnQkFBZ0IsQ0FDaEMsRUFDRCwwQkFBZSxDQUFDLFNBQVMsQ0FDMUI7YUFDQSxJQUFJLENBQ0gsd0JBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFDdkIsd0JBQUksQ0FBQyxVQUFVLENBQUM7YUFDYixRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDcEIsV0FBVyxDQUFDLHVDQUF1QyxDQUFDLEVBQ3ZELG9DQUF3QixDQUFDLHNCQUFzQixFQUMvQywwQkFBZSxDQUFDLDRCQUE0QixFQUM1QywwQkFBZSxDQUFDLFVBQVUsQ0FDM0IsQ0FBQztRQUVKLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSwwQkFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLGdCQUFnQixDQUFDO2FBQ3ZCLEdBQUcsQ0FDRiwwQkFBZSxDQUFDLGtCQUFrQixFQUNsQyx3QkFBYSxDQUFDLGNBQWMsRUFDNUIsc0NBQW9CLENBQUMsa0NBQWtDLENBQ3hEO2FBQ0EsR0FBRyxDQUFDLDBCQUFlLENBQUMsV0FBVyxDQUFDO2FBQ2hDLE1BQU0sQ0FBQywwQkFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO1lBQzdCLHdCQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLHdCQUFJLENBQUMsVUFBVSxDQUFDO2lCQUNiLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDcEIsV0FBVyxDQUFDLHVDQUF1QyxDQUFDO1lBQ3ZELHdCQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQzVCLHdCQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQzNCLHdCQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDL0Isb0NBQXdCLENBQUMsc0JBQXNCO1lBQy9DLDBCQUFlLENBQUMsaUNBQWlDO1lBQ2pELDBCQUFlLENBQUMsd0JBQXdCO1lBQ3hDLHNDQUFvQixDQUFDLHNCQUFzQixDQUN6QywyQ0FBYyxDQUFDLGVBQWUsQ0FDL0I7WUFDRCwwQkFBZSxDQUFDLEdBQUc7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7WUFDL0Isd0JBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDbEMsd0JBQUksQ0FBQyxVQUFVLENBQUM7aUJBQ2IsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNwQixXQUFXLENBQUMsZ0NBQWdDLENBQUM7aUJBQzdDLFFBQVEsRUFBRTtZQUNiLHdCQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ3ZDLHdCQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ3RDLHdCQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDMUMsb0NBQXdCLENBQUMsc0JBQXNCO1lBQy9DLDBCQUFlLENBQUMsa0JBQWtCO1lBQ2xDLDBCQUFlLENBQUMsd0JBQXdCO1lBQ3hDLHNDQUFvQixDQUFDLHNCQUFzQixDQUN6QywyQ0FBYyxDQUFDLGVBQWUsQ0FDL0I7WUFDRCwwQkFBZSxDQUFDLEtBQUs7U0FDdEIsQ0FBQyxDQUFDO1FBRUg7Ozs7V0FJRztRQUNILElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxFQUFFO1lBQzlELHdCQUFhLENBQUMsY0FBYztZQUM1QixzQ0FBb0IsQ0FBQyxrQ0FBa0M7WUFDdkQsc0NBQW9CLENBQUMsc0JBQXNCLENBQ3pDLDJDQUFjLENBQUMsZUFBZSxDQUMvQjtZQUNELDBCQUFlLENBQUMscUJBQXFCO1NBQ3RDLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7QUF2RkQsa0NBdUZDIn0=