import LayoutDefault from "@/layouts/DefaultLayout";
import Head from 'next/head.js'

const Index = () => {
    return (
        <>
            <Head>
                <title>Bài viết</title>
            </Head>
            <div className="bs-stepper wizard-icons wizard-icons-example">
                <div className="bs-stepper-content border-top">
                    <form id="wizard-checkout-form">
                        <div id="checkout-cart" className="content active dstepper-block">
                            <div className="row">
                                <div className="col-xl-8 mb-6 mb-xl-0">

                                    <div className="alert alert-success alert-dismissible mb-4" role="alert">
                                        <div className="d-flex gap-4">
                                            <div className="alert-icon flex-shrink-0 rounded-circle me-0">
                                                <i className="icon-base bx bx-purchase-tag"></i>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="alert-heading mb-1">Available Offers</h5>
                                                <ul className="list-unstyled mb-0">
                                                    <li>- 10% Instant Discount on Bank of America Corp Bank Debit and Credit cards</li>
                                                    <li>- 25% Cashback Voucher of up to $60 on first ever PayPal transaction. TCA</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <button type="button" className="btn-close btn-pinned" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>

                                    <h5>My Shopping Bag (2 Items)</h5>

                                    <ul className="list-group mb-4">
                                        <li className="list-group-item p-6">
                                            <div className="d-flex gap-4 flex-sm-row flex-column align-items-center">
                                                <div className="flex-shrink-0 d-flex align-items-center">
                                                    <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/products/1.png" alt="google home" className="w-px-100" />
                                                </div>
                                                <div className="flex-grow-1">
                                                    <div className="row text-center text-sm-start">
                                                        <div className="col-md-8">
                                                            <p className="me-3 mb-2">
                                                                <a href="javascript:void(0)" className="fw-medium"> <span className="text-heading">Google - Google Home - White</span></a>
                                                            </p>
                                                            <div className="text-body-secondary mb-2 d-flex flex-wrap justify-content-center justify-content-sm-start">
                                                                <span className="me-1">Sold by:</span> <a href="javascript:void(0)" className="me-4">Apple</a>
                                                                <span className="badge bg-label-success">In Stock</span>
                                                            </div>
                                                            <div className="d-flex d-md-block align-items-center mb-2 gap-2 justify-content-center justify-content-sm-start">
                                                                <input type="number" className="form-control form-control-sm w-px-100" value="1" min="1" max="5" />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <div className="text-md-end">
                                                                <button type="button" className="btn-close btn-pinned" aria-label="Close"></button>
                                                                <div className="d-flex d-md-block align-items-center mb-2 gap-2 justify-content-center justify-content-sm-start">
                                                                    <div className="my-2 mt-md-8 mb-md-4">
                                                                        <span className="text-primary">$299/</span><s className="text-body">$359</s>
                                                                    </div>
                                                                    <button type="button" className="btn btn-sm btn-label-primary">Move to wishlist</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item p-6">
                                            <div className="d-flex gap-4 flex-sm-row flex-column align-items-center">
                                                <div className="flex-shrink-0 d-flex align-items-center">
                                                    <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/products/1.png" alt="google home" className="w-px-100" />
                                                </div>
                                                <div className="flex-grow-1">
                                                    <div className="row text-center text-sm-start">
                                                        <div className="col-md-8">
                                                            <p className="me-3 mb-2">
                                                                <a href="javascript:void(0)" className="fw-medium"> <span className="text-heading">Google - Google Home - White</span></a>
                                                            </p>
                                                            <div className="text-body-secondary mb-2 d-flex flex-wrap justify-content-center justify-content-sm-start">
                                                                <span className="me-1">Sold by:</span> <a href="javascript:void(0)" className="me-4">Apple</a>
                                                                <span className="badge bg-label-success">In Stock</span>
                                                            </div>
                                                            <div className="d-flex d-md-block align-items-center mb-2 gap-2 justify-content-center justify-content-sm-start">
                                                                <input type="number" className="form-control form-control-sm w-px-100" value="1" min="1" max="5" />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <div className="text-md-end">
                                                                <button type="button" className="btn-close btn-pinned" aria-label="Close"></button>
                                                                <div className="d-flex d-md-block align-items-center mb-2 gap-2 justify-content-center justify-content-sm-start">
                                                                    <div className="my-2 mt-md-8 mb-md-4">
                                                                        <span className="text-primary">$299/</span><s className="text-body">$359</s>
                                                                    </div>
                                                                    <button type="button" className="btn btn-sm btn-label-primary">Move to wishlist</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-xl-4">
                                    <div className="border rounded p-6 mb-4">
                                        <h6>Offer</h6>
                                        <div className="row g-4 mb-4">
                                            <div className="col-8 col-xxl-8 col-xl-12">
                                                <input type="text" className="form-control" placeholder="Enter Promo Code" aria-label="Enter Promo Code"/>
                                            </div>
                                            <div className="col-4 col-xxl-4 col-xl-12">
                                                <div className="d-grid">
                                                    <button type="button" className="btn btn-label-primary">Apply</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-lighter rounded p-6">
                                            <h6 className="mb-2">Buying gift for a loved one?</h6>
                                            <p className="mb-2">Gift wrap and personalized message on card, Only for $2.</p>
                                            <a href="javascript:void(0)" className="fw-medium">Add a gift wrap</a>
                                        </div>
                                        <hr className="mx-n6 my-6"/>


                                            <h6>Price Details</h6>
                                            <dl className="row mb-0 text-heading">
                                                <dt className="col-6 fw-normal">Bag Total</dt>
                                                <dd className="col-6 text-end">$1198.00</dd>

                                                <dt className="col-6 fw-normal">Coupon Discount</dt>
                                                <dd className="col-6 text-primary text-end">Apply Coupon</dd>

                                                <dt className="col-6 fw-normal">Order Total</dt>
                                                <dd className="col-6 text-end">$1198.00</dd>

                                                <dt className="col-6 fw-normal">Delivery Charges</dt>
                                                <dd className="col-6 text-end">
                                                    <s className="text-body-secondary">$5.00</s> <span className="badge bg-label-success ms-1">Free</span>
                                                </dd>
                                            </dl>
                                            <hr className="mx-n6 my-6"/>
                                            <dl className="row mb-0">
                                                <dt className="col-6 text-heading">Total</dt>
                                                <dd className="col-6 fw-medium text-end text-heading mb-0">$1198.00</dd>
                                            </dl>
                                        </div>
                                        <div className="d-grid">
                                            <button className="btn btn-primary btn-next">Place Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </form>

                </div>
            </div>
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