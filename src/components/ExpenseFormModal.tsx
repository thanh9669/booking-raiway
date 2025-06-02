import { useState, useEffect } from 'react';
import { EXPENSE } from '@/types/expense';
import { DEFAULT_EXPENSE } from '@/consts/expense';
import ModulesApi from '@/api/moduleApi'
import TableLoading from './tables/table-loading';
import { ENUMS } from '@/enums';
import toast from '@/helpers/toast'
import CustomInput from './form/custom-input';
import CustomSelect from './form/custom-select';
import CustomTextArea from './form/custom-textarea';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';



export default function ExpenseFormModal({
  isOpen,
  onClose,
  onChange,
  defaultData,
  onLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onChange?: () => void;
  onLoading?: (isLoading: boolean) => void;
  defaultData?: EXPENSE;
}) {
  const [loading, setLoading] = useState(false)
  const { expenseApi } = ModulesApi()
  const [formData, setFormData] = useState<EXPENSE>(DEFAULT_EXPENSE);

  const [isVisible, setIsVisible] = useState(false);
  const categories = useSelector((state: RootState) => state.expense.categories)
  const [errorMessage, setErrorMessage] = useState<EXPENSE>()

  useEffect(() => {
    setLoading(true)
    if (isOpen) {
      setFormData(defaultData || DEFAULT_EXPENSE)
      setErrorMessage(null)
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      document.body.style.overflow = 'auto'
      return () => clearTimeout(timer)
    }
    setLoading(false)
  }, [isOpen]);
  const handleChange = (event) => {
    let { name, value } = event.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
    console.log(name, value)
}
const handleError = (name, errors) => {
  setErrorMessage({
  ...errorMessage,
  [name]: errors
  })
}
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    onLoading?.(true)
    const data = {
      amount: parseInt(formData.amount.toString()),
      category_id: parseInt(formData.category_id.toString()),
      note: formData.note,
      description: formData.description
    }
    const result = defaultData ? expenseApi.patch(defaultData.id, data) : expenseApi.post(data)
    result
      .then((response) => {
        if (response?.status === ENUMS.SUCCESS) {
          onClose();
          onChange?.()
        } else {
          setErrorMessage(response?.data?.errors)
          toast.error(response?.data?.message)
        }
      })
      .catch(error => {
        console.error('Error saving expense:', error);
        // Optionally show error message to user
      });
    setLoading(false)
    onLoading?.(true)

  };

  if (!isVisible) return null;

  return (
    <>
      <div className={`modal fade ${isOpen ? 'show active' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Thêm chi tiêu mới</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                  <div className="mb-4">
                    <CustomSelect 
                        name="category_id" 
                        title="Danh mục"
                        label="Danh mục"
                        validate={['required']}
                        options={categories.map(c => ({...c, id: c.id.toString()}))}
                        value={formData?.category_id?.toString()} 
                        handleError={handleError}
                        errorMessage={errorMessage?.category_id?.toString()}
                        handleInputChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <CustomInput 
                      name="amount" 
                      type="amount" 
                      title="Số tiền (VND)"
                      label="Số tiền (VND)"
                      validate={['required', 'number']}
                      placeholder="Số tiền (VND)"
                      value={formData?.amount?.toString()}
                      errorMessage={ errorMessage?.amount?.toString() }
                      handleInputChange={handleChange}
                      handleError={handleError}
                    />
                  </div>

                  <div className="mb-4">
                    <CustomTextArea 
                      name="note" 
                      label="Ghi chú"
                      validate={['required']}
                      value={formData.note} 
                      handleInputChange={handleChange}
                      errorMessage={ errorMessage?.note }
                      handleError={handleError}
                    />
                  </div>
              </div>
            
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary" form="form" onClick={handleSubmit}>
                  Lưu chi tiêu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
