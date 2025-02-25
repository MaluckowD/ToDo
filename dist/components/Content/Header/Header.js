import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import s from "./Header.module.css";
import Userinfo from "./Userinfo/Userinfo";
import Buttons from "./Buttons/Buttons";
import useStore from "../../../store/useToDoStore.js";
var Header = function () {
    var userData = useStore(function (state) { return state.userData; });
    if (!userData.name) {
        return _jsx("div", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F..." });
    }
    return (_jsx("header", { className: s.header, children: _jsx("div", { className: s.container, children: _jsxs("div", { className: s.header_inner, children: [_jsx(Userinfo, {}), _jsx(Buttons, {})] }) }) }));
};
export default Header;
//# sourceMappingURL=Header.js.map