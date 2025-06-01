import { useState } from "react"

export default function ModalUser({ onClose }: { onClose: () => void }) {
    const [user, setUser] = useState({
        name: '',
        phone: '',
        address: '',
        province_id:'',
        district_id:'',
        ward_id:'',
        cmnd: ''
    })
    return (
        <>
            <div className="modal fade show active" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-lg modal-simple modal-edit-user">
                    <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" onClick={onClose} className="btn-close" aria-label="Close"></button>
                        <div className="text-center mb-6">
                        <h4 className="mb-2">Edit User Information</h4>
                        <p>Updating user details will receive a privacy audit.</p>
                        </div>
                        <form className="row g-6" >
                        <div className="col-12 col-md-6">
                            <label className="form-label" >First Name</label>
                            <input type="text" id="modalEditUserFirstName" name="modalEditUserFirstName" className="form-control" placeholder="John" value="John"/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label" >Last Name</label>
                            <input type="text" id="modalEditUserLastName" name="modalEditUserLastName" className="form-control" placeholder="Doe" value="Doe"/>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Username</label>
                            <input type="text" id="modalEditUserName" name="modalEditUserName" className="form-control" placeholder="johndoe007" value="johndoe007"/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label">Email</label>
                            <input type="text" id="modalEditUserEmail" name="modalEditUserEmail" className="form-control" placeholder="example@domain.com" value="example@domain.com"/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label" >Status</label>
                            <div className="position-relative">
                                <div className="position-relative">
                                <select id="modalEditUserStatus" name="modalEditUserStatus" className="select2 form-select select2-hidden-accessible" aria-label="Default select example"  data-select2-id="modalEditUserStatus">
                                    <option data-select2-id="15">Status</option>
                                    <option value="1">Active</option>
                                    <option value="2">Inactive</option>
                                    <option value="3">Suspended</option>
                                </select>
                            </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label" >Tax ID</label>
                            <input type="text"  className="form-control modal-edit-tax-id" placeholder="123 456 7890" value="123 456 7890"/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label" >Phone Number</label>
                            <div className="input-group">
                            <span className="input-group-text">US (+1)</span>
                            <input type="text" className="form-control phone-number-mask" placeholder="202 555 0111" value="202 555 0111"/>
                            </div>
                        </div>
                        <div className="col-12 col-md-6" data-select2-id="118">
                            <label className="form-label">Language</label>
                            
                        </div>
                        <div className="col-12 col-md-6" data-select2-id="87">
                            <label className="form-label">Country</label>
                            
                        </div>
                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-primary me-sm-3 me-1">Submit</button>
                            <button type="reset" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}