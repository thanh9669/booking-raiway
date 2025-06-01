import DefaultLayout from "@/layouts/DefaultLayout";

const DetailPage = () => {
    return (
        <>
        <div className="container-xxl flex-grow-1 container-p-y">
          
            <div className="row g-6 mb-6">
                <div className="col-12">
                    <div className="card">
                        <div className="card-widget-separator-wrapper">
                        <div className="card-body card-widget-separator">
                            <div className="row gy-4 gy-sm-1">
                            <div className="col-sm-6 col-lg-3">
                                <div className="d-flex justify-content-between align-items-center card-widget-1 border-end pb-4 pb-sm-0">
                                <div>
                                    <h4 className="mb-0">24</h4>
                                    <p className="mb-0">Clients</p>
                                </div>
                                <div className="avatar me-sm-6">
                                    <span className="avatar-initial rounded bg-label-secondary text-heading">
                                    <i className="icon-base bx bx-user icon-26px"></i>
                                    </span>
                                </div>
                                </div>
                                <hr className="d-none d-sm-block d-lg-none me-6"/>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="d-flex justify-content-between align-items-center card-widget-2 border-end pb-4 pb-sm-0">
                                <div>
                                    <h4 className="mb-0">165</h4>
                                    <p className="mb-0">Invoices</p>
                                </div>
                                <div className="avatar me-lg-6">
                                    <span className="avatar-initial rounded bg-label-secondary text-heading">
                                    <i className="icon-base bx bx-file icon-26px"></i>
                                    </span>
                                </div>
                                </div>
                                <hr className="d-none d-sm-block d-lg-none me-6"/>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="d-flex justify-content-between align-items-center border-end pb-4 pb-sm-0 card-widget-3">
                                <div>
                                    <h4 className="mb-0">$2.46k</h4>
                                    <p className="mb-0">Paid</p>
                                </div>
                                <div className="avatar me-sm-6">
                                    <span className="avatar-initial rounded bg-label-secondary text-heading">
                                    <i className="icon-base bx bx-check-double icon-26px"></i>
                                    </span>
                                </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 className="mb-0">$876</h4>
                                    <p className="mb-0">Unpaid</p>
                                </div>
                                <div className="avatar">
                                    <span className="avatar-initial rounded bg-label-secondary text-heading">
                                    <i className="icon-base bx bx-error-circle icon-26px"></i>
                                    </span>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-sm-6">
                    <div className="card">
                        <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div className="card-info">
                            <p className="text-heading mb-1">Session</p>
                            <div className="d-flex align-items-center mb-1">
                                <h4 className="card-title mb-0 me-2">58,352</h4>
                                <span className="text-success">(+29%)</span>
                            </div>
                            <span>Last Week Analytics</span>
                            </div>
                            <div className="card-icon">
                            <span className="badge bg-label-primary rounded p-2">
                                <i className="icon-base bx bx-trending-up icon-lg"></i>
                            </span>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card">
                    <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div className="card-info">
                        <p className="text-heading mb-1">Time On Site</p>
                        <div className="d-flex align-items-center mb-1">
                            <h4 className="card-title mb-0 me-2">28m 14s</h4>
                            <span className="text-success">(+18%)</span>
                        </div>
                        <span>Last Day Analytics</span>
                        </div>
                        <div className="card-icon">
                        <span className="badge bg-label-info rounded p-2">
                            <i className="icon-base bx bx-time-five icon-lg"></i>
                        </span>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card">
                    <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div className="card-info">
                        <p className="text-heading mb-1">Bounce Rate</p>
                        <div className="d-flex align-items-center mb-1">
                            <h4 className="card-title mb-0 me-2">62%</h4>
                            <span className="text-danger">(-14%)</span>
                        </div>
                        <span>Last Week Analytics</span>
                        </div>
                        <div className="card-icon">
                        <span className="badge bg-label-danger rounded p-2">
                            <i className="icon-base bx bx-pie-chart-alt icon-lg"></i>
                        </span>
                        </div>
                    </div>
                    </div>
                     </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card">
                    <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div className="card-info">
                        <p className="text-heading mb-1">Users</p>
                        <div className="d-flex align-items-center mb-1">
                            <h4 className="card-title mb-0 me-2">18,472</h4>
                            <span className="text-success">(+42%)</span>
                        </div>
                        <span>Last Year Analytics</span>
                        </div>
                        <div className="card-icon">
                        <span className="badge bg-label-success rounded p-2">
                            <i className="icon-base bx bx-user icon-lg"></i>
                        </span>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>

            <div className="row g-6">
                <div className="col-md-6 col-lg-4 order-lg-1 order-2">
                <div className="card">
                    <div className="d-flex align-items-end row">
                    <div className="col-7">
                        <div className="card-body">
                        <h5 className="card-title mb-1 text-nowrap">Congratulations Katie! 🎉</h5>
                        <p className="card-subtitle text-nowrap mb-3">Best seller of the month</p>
            
                        <h5 className="card-title text-primary mb-0">$48.9k</h5>
                        <p className="mb-3">78% of target 🚀</p>
            
                        <a href="javascript:;" className="btn btn-sm btn-primary">View sales</a>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="card-body pb-0 text-end">
                        <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/illustrations/prize-light.png" width="91" height="144" className="rounded-start" alt="View Sales"/>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-8 order-lg-2 order-1 align-self-end">
                <div className="card">
                    <div className="d-flex align-items-start row">
                    <div className="col-sm-7">
                        <div className="card-body">
                        <h5 className="card-title text-primary mb-3">Congratulations John! 🎉</h5>
                        <p className="mb-6">You have done 72% more sales today.<br/>Check your new badge in your profile.</p>
            
                        <a href="javascript:;" className="btn btn-sm btn-label-primary">View Badges</a>
                        </div>
                    </div>
                    <div className="col-sm-5 text-center text-sm-left">
                        <div className="card-body pb-0 px-0 px-md-6">
                        <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/illustrations/man-with-laptop.png" height="175" className="scaleX-n1-rtl" alt="View Badge User"/>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-8 order-lg-3 col-12 align-self-end order-4">
                <div className="card">
                    <div className="d-flex row">
                    <div className="col-sm-6 col-md-5 text-center text-sm-left">
                        <div className="card-body pb-0 ps-10 text-sm-start text-center">
                        <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/illustrations/sitting-girl-with-laptop.png" height="181" alt="Target User"/>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-7">
                        <div className="card-body">
                        <h5 className="card-title text-primary mb-3">Welcome back Anna!</h5>
                        <p className="mb-6">You have 12 task to finish today, Your already completed 189 task good job.</p>
            
                        <span className="badge bg-label-primary">78% of TARGET</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-md-6 col-md-4 col-lg-4 order-lg-4 order-3">
                <div className="card">
                    <div className="d-flex align-items-end row">
                    <div className="col-4">
                        <div className="card-body pb-0">
                        <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/illustrations/superman-flying.png" height="176" className="rounded-start scaleX-n1-rtl" alt="upgrade account"/>
                        </div>
                    </div>
                    <div className="col-8 text-center">
                        <div className="card-body">
                        <h5 className="card-title mb-1">Upgrade Account</h5>
                        <p className="card-subtitle mb-3">Add 15 team members</p>
            
                        <h5 className="card-title text-info mb-0">$129</h5>
                        <p className="mb-3">20% OFF</p>
            
                        <a href="javascript:;" className="btn btn-sm btn-info">Upgrade</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        
        </div>
        </>
    )
}
DetailPage.getLayout = function getLayout(page) {
    return <DefaultLayout>{page}</DefaultLayout>;
};
export default DetailPage