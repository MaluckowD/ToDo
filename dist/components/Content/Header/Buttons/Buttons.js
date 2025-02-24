import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import s from "./Buttons.module.css";
import { useNavigate } from "react-router-dom";
import useStore from "../../../../store/useToDoStore.js";
var Buttons = function () {
    var navigate = useNavigate();
    var removeToken = useStore(function (state) { return state.removeToken; });
    var UpdateCallBack = useStore(function (state) { return state.UpdateCallBack; });
    var handleLogout = function () {
        removeToken();
        navigate("/login");
    };
    return (_jsxs("div", { className: s.buttons_item, children: [_jsx(NavLink, { onClick: UpdateCallBack, to: "/content", className: s.link_main, children: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F" }), _jsx(NavLink, { onClick: handleLogout, to: "/login", className: s.exit, children: "\u0412\u044B\u0439\u0442\u0438" })] }));
};
export default Buttons;
//# sourceMappingURL=Buttons.js.map