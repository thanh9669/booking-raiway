import LayoutDefault from "@/layouts/DefaultLayout";
import ModulesApi from "@/api/moduleApi";
import { useEffect, useState } from "react";
import { ENUMS } from "@/enums/index";
import toast from "@/helpers/toast";
const Dialogues = () => {
    const { dialoguesApi } = ModulesApi()
    const [data, setData] = useState([])
    const [dialoguesDetail, setDialoguesDetail] = useState(null)
    const fetchData = async () => {
        const resp = await dialoguesApi.get()
        console.log(resp)
        if (resp?.status == ENUMS.SUCCESS) {
            setData(resp?.data?.data?.data ?? [])
        } else {
            toast.error(resp?.data?.message)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            <div className="row g-6">
                {data?.map((item, index) => (
                    <div className="col-md-6 col-xxl-4">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between">
                                <div className="card-title mb-0">
                                    <h5 className="mb-1 me-2">{item?.topic_title}</h5>
                                    <p className="card-subtitle">{item?.description}</p>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="list-group">
                                    {item?.dialogues?.map((message, index) => (
                                        <a onClick={() => setDialoguesDetail(message)} href="javascript:void(0);" className="list-group-item list-group-item-action d-flex justify-content-between">
                                            <div className="li-wrapper d-flex justify-content-start align-items-start align-items-sm-center flex-column flex-sm-row gap-2 gap-sm-0">
                                                <div className="avatar avatar-sm me-4">
                                                    <span className="avatar-initial rounded-circle bg-label-success">{message?.sentence?.slice(0, 1)}</span>
                                                </div>
                                                <div className="list-content">
                                                    <h6 className="mb-1">{message?.sentence}</h6>
                                                    <small className="text-body-secondary">{message?.translation}</small>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`modal fade show ${dialoguesDetail ? 'active' : ''}`} aria-modal="true" role="dialog" >
                <div className="modal-dialog modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel3">{dialoguesDetail?.speaker}</h5>
                      <button onClick={() => setDialoguesDetail(null)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="list-group">
                            <small className="card-text text-uppercase text-body-secondary small">Nội dung</small>
                            <ul className="list-unstyled my-3 py-1">
                                <li className="d-flex align-items-center mb-4">
                                    Câu: <span className="badge bg-label-primary">{dialoguesDetail?.sentence}</span>
                                </li>
                                <li className="d-flex align-items-center mb-4">
                                    Nghĩa tiếng việt: <span className="badge bg-label-primary">{dialoguesDetail?.translation}</span>
                                </li>
                                <li className="d-flex align-items-center mb-4">
                                    Phân tích cú pháp: <span className="badge bg-label-primary">{dialoguesDetail?.syntax_analysis_vi?.structure}</span>
                                </li>
                                <li className="d-flex align-items-center mb-4">
                                    Thì: <span className="badge bg-label-primary">{dialoguesDetail?.syntax_analysis_vi?.tense}</span>
                                </li>
                            </ul>
                            <small className="card-text text-uppercase text-body-secondary small">Vocabulary</small>
                            {dialoguesDetail?.vocabulary?.map((item) =>
                            <ul className="list-unstyled my-3 py-1">
                                <li className="d-flex align-items-center mb-4">
                                    Từ: <span className="badge bg-label-primary">{item?.word}</span>
                                </li>
                                <li className="d-flex align-items-center mb-4">
                                    Nghĩa tiếng anh: {item?.en_meanings?.join(', ')}
                                </li>
                                <li className="d-flex align-items-center mb-4">
                                    Nghĩa tiếng việt: {item?.vi_meanings?.join(', ')}
                                </li>
                                <li className="d-flex align-items-center mb-4">
                                    Loại từ: {item?.usage_level_vi}
                                </li>
                                <li className=" align-items-center mb-4">
                                    Ví dụ: <span className="text-primary">{item?.examples?.join(', ')}</span>
                                </li>
                            </ul>
                            )}

                        </div>
                    </div>
                  </div>
                </div>
            </div>
        </>
    );
};

Dialogues.getLayout = function getLayout(page) {
    return (
        <LayoutDefault>
            {page}
        </LayoutDefault>
    )
}
export default Dialogues;