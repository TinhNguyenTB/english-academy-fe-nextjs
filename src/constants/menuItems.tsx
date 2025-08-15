import { ItemType, MenuItemType } from 'antd/es/menu/interface'
import { UserOutlined, HomeOutlined, DatabaseOutlined } from '@ant-design/icons'
import { PATHS } from '@/constants/paths'
import { Link } from '@/i18n/navigation'
import LanguageSwitcher from '@/components/Atoms/LanguageSwitcher'

export const menuItems: ItemType<MenuItemType>[] = [
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
  },
  {
    key: PATHS.TOPIC,
    icon: <DatabaseOutlined />,
    label: <Link href={PATHS.TOPIC}>Topics</Link>
  }
]
