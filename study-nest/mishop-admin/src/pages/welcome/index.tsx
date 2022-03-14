import React from 'react';
import {Row, Col, Space, Collapse } from "antd";
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import bgWelcomeBanner from '@/assets/images/bg_welcome_banner.png'

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      {/* banner栏 */}
      <section className={styles.banner}>
        <img src={bgWelcomeBanner} alt="banner" />
        <p>欢迎使用MiShop管理平台</p>
      </section>

      {/* 技术框架栏 */}
      <section className={styles.versionInfo}>
        <Row>
          <Col span={3}>
            <span className={styles.title}>前端版本信息</span>
          </Col>
          <Col span={20}>
            <Space size="large">
              <img src="https://flat.badgen.net/badge/react/17.0.0/green" alt="react版本" />
              <img src="https://flat.badgen.net/badge/antd-pro/5.2.0/orange" alt="antd-pro版本" />
              <img src="https://flat.badgen.net/badge/antd/4.17.0/cyan" alt="antd版本" />
              <img src="https://flat.badgen.net/badge/umi/3.5/red" alt="umi版本" />
            </Space>
          </Col>
        </Row>

        <Row style={{marginTop: '30px'}}>
          <Col span={3}>
            <span className={styles.title}>后端版本信息</span>
          </Col>
          <Col span={20}>
            <Space size="large">
              <img src="https://flat.badgen.net/badge/nest/3.5/blue" alt="nest版本" />
            </Space>
          </Col>
        </Row>
      </section>

      {/* 版本更新信息栏 */}
      <section className={styles.versionHistory}>
        <Collapse ghost defaultActiveKey={['1']}>
          <Collapse.Panel header="1.0.0-RC1 2021-02-13" key="1">
            <p>1. 完成基本功能，实现前后端统一实现</p>
            <p>2. 新增欢迎页面</p>
          </Collapse.Panel>
        </Collapse>
      </section>
    </PageContainer>
  );
};

export default Welcome;
