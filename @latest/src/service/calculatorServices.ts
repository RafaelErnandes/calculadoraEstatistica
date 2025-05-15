import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7180",
});


api.post('/api/v1/calculadora_estatistica/Median/Calculate/NotGrouped', {
  li: '' 
})
  .then(response => {
    console.log('Resposta da API:', response.data);
  })
  .catch(error => {
    console.error('Erro na requisição:', error); 
  });
