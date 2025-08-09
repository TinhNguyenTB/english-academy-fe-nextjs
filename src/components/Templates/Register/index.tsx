'use client'

import { FormInput } from '@/components/Atoms/FormInput'
import { Button, Form } from 'antd'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from '@/components/Atoms/LanguageSwitcher'
import { useRegister } from '@/components/Templates/Register/useRegister'

export default function RegisterTemplate() {
  const t = useTranslations()
  const [values, handles] = useRegister()
  const { control } = values
  const { onSubmit } = handles

  return (
    <main
      className='flex items-center justify-center h-screen px-4 overflow-auto bg-cover bg-center'
      style={{ backgroundImage: "url('/images/bgLogin.jpg')" }}
    >
      <div className='flex flex-col w-full max-w-md bg-white opacity-80 p-6 rounded-xl shadow-md'>
        <div className='flex justify-end'>
          <LanguageSwitcher />
        </div>
        <Form layout='vertical' onFinish={onSubmit}>
          <FormInput
            control={control}
            name='name'
            label={t('register.name')}
            required
            size='large'
            rules={{
              required: t('common.validation.required', { field: t('register.name') })
            }}
            prefix={<UserOutlined />}
          />
          <FormInput
            control={control}
            name='email'
            label={t('register.email')}
            required
            size='large'
            rules={{
              required: t('common.validation.required', { field: t('register.email') }),
              pattern: {
                value: /^\S+@\S+$/,
                message: t('common.validation.email')
              }
            }}
            prefix={<MailOutlined />}
          />
          <FormInput
            control={control}
            name='password'
            label={t('register.password')}
            password
            size='large'
            required
            rules={{
              required: t('common.validation.required', { field: t('register.password') })
            }}
            prefix={<LockOutlined />}
          />
          <FormInput
            control={control}
            name='confirmPassword'
            label={t('register.confirmPassword')}
            password
            size='large'
            required
            rules={{
              required: t('common.validation.required', { field: t('register.confirmPassword') }),
              validate: (value: string, formValues: any) =>
                value === formValues.password || t('register.passwordMismatch')
            }}
            prefix={<LockOutlined />}
          />
          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              {t('register.submit')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  )
}
