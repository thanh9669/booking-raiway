import React, { useEffect, useState, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import dynamic from "next/dynamic";
import PropTypes from 'prop-types'; // Import PropTypes
const ReactQuill = dynamic(import('react-quill'), { ssr: false })


type EditorProps = {
  label?: boolean;
  title?: string;
  name?: string | null;
  description?: string;
  validate?: any[];
  className?: string;
  placeholder?: string | null;
  value?: string;
  errorMessage?: string | null;
  submit?: boolean;
  loading?: boolean;
  handleInputChange: (data: { name: string | null, value: string }) => void;
}

const Editor: React.FC<EditorProps> = (props) => {
  const [editorHtml, setEditorHtml] = useState(props.value || '');
  const [error, setError] = useState(props.errorMessage)
  // const [st, setSt] = useState()
    
  // const [title] = useState(props.title)
  // lắng nghe props mesage có lỗi gì không
  useEffect(() => {
      setError(props.errorMessage)
  }, [props.errorMessage])
  useEffect(() => {
    if (props.loading) {
      setEditorHtml(props.value || '');
    }
  }, [props.loading]);

  const handleChange = (html: any) => {
    setEditorHtml(html)
    props.handleInputChange({ name: props.name || '', value: html });
  };


  const modules = useMemo(() => ({
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']                                         // remove formatting button
      ],
    },
    clipboard: {
      matchVisual: false
    }
  }), []);

  const formats = [
    'font','size',
    'bold','italic','underline','strike',
    'color','background',
    'script',
    'header','blockquote','code-block',
    'indent','list',
    'direction','align',
    'link','image','video','formula',
  ]

  return (
    <div>
      <ReactQuill
        theme='snow'
        value={editorHtml}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
      { error != "" && <div className="error-message">{error}</div> }
    </div>
  );
};
Editor.propTypes = {
  label: PropTypes.any,
  title: PropTypes.string,
  name: PropTypes.string,
  errorMessage: PropTypes.string,
  value: PropTypes.string,
  loading: PropTypes.bool, // Add loading prop type
  handleInputChange: PropTypes.func.isRequired,
};
Editor.propTypes = {
  // icon: PropTypes.string,
  // iconHide: PropTypes.string,
  // type: PropTypes.string,
  // typeHide: PropTypes.string,
  // value: PropTypes.string,
  // errorMessage: PropTypes.string,
  // title: PropTypes.string,
  // label: PropTypes.any,
  // className: PropTypes.string,
  // name: PropTypes.string,
  // placeholder: PropTypes.string,
  // description: PropTypes.string,
  // validate: PropTypes.arrayOf(PropTypes.any),
  // submit: PropTypes.bool,
  // handleInputChange: PropTypes.func.isRequired,
  // handleError: PropTypes.func,
};
Editor.defaultProps = {
  label: false,
  title: '',
  name: null,
  description: 'Default Description',
  validate: [],
  className: '',
  placeholder: null,
  value: '',
  errorMessage: null,
  submit: false,
  loading: false
}

export default Editor;
