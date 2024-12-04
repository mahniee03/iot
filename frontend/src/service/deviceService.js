import { get, post } from "../config/api.js";

export const postActionHistory = async (options) => {
    const result = await post(`api/control-device`, options);
    return result;
};

export const getActionHistory = async (pageSize, page, searchText, searchedColumn) => {
    const result = await get(`api/get-action-history?pageSize=${pageSize}&page=${page}&searchText=${searchText}
        &searchedColumn=${searchedColumn}`);
    return result;
}

