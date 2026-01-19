import type { Habilidade } from '@/types/ordem/models';

export const DB_PODERES_PARANORMAIS: Habilidade[] = [
  // --- SANGUE ---
  { id: 'pod_adrenalina', nome: 'Adrenalina', origem: 'Poder Paranormal', descricao: 'Você recebe +5 em testes de Acrobacia e Atletismo e +1 em deslocamento.', elemento: 'Sangue' },
  { id: 'pod_armadura_sangue', nome: 'Armadura de Sangue', origem: 'Poder Paranormal', descricao: 'Você recebe +5 na Defesa, mas -2 em Furtividade.', elemento: 'Sangue' },
  
  // --- MORTE ---
  { id: 'pod_potencial_aproveitado', nome: 'Potencial Aproveitado', origem: 'Poder Paranormal', descricao: 'Ao subir de nível, você ganha +1 PE no total.', elemento: 'Morte' },
  { id: 'pod_sentido_mortal', nome: 'Sentido Mortal', origem: 'Poder Paranormal', descricao: 'Você não pode ser surpreendido.', elemento: 'Morte' },

  // --- CONHECIMENTO ---
  { id: 'pod_aprender_ritual', nome: 'Aprender Ritual', origem: 'Poder Paranormal', descricao: 'Você aprende um ritual de 1º círculo.', elemento: 'Conhecimento' },
  
  // --- ENERGIA ---
  { id: 'pod_afortunado', nome: 'Afortunado', origem: 'Poder Paranormal', descricao: 'Uma vez por rodada, você pode rerrolar um teste falho.', elemento: 'Energia' },
];