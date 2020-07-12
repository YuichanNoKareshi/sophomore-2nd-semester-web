import { Descriptions } from 'antd';
import React from "react";


class ADAboutMain extends React.Component {

    render(){
        return(
            <Descriptions title="Introduction">
                <Descriptions.Item label="Developer">Zhou Yitian</Descriptions.Item>
                <Descriptions.Item label="Telephone">19802114250</Descriptions.Item>
                <Descriptions.Item label="Live">Xiangyang, Hubei</Descriptions.Item>
                <Descriptions.Item label="Remark">
                    It is an ebook store, select the books you like!
                </Descriptions.Item>

            </Descriptions>

        );
    }
}


export default ADAboutMain;