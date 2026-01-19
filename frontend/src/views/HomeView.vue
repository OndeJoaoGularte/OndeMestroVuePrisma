<template>
    <v-main class="bg-background">

        <v-container fluid class="pb-0 pt-0 px-0">
            <v-container style="max-width: 1200px;">

                <div class="text-center mb-8 animate-fade-in">
                    <p class="text-h5 font-weight-black text-high-emphasis mb-2">
                        Você já se perguntou:
                    </p>
                    <v-img :src="logoHome" height="180" class="mb-0 mx-auto" contain></v-img>

                    <p class="text-h6 text-medium-emphasis font-weight-regular mx-auto" style="max-width: 700px;">
                        Conheça o hub para organizar tudo sobre seu RPG favorito! Gerencie fichas, mapas e campanhas de
                        diversos sistemas em um único lugar!
                    </p>
                </div>

                <v-row justify="center" align="stretch" class="mb-16">
                    <v-col v-for="sistema in sistemas" :key="sistema.rota" cols="12" md="6" lg="3">
                        <v-card
                            class="system-card h-100 d-flex flex-column rounded-xl position-relative overflow-visible"
                            elevation="0" :class="{ 'card-disabled': sistema.emBreve }" @click="navegar(sistema)"
                            v-ripple="!sistema.emBreve">
                            <div class="glow-effect" :style="`background-color: ${sistema.hexColor}`"></div>

                            <div
                                class="pa-6 d-flex flex-column h-100 bg-surface rounded-xl content-wrapper border-thin">
                                <div class="icon-box mb-6 align-self-center"
                                    :style="`background-color: ${sistema.hexColor}20`">
                                    <v-icon size="40" :color="sistema.hexColor">{{ sistema.icone }}</v-icon>
                                </div>

                                <div class="text-center mb-2">
                                    <h3 class="text-h5 font-weight-bold text-high-emphasis">{{ sistema.titulo }}</h3>
                                </div>

                                <div class="text-center mb-6 flex-grow-1">
                                    <p class="text-body-2 text-medium-emphasis">{{ sistema.descricaoCurta }}</p>
                                </div>

                                <div class="text-center mt-auto">
                                    <v-chip v-if="sistema.emBreve" variant="outlined" size="small"
                                        class="text-disabled">
                                        Em Breve
                                    </v-chip>
                                    <v-btn v-else variant="flat" block :color="sistema.hexColor"
                                        class="text-white font-weight-bold" rounded="lg">
                                        Acessar
                                    </v-btn>
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>

            </v-container>
        </v-container>

        <v-sheet color="surface-variant" class="py-16">
            <v-container style="max-width: 1000px;">
                <v-row align="center">
                    <v-col cols="12" md="6">
                        <h2 class="text-h4 font-weight-bold mb-4 text-primary">
                            Por que usar o OndeMestro?
                        </h2>
                        <p class="text-body-1 mb-4 text-medium-emphasis text-justify">
                            Chega de planilhas perdidas, PDFs desatualizados e anotações em papel.
                            O <strong>OndeMestroRPG</strong> nasceu da necessidade de unificar a experiência
                            de mestrar e jogar RPGs modernos.
                        </p>
                        <v-list bg-color="transparent">
                            <v-list-item prepend-icon="mdi-check-circle" title="Fichas Automatizadas"
                                class="text-primary"></v-list-item>
                            <v-list-item prepend-icon="mdi-check-circle" title="Mapas Interativos (VTT)"
                                class="text-primary"></v-list-item>
                            <v-list-item prepend-icon="mdi-check-circle" title="Gestão de Campanhas"
                                class="text-primary"></v-list-item>
                        </v-list>
                    </v-col>
                    <v-col cols="12" md="6" class="text-center">
                        <v-icon size="200" color="primary" style="opacity: 0.2;">mdi-monitor-dashboard</v-icon>
                    </v-col>
                </v-row>
            </v-container>
        </v-sheet>

        <v-container class="py-16" style="max-width: 1100px;">
            <div class="text-center mb-16">
                <h2 class="text-h4 font-weight-bold">Sistemas Suportados</h2>
                <v-divider class="mx-auto mt-4" length="100" thickness="3" color="primary"></v-divider>
            </div>

            <div v-for="(sistema, index) in sistemas" :key="sistema.titulo">
                <v-row class="mb-16 align-center" :class="{ 'flex-row-reverse': index % 2 !== 0 }">
                    <v-col cols="12" md="5" class="text-center">
                        <v-sheet :color="sistema.hexColor"
                            class="rounded-xl d-flex align-center justify-center elevation-10 mx-auto" height="250"
                            width="250" style="position: relative; overflow: hidden;">
                            <v-icon size="300" color="white" style="opacity: 0.2; position: absolute;">{{ sistema.icone
                                }}</v-icon>
                            <v-icon size="100" color="white" style="z-index: 2;">{{ sistema.icone }}</v-icon>
                        </v-sheet>
                    </v-col>

                    <v-col cols="12" md="7">
                        <div :class="index % 2 !== 0 ? 'text-right' : 'text-left'">
                            <v-chip :color="sistema.hexColor" variant="tonal" class="mb-4 font-weight-bold">
                                {{ sistema.emBreve ? 'Em Desenvolvimento' : 'Disponível Agora' }}
                            </v-chip>

                            <h3 class="text-h3 font-weight-black mb-4" :style="`color: ${sistema.hexColor}`">
                                {{ sistema.titulo }}
                            </h3>

                            <p class="text-h6 text-medium-emphasis font-weight-regular mb-6">
                                {{ sistema.descricaoLonga }}
                            </p>

                            <v-btn v-if="!sistema.emBreve" variant="text" size="x-large" :color="sistema.hexColor"
                                :to="sistema.rota" class="px-0 font-weight-bold hover-arrow">
                                Jogar {{ sistema.titulo }}
                                <v-icon end icon="mdi-arrow-right" class="ml-2 arrow-icon"></v-icon>
                            </v-btn>

                            <v-btn v-else disabled variant="text" size="large" class="px-0">
                                Aguarde novidades...
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>

                <v-divider v-if="index < sistemas.length - 1" class="mb-16 border-opacity-25"></v-divider>
            </div>

        </v-container>

        <v-footer class="bg-black text-center d-flex flex-column py-6">
            <div class="text-body-2 text-medium-emphasis mb-2">
                OndeMestroRPG © 2024
            </div>
            <div class="text-caption text-disabled">
                Este é um projeto de fã. Ordem Paranormal e Tormenta20 são marcas registradas de seus respectivos
                criadores.
            </div>
        </v-footer>

    </v-main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// Importe a imagem aqui
import logoHome from '@/assets/ondemestrologo.png';

const router = useRouter();

interface SistemaItem {
    titulo: string;
    rota: string;
    icone: string;
    hexColor: string;
    descricaoCurta: string;
    descricaoLonga: string;
    emBreve: boolean;
}

const sistemas = ref<SistemaItem[]>([
    {
        titulo: 'Assimilação',
        rota: '/assimilacao',
        icone: 'mdi-biohazard',
        hexColor: '#00ACC1',
        descricaoCurta: 'Torne-se um Assimilado.',
        descricaoLonga: 'Em um futuro distópico onde a carne se funde ao metal, sobreviva à opressão corporativa e às aberrações tecnológicas. Quanto de sua humanidade você está disposto a sacrificar?',
        emBreve: true
    },
    {
        titulo: 'Ordem Paranormal',
        rota: '/ordem',
        icone: 'mdi-ghost',
        hexColor: '#9C27B0',
        descricaoCurta: 'Combata o Outro Lado.',
        descricaoLonga: 'Junte-se à Ordo Realitas. Crie seus agentes, gerencie sua sanidade e enfrente as entidades de Sangue, Morte, Energia e Conhecimento antes que a membrana se rompa.',
        emBreve: false
    },
    {
        titulo: 'Sacramento',
        rota: '/sacramento',
        icone: 'mdi-church',
        hexColor: '#FFB300',
        descricaoCurta: 'Explore o Velho Oeste.',
        descricaoLonga: 'A fé pode ser a sua salvação ou a sua perdição. Um sistema focado em penitência, milagres corrompidos e o terror que se esconde nos altares.',
        emBreve: true
    },
    {
        titulo: 'Tormenta 20',
        rota: '/tormenta20',
        icone: 'mdi-sword-cross',
        hexColor: '#E53935',
        descricaoCurta: 'Enfrente a Tormenta.',
        descricaoLonga: 'Explore Arton, o mundo de problemas. Enfrente a Tormenta, crie heróis lendários com dezenas de raças e classes e visualize o mapa completo do reinado.',
        emBreve: false
    }
]);

const navegar = (sistema: SistemaItem) => {
    if (!sistema.emBreve) {
        router.push(sistema.rota);
    }
};
</script>

<style scoped>
/* Animação de entrada */
.animate-fade-in {
    animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Cards */
.system-card {
    transition: transform 0.3s ease;
    cursor: pointer;
}

.system-card:hover {
    transform: translateY(-10px);
}

.glow-effect {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 0;
    border-radius: 24px;
    filter: blur(25px);
    opacity: 0;
    transition: opacity 0.3s;
}

.system-card:hover .glow-effect {
    opacity: 0.3;
}

/* Ícone do Card */
.icon-box {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Link com seta animada */
.hover-arrow:hover .arrow-icon {
    transform: translateX(5px);
}

.arrow-icon {
    transition: transform 0.2s ease;
}

/* Responsividade */
.card-disabled {
    opacity: 0.7;
    cursor: default;
}

.card-disabled:hover {
    transform: none;
}
</style>