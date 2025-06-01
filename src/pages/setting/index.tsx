import ModalUser from '@/components/common/modalUser'
import LayoutDefault from '@/layouts/DefaultLayout'
import { RootState } from '@/stores'
import Head from 'next/head.js'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Index = () => {
    const [tab, setTab] = useState(0)
    const [showModalUser, setShowModalUser] = useState(false)
    const info = useSelector((state: RootState) => state.employer.info)
    console.log(info)
    return (
        <>
            <Head>
                <title>Cài đặt</title>
            </Head>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">

                    <div className="col-xl-4 col-lg-5 order-1 order-md-0">
                        <div className="card mb-6">
                            <div className="card-body pt-12">

                                <div className="user-avatar-section">
                                    <div className=" d-flex align-items-center flex-column">
                                        <img className="img-fluid rounded mb-4" src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png" height="120" width="120" alt="User avatar" />
                                        <div className="user-info text-center">
                                            <h5>{info?.name}</h5>
                                            <span className="badge bg-label-secondary">Author</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-around flex-wrap my-6 gap-0 gap-md-3 gap-lg-4">
                                    <div className="d-flex align-items-center me-5 gap-4">
                                        <div className="avatar">
                                            <div className="avatar-initial bg-label-primary rounded w-px-40 h-px-40">
                                                <i className="icon-base bx bx-check icon-lg"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="mb-0">1.23k</h5>
                                            <span>Task Done</span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-4">
                                        <div className="avatar">
                                            <div className="avatar-initial bg-label-primary rounded w-px-40 h-px-40">
                                                <i className="icon-base bx bx-customize icon-lg"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="mb-0">568</h5>
                                            <span>Project Done</span>
                                        </div>
                                    </div>
                                </div>

                                <h5 className="pb-4 border-bottom mb-4">Details</h5>

                                <div className="info-container">
                                    <ul className="list-unstyled mb-6">
                                        <li className="mb-2">
                                            <span className="h6">Username:</span>
                                            <span>{info?.name}</span>
                                        </li>
                                        <li className="mb-2">
                                            <span className="h6">Email:</span>
                                            <span>{info?.email}</span>
                                        </li>
                                        <li className="mb-2">
                                            <span className="h6">Status:</span>
                                            <span>Active</span>
                                        </li>
                                        <li className="mb-2">
                                            <span className="h6">Role:</span>
                                            <span>{info?.role}</span>
                                        </li>
                                        <li className="mb-2">
                                            <span className="h6">CMND:</span>
                                            <span>{info?.cmnd}</span>
                                        </li>
                                        <li className="mb-2">
                                            <span className="h6">Phone:</span>
                                            <span>{info?.phone}</span>
                                        </li>
                                        <li className="mb-2">
                                            <span className="h6">Languages:</span>
                                            <span>{info?.language}</span>
                                        </li>
                                        <li className="mb-2">
                                            <span className="h6">Address:</span>
                                            <span>{info?.address}</span>
                                        </li>
                                    </ul>
                                    <div className="d-flex justify-content-center">
                                        <a onClick={() => setShowModalUser(true)} href="javascript:;" className="btn btn-primary me-4" data-bs-target="#editUser" data-bs-toggle="modal">Edit</a>
                                        <a href="javascript:;" className="btn btn-label-danger suspend-user">Suspend</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-8 col-lg-7 order-0 order-md-1">
                        <div className="nav-align-top">
                            <ul className="nav nav-pills flex-column flex-md-row mb-6 flex-wrap row-gap-2">
                                <li className="nav-item">
                                    <button onClick={() => setTab(0)} className={tab === 0 ? "nav-link active" : "nav-link"}>
                                        <i className="icon-base bx bx-user icon-sm me-1_5"></i>Account
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button onClick={() => setTab(1)} className={tab === 1 ? "nav-link active" : "nav-link"} >
                                        <i className="icon-base bx bx-lock-alt icon-sm me-1_5"></i>Security
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button onClick={() => setTab(2)} className={tab === 2 ? "nav-link active" : "nav-link"} ><i className="icon-base bx bx-detail icon-sm me-1_5"></i>Billing &amp; Plans</button>
                                </li>
                                <li className="nav-item">
                                    <button onClick={() => setTab(3)} className={tab === 3 ? "nav-link active" : "nav-link"} ><i className="icon-base bx bx-bell icon-sm me-1_5"></i>Notifications</button>
                                </li>
                            </ul>
                        </div>
                        {
                            tab === 0 && ( 
                            <div className="card mb-6">
                                <div className="table-responsive mb-4">
                                    <div className="dt-container dt-bootstrap5 dt-empty-footer">
                                        <div className="row border-bottom mx-0 px-3 py-3">
                                            <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto px-4 mt-0">
                                                <h5 className="card-title mb-0 text-md-start text-center pt-6 pt-md-0">Projects List</h5>
                                            </div>
                                        </div>
                                        <div className="justify-content-between dt-layout-table">
                                            <div className="d-md-flex justify-content-between align-items-center dt-layout-full table-responsive">
                                                <table className="table datatable-invoice dataTable dtr-column">
                                                    <thead>
                                                        <tr>
                                                            <th data-dt-column="0" className="control dt-orderable-none dtr-hidden"  aria-label="" >
                                                                <span className="dt-column-title"></span><span className="dt-column-order"></span>
                                                            </th>
                                                            <th data-dt-column="1" className="dt-orderable-asc dt-orderable-desc dt-ordering-desc" aria-sort="descending" aria-label="#: Activate to remove sorting">
                                                                <span className="dt-column-title" role="button">#</span><span className="dt-column-order"></span>
                                                            </th>
                                                            <th data-dt-column="2" className="dt-orderable-asc dt-orderable-desc" aria-label="Status: Activate to sort">
                                                                <span className="dt-column-title" role="button">Status</span><span className="dt-column-order"></span>
                                                            </th>
                                                            <th data-dt-column="2" className="dt-orderable-asc dt-orderable-desc" aria-label="Status: Activate to sort">
                                                                <span className="dt-column-title" role="button">Status</span><span className="dt-column-order"></span>
                                                            </th>
                                                            <th data-dt-column="5" className="dt-orderable-none" aria-label="Actions">
                                                                <span className="dt-column-title">Actions</span><span className="dt-column-order"></span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td className="sorting_1">
                                                            <a href="app-invoice-preview.html"><span>#5089</span></a>
                                                        </td>
                                                        <td>
                                                            <span className="d-inline-block" data-bs-toggle="tooltip" data-bs-html="true">
                                                            <span className="badge badge-center d-flex align-items-center justify-content-center rounded-pill bg-label-success w-px-30 h-px-30"><i className="bx bx-check icon-xs"></i></span>
                                                        </span>
                                                        </td>
                                                        <td className="dt-type-numeric">$3077</td>
                                                        <td>05/02/2020</td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <a href="javascript:;" className="btn btn-icon delete-record"><i className="bx bx-trash icon-md"></i></a>
                                                                <a href="app-invoice-preview.html" className="btn btn-icon" data-bs-toggle="tooltip" aria-label="Preview" data-bs-original-title="Preview">
                                                                <i className="bx bx-show icon-md"></i>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {
                            tab === 1 && (
                            <>
                                
                                <div className="card mb-6">
                                    <h5 className="card-header">Change Password</h5>
                                    <div className="card-body">
                                        <form id="formChangePassword" method="GET" className="fv-plugins-bootstrap5 fv-plugins-framework" >
                                            <div className="alert alert-warning alert-dismissible" role="alert">
                                                <h5 className="alert-heading mb-1">Ensure that these requirements are met</h5>
                                                <span>Minimum 8 characters long, uppercase &amp; symbol</span>
                                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                            </div>

                                            <div className="row gx-6">
                                                <div className="mb-4 col-12 col-sm-6 form-password-toggle form-control-validation fv-plugins-icon-container">
                                                    <label className="form-label" htmlFor="newPassword">New Password</label>
                                                    <div className="input-group input-group-merge has-validation">
                                                        <input className="form-control" type="password" id="newPassword" name="newPassword" placeholder="············"/>
                                                        <span className="input-group-text cursor-pointer">
                                                            <i className="icon-base bx bx-hide"></i>
                                                        </span>
                                                    </div>
                                            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                </div>

                                                <div className="mb-4 col-12 col-sm-6 form-password-toggle form-control-validation fv-plugins-icon-container">
                                                    <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
                                                    <div className="input-group input-group-merge has-validation">
                                                        <input className="form-control" type="password" name="confirmPassword" id="confirmPassword" placeholder="············"/>
                                                        <span className="input-group-text cursor-pointer">
                                                            <i className="icon-base bx bx-hide"></i>
                                                        </span>
                                                    </div>
                                                    <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                </div>
                                                <div>
                                                    <button type="submit" className="btn btn-primary me-2">Change Password</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                

                                <div className="card mb-6">
                                    <h5 className="card-header">Recent Devices</h5>
                                    <div className="table-responsive table-border-bottom-0">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th className="text-truncate">Browser</th>
                                            <th className="text-truncate">Device</th>
                                            <th className="text-truncate">Location</th>
                                            <th className="text-truncate">Recent Activities</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="text-truncate"><i className="icon-base bx bxl-windows icon-md text-info me-4"></i> <span className="text-heading">Chrome on Windows</span></td>
                                            <td className="text-truncate">HP Spectre 360</td>
                                            <td className="text-truncate">Switzerland</td>
                                            <td className="text-truncate">10, July 2021 20:07</td>
                                        </tr>
                                        <tr>
                                            <td className="text-truncate"><i className="icon-base bx bx-mobile-alt icon-md text-danger me-4"></i> <span className="text-heading">Chrome on iPhone</span></td>
                                            <td className="text-truncate">iPhone 12x</td>
                                            <td className="text-truncate">Australia</td>
                                            <td className="text-truncate">13, July 2021 10:10</td>
                                        </tr>
                                        <tr>
                                            <td className="text-truncate"><i className="icon-base bx bxl-android icon-md text-success me-4"></i> <span className="text-heading">Chrome on Android</span></td>
                                            <td className="text-truncate">Oneplus 9 Pro</td>
                                            <td className="text-truncate">Dubai</td>
                                            <td className="text-truncate">14, July 2021 15:15</td>
                                        </tr>
                                        <tr>
                                            <td className="text-truncate"><i className="icon-base bx bxl-apple icon-md text-secondary me-4"></i> <span className="text-heading">Chrome on MacOS</span></td>
                                            <td className="text-truncate">Apple iMac</td>
                                            <td className="text-truncate">India</td>
                                            <td className="text-truncate">16, July 2021 16:17</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </>
                        )}

                        {tab === 2 && (
                            <div className="card card-action mb-6">
                                <div className="card-header align-items-center">
                                <h5 className="card-action-title mb-0">Payment Methods</h5>
                                <div className="card-action-element">
                                    <button className="btn btn-primary btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#addNewCCModal"><i className="icon-base bx bx-plus icon-xs me-1_5"></i>Add Card</button>
                                </div>
                                </div>
                                <div className="card-body">
                                <div className="added-cards">
                                    <div className="cardMaster border p-6 rounded mb-4">
                                    <div className="d-flex justify-content-between flex-sm-row flex-column">
                                        <div className="card-information">
                                        <img className="mb-2" src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/icons/payments/mastercard.png" alt="Master Card" height="25"/>
                                        <div className="d-flex align-items-center mb-2">
                                            <h6 className="mb-0 me-2">Kaith Morrison</h6>
                                            <span className="badge bg-label-primary me-1">Popular</span>
                                        </div>
                                        <span className="card-number">∗∗∗∗ ∗∗∗∗ ∗∗∗∗ 9856</span>
                                        </div>
                                        <div className="d-flex flex-column text-start text-lg-end">
                                        <div className="d-flex order-sm-0 order-1">
                                            <button className="btn btn-sm btn-label-primary me-4" data-bs-toggle="modal" data-bs-target="#editCCModal">Edit</button>
                                            <button className="btn btn-sm btn-label-danger">Delete</button>
                                        </div>
                                        <small className="mt-sm-4 mt-2 order-sm-1 order-0 text-sm-end mb-2">Card expires at 12/24</small>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="cardMaster border p-6 rounded mb-4">
                                    <div className="d-flex justify-content-between flex-sm-row flex-column">
                                        <div className="card-information">
                                        <img className="mb-2" src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/icons/payments/visa.png" alt="Master Card" height="25"/>
                                        <h6 className="mb-2 me-2">Tom McBride</h6>
                                        <span className="card-number">∗∗∗∗ ∗∗∗∗ ∗∗∗∗ 6542</span>
                                        </div>
                                        <div className="d-flex flex-column text-start text-lg-end">
                                        <div className="d-flex order-sm-0 order-1">
                                            <button className="btn btn-sm btn-label-primary me-4" data-bs-toggle="modal" data-bs-target="#editCCModal">Edit</button>
                                            <button className="btn btn-sm btn-label-danger">Delete</button>
                                        </div>
                                        <small className="mt-sm-4 mt-2 order-sm-1 order-0 text-sm-end mb-2">Card expires at 02/24</small>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="cardMaster border p-6 rounded">
                                    <div className="d-flex justify-content-between flex-sm-row flex-column">
                                        <div className="card-information">
                                        <img className="mb-2" src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/icons/payments/american-express-logo.png" alt="Visa Card" height="25"/>
                                        <div className="d-flex align-items-center mb-2">
                                            <h6 className="mb-0 me-2">Mildred Wagner</h6>
                                            <span className="badge bg-label-danger me-1">Expired</span>
                                        </div>
                                        <span className="card-number">∗∗∗∗ ∗∗∗∗ ∗∗∗∗ 5896</span>
                                        </div>
                                        <div className="d-flex flex-column text-start text-lg-end">
                                        <div className="d-flex order-sm-0 order-1">
                                            <button className="btn btn-sm btn-label-primary me-4" data-bs-toggle="modal" data-bs-target="#editCCModal">Edit</button>
                                            <button className="btn btn-sm btn-label-danger">Delete</button>
                                        </div>
                                        <small className="mt-sm-4 mt-2 order-sm-1 order-0 text-sm-end mb-2">Card expires at 08/20</small>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        )}

                        {tab === 3 && (
                            <div className="card mb-6">
                                <div className="card-header">
                                <h5 className="mb-0">Notifications</h5>
                                <span className="card-subtitle">Change to notification settings, the user will get the update</span>
                                </div>
                                <div className="table-responsive">
                                <table className="table">
                                    <thead className="border-top">
                                    <tr>
                                        <th className="text-nowrap">Type</th>
                                        <th className="text-nowrap text-center">Email</th>
                                        <th className="text-nowrap text-center">Browser</th>
                                        <th className="text-nowrap text-center">App</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="text-nowrap text-heading">New for you</td>
                                        <td>
                                        <div className="form-check d-flex justify-content-center">
                                            <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                        </div>
                                        </td>
                                        <td>
                                        <div className="form-check d-flex justify-content-center">
                                            <input className="form-check-input" type="checkbox" id="defaultCheck2"/>
                                        </div>
                                        </td>
                                        <td>
                                        <div className="form-check d-flex justify-content-center">
                                            <input className="form-check-input" type="checkbox" id="defaultCheck3" />
                                        </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-nowrap text-heading">Account activity</td>
                                        <td>
                                        <div className="form-check d-flex justify-content-center">
                                            <input className="form-check-input" type="checkbox" id="defaultCheck4" />
                                        </div>
                                        </td>
                                        <td>
                                        <div className="form-check d-flex justify-content-center">
                                            <input className="form-check-input" type="checkbox" id="defaultCheck5" />
                                        </div>
                                        </td>
                                        <td>
                                        <div className="form-check d-flex justify-content-center">
                                            <input className="form-check-input" type="checkbox" id="defaultCheck6" />
                                        </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-nowrap text-heading">A new browser used to sign in</td>
                                        <td>
                                        <div className="form-check d-flex justify-content-center">
                                            <input className="form-check-input" type="checkbox" id="defaultCheck7" />
                                        </div>
                                        </td>
                                        <td>
                                        <div className="form-check d-flex justify-content-center">
                                            <input className="form-check-input" type="checkbox" id="defaultCheck8"/>
                                        </div>
                                        </td>
                                        <td>
                                        <div className="form-check d-flex justify-content-center">
                                            <input className="form-check-input" type="checkbox" id="defaultCheck9"/>
                                        </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-nowrap text-heading">A new device is linked</td>
                                        <td>
                                        <div className="form-check d-flex justify-content-center">
                                            <input className="form-check-input" type="checkbox" id="defaultCheck10" />
                                        </div>
                                        </td>
                                        <td>
                                        <div className="form-check d-flex justify-content-center">
                                            <input className="form-check-input" type="checkbox" id="defaultCheck11" />
                                        </div>
                                        </td>
                                        <td>
                                        <div className="form-check d-flex justify-content-center">
                                            <input className="form-check-input" type="checkbox" id="defaultCheck12" />
                                        </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                </div>
                                <div className="card-body">
                                <button type="submit" className="btn btn-primary me-3">Save changes</button>
                                <button type="reset" className="btn btn-label-secondary">Discard</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showModalUser && <ModalUser onClose={() => setShowModalUser(false)}/>}
        </>
    )
}

Index.getLayout = function getLayout(page) {
    return (
        <LayoutDefault>
            {page}
        </LayoutDefault>
    )
}
export default Index;