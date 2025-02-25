var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import axios from "axios";
var getToken = function () { return localStorage.getItem('access_token'); };
var instance = axios.create({
    baseURL: 'https://api.energy-cerber.ru/',
    headers: {
        ContentType: 'multipart/form-data',
        Authorization: "Bearer ".concat(getToken())
    }
});
export var fetchUserName = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, instance.get("user/self").then(function (response) {
                return response.data;
            })];
    });
}); };
export var addAvatarApi = function (formData) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, instance.post("user/avatar", formData).then(function (response) {
                return response.data;
            })];
    });
}); };
export var sendCodeApi = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, instance.get("user/register/verify_code?email=".concat(email)).then(function (response) {
                return response;
            })];
    });
}); };
export var confirmationApi = function (email, code) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, instance.post("user/register/verify_code?email=".concat(email, "&code=").concat(code)).then(function (response) {
                return response;
            })];
    });
}); };
export var registartionApi = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, instance.post("user/register", userData).then(function (response) {
                return response;
            })];
    });
}); };
export var loginApi = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, instance.post("user/login", data).then(function (response) {
                return response;
            })];
    });
}); };
export var getDataApi = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, instance.get('user/self')];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_1 = _a.sent();
                console.error("Ошибка при получении данных пользователя:", error_1);
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getAvatarData = function (avatarId) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, instance.get("static/avatars/".concat(avatarId, ".webp"))
                    // console.log("STATUS:", response.status)
                ];
            case 1:
                response = _a.sent();
                // console.log("STATUS:", response.status)
                return [2 /*return*/, true];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var fetchCategoriesApi = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, instance.get('categories/').then(function (response) {
                return response.data;
            })];
    });
}); };
export var categoriesInfo = function (id) {
    return instance.get("categories/".concat(id))
        .then(function (responce) {
        return responce.data;
    });
};
export var addCategoryApi = function (categoryData) {
    return instance.post('categories/', categoryData).then(function (response) {
        return response.data;
    });
};
export var editCategoryApi = function (id, categoryData) {
    return instance.put("categories/".concat(id), categoryData)
        .then(function (responce) {
        console.log(categoryData.color);
        return responce.data;
    });
};
export var categoriesNobaseApi = function () {
    return instance.get("categories/no_base")
        .then(function (responce) {
        return responce.data;
    });
};
export var categorieDeleteApi = function (id) {
    return instance.delete("categories/".concat(id))
        .then(function (responce) {
        return responce.data;
    });
};
export var addTaskApi = function (taskData) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, instance.post('tasks/', taskData).then(function (response) {
                return response.data;
            })];
    });
}); };
export var updateTasksApi = function () {
    return instance.get("tasks/")
        .then(function (responce) {
        return responce.data;
    });
};
export var taskInfoApi = function (id) {
    return instance.get("tasks/".concat(id))
        .then(function (responce) {
        return responce.data;
    });
};
export var editTaskApi = function (id, taskData) {
    return instance.put("tasks/".concat(id), taskData)
        .then(function (responce) {
        return responce.data;
    });
};
export var deleteTaskApi = function (id) {
    return instance.delete("tasks/".concat(id))
        .then(function (responce) {
        return responce.data;
    });
};
export var changeTaskStatusApi = function (id, taskData) {
    return instance.put("tasks/".concat(id, "/change_status"), taskData)
        .then(function (responce) {
        return responce.data;
    });
};
export var deleteUserApi = function () {
    return instance.delete("user/")
        .then(function (responce) {
        return responce.data;
    });
};
export var UserEditApi = function (userData) {
    return instance.put("user/edit", userData)
        .then(function (responce) {
        return responce.data;
    });
};
//# sourceMappingURL=api.js.map