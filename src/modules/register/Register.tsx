import React from 'react';
import RegisterForm from './RegisterForm';

const Register = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover overflow-y-auto"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dpnjutbws/image/upload/v1709969661/Eco_Vu_Hoang/login-bg_ib5diy.jpg")',
      }}
    >
      <div className="flex flex-[1] justify-center px-12 mt-16 pt-10">
        <div className="flex-[1]">
          <div className="login-title">
            <div className="text-[28px] font-bold mb-4">
              <img src="http://127.0.0.1:5500/media/brands/logo.svg" alt="" width={200} />
            </div>
            <h1 className="login-title mb-32">Cổng thông tin dành cho doanh nghiệp</h1>
          </div>
        </div>

        <div className="flex-[1]">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
