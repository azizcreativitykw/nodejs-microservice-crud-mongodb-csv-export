import 'antd/dist/antd.css';
import './App.css';
import {Button, Layout} from 'antd';
import React from 'react';
import Users from "./pages/Users";
import {openNotificationWithIcon, postData} from "./utility";

const App = () => (
   <Users/>
);

export default App;

