import axios from "axios";
import {notification} from "antd";

const BASE_URL = 'http://localhost:3000/api';

export const openNotificationWithIcon = (type, title, msg) => {
    notification[type]({
        message: title,
        description: msg,
    });
};

export const getData = async (url) => {
    const config = {
        method: 'get',
        url: BASE_URL + url,
    };

    try {
      const req = await axios(config);
      return req;
    } catch (e) {
        console.log('e', e)
        // openNotificationWithIcon('error', 'Error',e.toString())
    }

}

export const updateData = async (url, data) => {
    const config = {
        method: 'put',
        data : data,
        url: BASE_URL + url,
    };
    console.log('config', config)

    try {
      const req = await axios(config);
      return req;
    } catch (e) {
        openNotificationWithIcon('error', 'Error',e.toString())
    }
}

export const postData = async (url, data) => {
    const config = {
        method: 'post',
        url: BASE_URL + url,
    };
    try {
      const req = await axios(config);
      return req;
    } catch (e) {
        openNotificationWithIcon('error', 'Error',e.toString())
    }
}
