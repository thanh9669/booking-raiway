
import Head from 'next/head.js'

const Title = (props: {title: string, root: string}) => {
    return <>
        <Head> <title>{ props.title }</title> </Head>
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">{ props.root } /</span> { props.title }</h4>
    </>
}
Title.defaultProps = {
    root: '',
    title: ''
};
export default Title