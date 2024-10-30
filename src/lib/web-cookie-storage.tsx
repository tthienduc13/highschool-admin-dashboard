import _ from "lodash";
import { getCookie, setCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";
// import Cookies from "js-cookie";

const webCookieStorage = {
    set(key: string, rawValue: unknown, option?: OptionsType) {
        const value = _.isString(rawValue)
            ? rawValue
            : JSON?.stringify(rawValue);
        setCookie(key, value, option);
    },

    get(key: string) {
        const value: string = getCookie(key) || "";
        try {
            return JSON?.parse(value);
        } catch {
            return value;
        }
    },

    remove(key: string) {
        setCookie(key, null, { maxAge: 0 });
    },

    // removeAll() {
    //     Object.keys(Cookies.get()).forEach((cookieName) => {
    //         Cookies.remove(cookieName);
    //     });
    // },

    setToken(value: string, option?: OptionsType) {
        setCookie("_access_token", value, option);
    },

    setIsNewUser(value: string, option?: OptionsType) {
        setCookie("_is_new_user", value, option);
    },

    getToken() {
        return getCookie("_access_token");
    },
};

export default webCookieStorage;
