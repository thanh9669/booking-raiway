import ModulesApi from '@/api/moduleApi';
import { ENUMS } from '@/enums';
import { strSlug } from '@/helpers/str';
import LayoutDefault from '@/layouts/DefaultLayout'
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { store } from '@/stores'
import {setLearnWords} from "@/stores/learn";
import TableLoading from '@/components/tables/table-loading';
import { getShuffledOptions, shuffleArray } from '@/helpers/common';
import Head from 'next/head.js';

const Word = () => {
    const [loading, setLoading] = useState(true);
    const audioRef = useRef(null);
    const [urlspeech, setUrlspeech] = useState(null);
    const { topicWordApi } = ModulesApi()
    const [data, setData] = useState([]);
    const [dataDetail, setDataDetail] = useState(null)
    const [words, setWords] = useState([])
    const [wordsRead, setWordsRead] = useState([])
    const [indexRead, setIndexRead] = useState(0)
    const learnWords = useSelector((state: any) => state.learn.learnWords)
    const skipWords = useSelector((state: any) => state.learn.skipWords)
    const rightWords = useSelector((state: any) => state.learn.rightWords)
    const fetchData = async () => {
        const resp = await topicWordApi.get({limit:6})
        if (resp?.status == ENUMS.SUCCESS) {
            setData(resp?.data?.data?.data ?? [])
        } else {
            toast.error(resp?.data?.message)
        }
        setLoading(false)
    }
     useEffect(() => {
        const result = getShuffledOptions(words, indexRead);
        setDataDetail({...dataDetail, ...result})
    }, [words, indexRead]);
    const handlerChose = (index) => {
        setDataDetail({...dataDetail, chose:index})
    }
    useEffect(() => {
        setWords(dataDetail?.vocabulary ? shuffleArray(dataDetail?.vocabulary) :  [])
        setIndexRead(0)
    }, [dataDetail?.topic])

   
    useEffect(() => {
        const url = 'https://golang-railway-production-f313.up.railway.app/public/mp3/'+strSlug(words?.[indexRead]?.word ?? '')+'.mp3'
        setUrlspeech(url)
    }, [indexRead, words])
    useEffect(() => {
        fetchData()
    }, [])

    const handleSpeech = (name) =>{
        audioRef.current.play()
    }
    

    const getStatusData = (popularity) => {
        switch(popularity){
            case 'low':
                return "alert-success"
            case 'medium':
                return "alert-primary"
            case 'high':
                return "alert-warning"
            case 'very high':
                return "alert-danger"
        }
    }

    const hanlderLearn = (item, prev) => {
        store.dispatch(setLearnWords(item))
        setIndexRead(prev ? indexRead - 1 : indexRead + 1)
    }
    return <>
        <Head>
            <title>Học từ mới</title>
        </Head>
            {/* <div className="row">
                <div className="col-12">
                <div className="card mb-6">
                    <div className="user-profile-header d-flex flex-column flex-lg-row text-sm-start text-center mb-8">
                        <div className="flex-shrink-0 mt-1 mx-sm-0 mx-auto">
                            <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png" alt="user image" className="d-block h-auto ms-0 ms-sm-6 rounded-3 user-profile-img"/>
                        </div>
                        <div className="flex-grow-1 mt-3 mt-lg-5">
                            <div className="d-flex align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-5 flex-md-row flex-column gap-4">
                            <div className="user-profile-info">
                                <h4 className="mb-2 mt-lg-7">1212</h4>
                                <ul className="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-4 mt-4">
                                <li className="list-inline-item"><i className="icon-base bx bx-palette me-2 align-top"></i><span className="fw-medium">UX Designer</span></li>
                                <li className="list-inline-item"><i className="icon-base bx bx-map me-2 align-top"></i><span className="fw-medium">Vatican City</span></li>
                                <li className="list-inline-item"><i className="icon-base bx bx-calendar me-2 align-top"></i><span className="fw-medium"> Joined April 2021</span></li>
                                </ul>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div> */}

            { loading ? <TableLoading/> : (
                <div className="row">
                    <div className="col-xl-4 col-lg-5 col-md-12">
                        <div className="card mb-6">
                            <div className="card-body">
                                <small className="card-text text-uppercase text-body-secondary small">Chu de</small>
                                <div className='mb-2'>
                                    {data?.map((item,index)=>(
                                        <div className={`${dataDetail?.topic == item.topic ? "checked":""} card form-check custom-option custom-option-basic mb-2` }>
                                            <label className="form-check-label custom-option-content">
                                                <input name="customRadioTemp" className="form-check-input" type="radio" value="" onClick={()=>setDataDetail(item)} key={index}/>
                                                <span className="custom-option-header">
                                                    <span className="h6 mb-0">{item?.topic}</span>
                                                </span>
                                                <span className="custom-option-body">
                                                    <small>{item?.description}</small>
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <small className="card-text text-uppercase text-body-secondary small">Thông tin </small>
                                <ul className="list-unstyled my-3 py-1">
                                    <li className="d-flex align-items-center mb-4">
                                        <span className="fw-medium mx-2">Số từ đã học :</span> 
                                        <span>{learnWords.length}</span>
                                    </li>
                                    <li className="d-flex align-items-center mb-4">
                                        <span className="fw-medium mx-2">Số từ trả lời đúng :</span> 
                                        <span>{rightWords.length}</span>
                                    </li>
                                    <li className="d-flex align-items-center mb-4">
                                        <span className="fw-medium mx-2">Số từ bỏ qua:</span> 
                                        <span>{skipWords.length}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <audio ref={audioRef} src={urlspeech} preload="auto" />
                    <div className="col-xl-8 col-lg-7 col-md-12">
                        {dataDetail?.description &&
                            <div className="card" id="card-block">
                                <h5 className="card-header">{dataDetail?.topic}</h5>
                                <div className="card-body">
                                    <h3 className="text-center">{indexRead+1}/{words?.length}</h3>
                                    <div className="progress mb-5">
                                        <div className="progress-bar" role="progressbar" style={{width:`${((indexRead+1)/words?.length)*100}%`}}></div>
                                    </div>
                                    <div className={`text-center alert  alert-dismissible ${getStatusData(words?.[indexRead]?.popularity)}`} role="alert">
                                        <h4 className="text-canter alert-heading">
                                            {words?.[indexRead]?.word}
                                        </h4>
                                        <hr/>
                                        <p className="mb-0">{words?.[indexRead]?.transcription}</p>
                                    </div>
                                    <div className="d-flex justify-content-center gap-2 notiflix-btn demo-inline-spacing">
                                        
                                        <button onClick={() => handleSpeech(words?.[indexRead]?.word)} className="btn btn-primary btn-card-block">Listen</button>
                                        {/* <button disabled={indexRead == 0} onClick={() => hanlderLearn(words?.[indexRead], true)} className="btn btn-primary btn-card-block-spinner">prev</button>
                                        <button disabled={(indexRead +1)  >= words?.length} onClick={() => hanlderLearn(words?.[indexRead], false)} className="btn btn-primary btn-card-block-spinner">Next</button> */}
                                    </div>
                                    {dataDetail?.options?.length &&
                                        <div className="demo-inline-spacing text-center">
                                            <div className="row">
                                                {dataDetail?.options.map((i) => (
                                                     <div className="col-md mb-md-0 mb-5">
                                                        <div className="form-check custom-option custom-option-icon checked">
                                                            <label className="form-check-label custom-option-content">
                                                                <span className="custom-option-body">
                                                                    <span className="custom-option-title">{i.meaning}</span>
                                                                </span>
                                                                <input value={i.index} onClick={()=>handlerChose(i.index)} className="form-check-input" type="radio" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button onClick={() => hanlderLearn(words?.[indexRead], false)} className="btn btn-primary btn-card-block-spinner">Chose</button>
                                        </div> 
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            )}
    </>;
}

Word.getLayout = function getLayout(page) {
    return <>
        <LayoutDefault>
            {page}
        </LayoutDefault>
    </>
}
export default Word