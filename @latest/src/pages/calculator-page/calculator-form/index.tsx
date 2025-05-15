import {useForm} from 'react-hook-form'
import {CalculatorFormData} from './index'
import {api} from '../../../service/calculatorServices.ts'


export const CalculatorForm = () => {
  const {register, handleSubmit, watch, formState: {errors}} = useForm<CalculatorFormData>()

  const handleFormSubmit = (data: CalculatorFormData) => {
    console.log(data)

    api.post('/api/v1/calculadora_estatistica/Median/Calculate/NotGrouped', {
        li: [data.value]  
      })
      .then(response => {
        console.log('Resposta da API:', response.data);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  }

  return (
    <div>
        <h1>Insira seus dados para calcular</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col w-full'>
        <input type="text" defaultValue='laele' {...register('value')} className='border border-2 rounded-md p-2' />
        <button type='submit' className='bg-blue-500 rounded-md'>Enviar</button>
      </form>
    </div>
  )
  ;
};
