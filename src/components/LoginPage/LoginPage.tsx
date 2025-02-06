import React, { useState, useRef } from 'react';
import './LoginPage.css';
import { UserOutlined, KeyOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Input, Button, Typography, Form } from 'antd';
import type { InputRef } from 'antd';

const { Title, Text } = Typography;

type FieldType = {
  username?: string;
  password?: string;
};

function LoginPage(): JSX.Element {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const passwordInputRef = useRef<InputRef>(null);

  const handleToggleVisibility = () => {
    const cursorPosition = passwordInputRef.current?.input?.selectionStart || 0;
    setPasswordVisible(!passwordVisible);

    setTimeout(() => {
      if (passwordInputRef.current?.input) {
        passwordInputRef.current.input.selectionStart = cursorPosition;
        passwordInputRef.current.input.selectionEnd = cursorPosition;
      }
    }, 0);
  };

  return (
    <div className="FormContainer">
      <Form className="FormLogin">
        <Title>Добро пожаловать</Title>
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: 'Пожалуйста, введите ваш логин!' }]}
        >
          <Input
            allowClear
            placeholder="Введите логин:"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
        >
          <Input
            allowClear
            prefix={<KeyOutlined />}
            placeholder="Введите пароль:"
            type={passwordVisible ? 'text' : 'password'}
            ref={passwordInputRef}
            suffix={
              <span
                style={{ cursor: 'pointer' }}
                onClick={handleToggleVisibility}
              >
                {passwordVisible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
              </span>
            }
          />
        </Form.Item>
        <Form.Item label={null}>
          <Button className='Button' type="primary">Войти</Button>
        </Form.Item>
        <Text>Все права защищены и тд</Text>
        <Button className='LinkBTN' target='_blank' href='https://t.me/zavrik127' type="link">Link Button</Button>
      </Form>
    </div>
  );
}

export default LoginPage;