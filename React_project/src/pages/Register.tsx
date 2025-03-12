import React from 'react';
import AuthForm from '../components/AuthForm';

const RegisterPage: React.FC = () => {
  return (
    <div>
      <AuthForm isLogin={false} />
    </div>
  );
};

export default RegisterPage;