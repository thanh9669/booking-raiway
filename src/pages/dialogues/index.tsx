import LayoutDefault from "@/layouts/DefaultLayout";
import ModulesApi from "@/api/moduleApi";
import { useEffect, useState, useRef } from "react";
import { ENUMS } from "@/enums/index";
import toast from "@/helpers/toast";

const Dialogues = () => {
    const { dialoguesApi } = ModulesApi()
    const [data, setData] = useState([])
    const [dialoguesDetail, setDialoguesDetail] = useState<string[]>([])
    const hasFetchedRef = useRef(false);

    const fetchData = async () => {
        const resp = await dialoguesApi.get({limit:6})
        console.log(resp)
        if (resp?.status == ENUMS.SUCCESS) {
            setData(resp?.data?.data?.data ?? [])
        } else {
            toast.error(resp?.data?.message)
        }
    }

   useEffect(() => {
        if (!hasFetchedRef.current) {
            fetchData();
            hasFetchedRef.current = true;
        }
    }, []);

    const handleShowDetail = (sentence: string) => {
        setDialoguesDetail(prev =>
            prev.includes(sentence)
                ? prev.filter(s => s !== sentence)
                : [...prev, sentence]
        );
    }

    return (
        <>
            <div className="row g-6">
                {data?.map((item, index) => (
                    <div className="col-md-6 col-xxl-4">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between">
                                <div className="card-title mb-0">
                                    <h5 className="mb-1 me-2">{item?.topic?.topic_title}</h5>
                                    <p className="card-subtitle">{item?.topic?.description}</p>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="accordion">
                                    {item?.dialogue[0]?.dialogues.map((message, index) => (
                                        <div className="card accordion-item">
                                            <h2 className="accordion-header">
                                                <button onClick={() => handleShowDetail(message.sentence)} className={`accordion-button${dialoguesDetail.includes(message.sentence) ? '' : ' collapsed'}`} type="button">
                                                    <div className="li-wrapper d-flex justify-content-start align-items-start align-items-sm-center flex-column flex-sm-row gap-2 gap-sm-0">
                                                        <div className="avatar avatar-sm me-4">
                                                            <span className="avatar-initial rounded-circle bg-label-success">{message?.sentence?.slice(0, 1)}</span>
                                                        </div>
                                                        <div className="list-content">
                                                            <h6 className="mb-1">{message?.sentence}</h6>
                                                        </div>
                                                    </div>
                                                </button>
                                            </h2>

                                            <div className={`accordion-collapse collapse${dialoguesDetail.includes(message.sentence) ? ' show' : ''}`}>
                                                <div className="accordion-body">
                                                     <div className="list-group">
                                                        <ul className="list-unstyled my-3 py-1">
                                                            <li className="align-items-center mb-4">
                                                                Nghĩa tiếng việt: {message?.translation}
                                                            </li>
                                                            <li className="align-items-center mb-4">
                                                                Phân tích cú pháp: {message?.syntax_analysis_vi?.structure}
                                                            </li>
                                                            <li className=" align-items-center mb-4">
                                                                Thì: {message?.syntax_analysis_vi?.tense}
                                                            </li>
                                                        </ul>
                                                        {message?.vocabulary &&
                                                        <small className="card-text text-uppercase text-body-secondary small">Vocabulary</small>
                                                        }
                                                        {message?.vocabulary?.map((item) =>
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
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
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