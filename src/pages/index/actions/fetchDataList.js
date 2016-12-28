import fetch from 'isomorphic-fetch';

export const IS_FETCHING = 'IS_FETCHING';
export const RECEIVED_DATA = 'RECEIVED_DATA';
export const DATA_TOTAL_SIZE = 'DATA_TOTAL_SIZE';
export const COMPONENT_FINISHED = 'COMPONENT_FINISHED';
//  change display state of blog-loading component
export function changeFetchState(fetchState) {
    return { type: IS_FETCHING, fetchState };
}
//  received data from server
export function changeData(data) {
    return { type: RECEIVED_DATA, data };
}
//  if blog-list-item is rendered, then plus 1
export function finishedOne () {
    return { type: COMPONENT_FINISHED };
}
//  set total size of data list
export function setTotalSize (size) {
    return { type: DATA_TOTAL_SIZE, size };
}

export function getData () {
    //  return a thunk function
    //  this function get two params by redux-thunk module
    //  dispatch and getState
    return function (dispatch, getState) {
        //  if data has received from server,then use cache
        if (getState().count.size > 0) {
            return;
        }
        //  return a promise object as a result of outer dispatch function
        return fetch('http://www.yangwenjie.net.cn/api/bloglist')
            .then((res) => {
                return res.json();
            }).then((json) => {
                if (!json.length) {
                    throw new Error('Fetched a wrong data which length is null from server.');
                }
                dispatch(setTotalSize(json.length));
                dispatch(changeData(json));
            }).catch((err) => {
                throw new Error(err);
            });
    }
}
