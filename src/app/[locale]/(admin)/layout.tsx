'use client'

import React from 'react'
import { UserOutlined, HomeOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { ItemType, MenuItemType } from 'antd/es/menu/interface'
import { PATHS } from '@/constants/paths'
import { Link } from '@/i18n/navigation'
import LanguageSwitcher from '@/components/Atoms/LanguageSwitcher'

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

const items: ItemType<MenuItemType>[] = [
  {
    key: 'language',
    label: <LanguageSwitcher />
  },
  {
    key: PATHS.HOME,
    icon: <HomeOutlined />,
    label: <Link href={PATHS.HOME}>Home</Link>
  },
  {
    key: PATHS.USER,
    icon: <UserOutlined />,
    label: <Link href={PATHS.USER}>Users</Link>
  }
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <Sider style={siderStyle} theme='light'>
        <Menu
          theme='light'
          mode='inline'
          items={items}
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
