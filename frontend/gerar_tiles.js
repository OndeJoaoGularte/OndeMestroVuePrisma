import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- GAMBIARRA PARA ES MODULES ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURAÇÕES ---
const NOME_IMAGEM = 'poster-mapa.jpg'; // Certifique-se que o nome está igual ao arquivo
const PASTA_SAIDA = path.join(__dirname, 'public', 'tiles');
const TILE_SIZE = 256;

async function gerarTiles() {
    if (!fs.existsSync(NOME_IMAGEM)) {
        console.error(`Erro: Imagem '${NOME_IMAGEM}' não encontrada.`);
        return;
    }

    console.log('Lendo imagem original...');
    const image = sharp(NOME_IMAGEM);
    const metadata = await image.metadata();
    const width = metadata.width;
    const height = metadata.height;

    // Descobre qual é o maior lado da imagem para criar um quadrado base
    const maxDim = Math.max(width, height);
    
    // Calcula quantos níveis de zoom precisamos (Potência de 2)
    const maxZoom = Math.ceil(Math.log2(maxDim / TILE_SIZE));

    console.log(`Dimensões originais: ${width}x${height}`);
    console.log(`Zoom Máximo Calculado: ${maxZoom}`);

    // Limpa a pasta de tiles antiga para não misturar
    if (fs.existsSync(PASTA_SAIDA)) {
        console.log('Limpando tiles antigos...');
        fs.rmSync(PASTA_SAIDA, { recursive: true, force: true });
    }
    fs.mkdirSync(PASTA_SAIDA, { recursive: true });

    for (let z = 0; z <= maxZoom; z++) {
        const numTiles = Math.pow(2, z);
        const totalSize = numTiles * TILE_SIZE;

        console.log(`Processando Zoom ${z}...`);

        const zoomDir = path.join(PASTA_SAIDA, `${z}`);
        fs.mkdirSync(zoomDir);

        // AQUI ESTÁ A CORREÇÃO MÁGICA:
        // fit: 'contain' -> Mantém a proporção, não estica.
        // background: alpha 0 -> O que sobrar fica transparente.
        const resizedBuffer = await image
            .clone()
            .resize({
                width: totalSize,
                height: totalSize,
                fit: 'contain', 
                background: { r: 0, g: 0, b: 0, alpha: 0 } 
            })
            .toBuffer();
        
        const resizedImage = sharp(resizedBuffer);

        for (let x = 0; x < numTiles; x++) {
            const xDir = path.join(zoomDir, `${x}`);
            if (!fs.existsSync(xDir)) fs.mkdirSync(xDir);

            for (let y = 0; y < numTiles; y++) {
                const outputName = path.join(xDir, `${y}.png`); // PNG para suportar transparência

                await resizedImage
                    .clone()
                    .extract({
                        left: x * TILE_SIZE,
                        top: y * TILE_SIZE,
                        width: TILE_SIZE,
                        height: TILE_SIZE
                    })
                    .toFile(outputName);
            }
        }
    }

    console.log('✅ Sucesso! Tiles gerados com proporção correta.');
}

gerarTiles().catch(err => console.error(err));