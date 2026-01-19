export interface LocalArton {
  id: string;
  nome: string;
  tipo: 'Reino' | 'Cidade' | 'Perigo' | 'Capital';
  coords: [number, number]; // Coordenada Y, X no mapa
  descricao: string;
}

export const DB_ARTON: LocalArton[] = [
  {
    id: 'valkaria',
    nome: 'Valkaria',
    tipo: 'Capital',
    coords: [-165.1, 118.3], // Vamos ajustar isso depois visualmente
    descricao: 'A capital do Reinado e sede da grande estátua da Deusa da Ambição. O centro do mundo civilizado.'
  },
  {
    id: 'sternachten',
    nome: 'Sternachten',
    tipo: 'Reino',
    coords: [188, 1051],
    descricao: 'O exército com um país. Conhecidos por seu poderio militar e rigidez.'
  },
  {
    id: 'molok',
    nome: 'Molok',
    tipo: 'Reino',
    coords: [199, 1031],
    descricao: 'O reino dos cavalos. Vastos campos abertos e liberdade.'
  },
  {
    id: 'grimmere',
    nome: 'Grimmere',
    tipo: 'Perigo',
    coords: [212, 985],
    descricao: 'Uma região corrompida pela realidade alienígena lefeu. Perigo extremo.'
  }
];