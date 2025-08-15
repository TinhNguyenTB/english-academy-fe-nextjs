'use client'

import React from 'react'
import { Layout, Menu } from 'antd'
import { menuItems } from '@/constants/menuItems'

const { Header, Content, Footer, Sider } = Layout

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable'
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <Sider style={siderStyle} theme='light'>
        <Menu
          theme='light'
          mode='inline'
          items={menuItems}
          style={{ height: '100%', minWidth: 'fit-content' }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white'
          }}
        />
        <Content style={{ overflow: 'initial' }}>
          <div
            style={{
              padding: 10,
              minHeight: 800
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: 'white' }}>
          English Academy ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  )
}
