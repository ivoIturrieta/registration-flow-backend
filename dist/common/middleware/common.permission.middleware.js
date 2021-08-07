"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_permissionflag_enum_1 = require("./common.permissionflag.enum");
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default("app:common-permission-middleware");
class CommonPermissionMiddleware {
    permissionFlagRequired(requiredPermissionFlag) {
        return (req, res, next) => {
            try {
                const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags);
                if (userPermissionFlags & requiredPermissionFlag) {
                    next();
                }
                else {
                    res.status(403).send();
                }
            }
            catch (e) {
                log(e);
            }
        };
    }
    onlySameUserOrAdminCanDoThisAction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags);
            if (req.params &&
                req.params.userId &&
                req.params.userId === res.locals.jwt.userId) {
                return next();
            }
            else {
                if (userPermissionFlags & common_permissionflag_enum_1.PermissionFlag.ADMIN_PERMISSION) {
                    return next();
                }
                else {
                    return res.status(403).send();
                }
            }
        });
    }
}
exports.default = new CommonPermissionMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLnBlcm1pc3Npb24ubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9taWRkbGV3YXJlL2NvbW1vbi5wZXJtaXNzaW9uLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2RUFBOEQ7QUFDOUQsa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUFvQixlQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUV2RSxNQUFNLDBCQUEwQjtJQUM5QixzQkFBc0IsQ0FBQyxzQkFBc0M7UUFDM0QsT0FBTyxDQUNMLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCLEVBQzFCLEVBQUU7WUFDRixJQUFJO2dCQUNGLE1BQU0sbUJBQW1CLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLG1CQUFtQixHQUFHLHNCQUFzQixFQUFFO29CQUNoRCxJQUFJLEVBQUUsQ0FBQztpQkFDUjtxQkFBTTtvQkFDTCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUN4QjthQUNGO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ1I7UUFDSCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUssa0NBQWtDLENBQ3RDLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNyRSxJQUNFLEdBQUcsQ0FBQyxNQUFNO2dCQUNWLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTTtnQkFDakIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUMzQztnQkFDQSxPQUFPLElBQUksRUFBRSxDQUFDO2FBQ2Y7aUJBQU07Z0JBQ0wsSUFBSSxtQkFBbUIsR0FBRywyQ0FBYyxDQUFDLGdCQUFnQixFQUFFO29CQUN6RCxPQUFPLElBQUksRUFBRSxDQUFDO2lCQUNmO3FCQUFNO29CQUNMLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDL0I7YUFDRjtRQUNILENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSwwQkFBMEIsRUFBRSxDQUFDIn0=