

import React from 'react'
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react'

const ComponentModal = (props) => {
    return (
        <>
         <div className={`modal fade show ${props.show ? 'active' : ''}`} aria-modal="true" role="dialog" >
                <div className="modal-dialog modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel3">Nhập hàng</h5>
                      <button onClick={()=> props.setShowModal(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                    <div className="modal-footer">
                        {props.footer}
                      
                    </div>
                  </div>
                </div>
            </div>
        </>
    )
}
ComponentModal.propTypes = {
    show: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
    children: PropTypes.node,
    footer: PropTypes.node
};
ComponentModal.defaultProps = {
    show: false,
    setShowModal: false,
}
export default ComponentModal;