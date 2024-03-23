import React from 'react';
// import "../styles/remix-icons/remixicon.css"
import '../styles/style.css';

const signin = () => {
  return (
    <>
      <div
        className="login-background"
        style={{
          backgroundImage: `url(${require('../../public/media/img/login-bg.jpg')})`,
        }}
      />
      <div className="container d-flex flex-column flex-root">
        {/* begin::Login*/}
        <div className="login login-6 login-signin-on login-signin-on d-flex flex-row-fluid" id="kt_login">
          <div className="d-flex flex-column flex-lg-row flex-row-fluid">
            {/* begin:Content*/}
            <div className="d-flex w-100 position-relative overflow-hidden login-background-sub justify-content-center">
              <div className="row">
                <div className="col-md-6">
                  <div className="login-title h1 b mb-32">
                    <img src="media/brands/logo.svg" width={200} />
                  </div>
                  <h1 className="login-title mb-32">Cổng thông tin dành cho doanh nghiệp</h1>
                </div>
                <div className="col-md-6">
                  <div className="login-wrapper">
                    {/* begin:Sign In Form*/}
                    <div className="login-box-wrapper">
                      <div className="login-box-grad" />
                      <div className="box login-box">
                        <div className="form">
                          <div className="h2 font-weight-500 mb-32 text-center">Đăng nhập</div>
                          <div className="form-login-inner list-mb20 list-crop">
                            <div className="form-group">
                              <label>Tên đăng nhập</label>
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Nhập tên đăng nhập hệ thống"
                              />
                            </div>
                            <div className="form-group">
                              <label>Mật khẩu</label>
                              <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="Nhập mật khẩu truy cập hệ thống"
                              />
                            </div>
                            <div className="row">
                              <div className="col">
                                <label className="checkbox">
                                  <input type="checkbox" name="checkbox1" />
                                  <span />
                                  Ghi nhớ đăng nhập
                                </label>
                              </div>
                              <div className="col-auto">
                                <a href="" data-toggle="modal" data-target="#modalPassword">
                                  <div className="text-dark text-hover-primary">Quên mật khẩu?</div>
                                </a>
                              </div>
                            </div>
                            <a className="btn btn-primary btn-block btn-lg" href="pages/index.html">
                              Đăng nhập
                            </a>
                          </div>
                          <div className="pt-30 text-center">
                            Bạn chưa có tài khoản?
                            <a href="pages/login/2-reg.html">
                              <u>Đăng ký ngay</u>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end:Sign In Form*/}
                  </div>
                </div>
              </div>
            </div>
            {/* end:Content*/}
          </div>
          {/* end::Login*/}
        </div>
      </div>
      {/* end::Main*/}
      <div id="kt_scrolltop" className="scrolltop">
        <i className="ri-arrow-up-s-line" />
      </div>
      {/* modal.modal */}
      <div
        className="modal fade"
        id="modalPassword"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-md modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h2 b" id="exampleModalLabel">
                Quên mật khẩu
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <img src="media/icons-color/subdefault/default/24x24-close.svg" alt="" />
              </button>
            </div>
            <div className="modal-body">
              <div className="form list-mb24 list-crop">
                <div className="text-left">
                  Vui lòng nhập địa chỉ email đã đăng ký. Chúng tôi sẽ gửi lại mật khẩu mới cho bạn.
                </div>
                <div className="form-group">
                  <label>Địa chỉ email</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Nhập địa chỉ email"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="row row-16 list-mb8 list-crop justify-content-end">
                <div className="auto">
                  <a className="btn btn-secondary btn-block" data-dismiss="modal">
                    Đóng
                  </a>
                </div>
                <div className="auto">
                  <a
                    className="btn btn-primary btn-block"
                    data-toggle="modal"
                    data-target="#modalAlert"
                    data-dismiss="modal"
                  >
                    Tiếp tục
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default signin;
