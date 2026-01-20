<template>
    <v-card class="d-flex flex-column profile-card" variant="outlined">
        <v-card-title class="d-flex align-center justify-space-between py-2 bg-surface-light">
            <span class="text-subtitle-2 font-weight-bold text-uppercase">
                <v-icon start size="default">{{ showCombate ? 'mdi-sword-cross' : 'mdi-account-details' }}</v-icon>
                {{ showCombate ? 'Status' : 'Perfil' }}
            </span>

            <v-btn size="default" variant="tonal" :color="showCombate ? 'error' : 'primary'"
                @click="showCombate = !showCombate">
                {{ showCombate ? 'Ver Perfil' : 'Ver Status' }}
                <v-icon end>{{ showCombate ? 'mdi-account-box' : 'mdi-heart-pulse' }}</v-icon>
            </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="overflow-y-auto">
            <v-window v-model="showCombate">

                <v-window-item :value="false">
                    <v-sheet border rounded class="pa-2">
                        <v-row dense>
                            <v-col cols="12" sm="4">
                                <v-img :src="character.imageUrl || 'https://via.placeholder.com/300'" aspect-ratio="4/5"
                                    max-height="150px" cover rounded class="elevation-1"></v-img>
                            </v-col>

                            <v-col cols="12" sm="8" class="d-flex flex-column">
                                <v-text-field v-model="character.name" prepend-inner-icon="mdi-account" label="Agente"
                                    variant="outlined" density="compact" hide-details></v-text-field>

                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>

                                <v-text-field :model-value="origemNome" prepend-inner-icon="mdi-book-open-variant"
                                    label="Origem" variant="outlined" density="compact" hide-details readonly
                                    class="cursor-pointer" @click="showOrigemModal = true"></v-text-field>

                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>

                                <v-row dense>
                                    <v-col cols="6">
                                        <v-text-field v-model="character.dataNascimento"
                                            prepend-inner-icon="mdi-calendar" label="Nascimento" variant="outlined"
                                            density="compact" hide-details readonly></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field :model-value="idadeCalculada"
                                            prepend-inner-icon="mdi-cake-variant" label="Idade" variant="outlined"
                                            density="compact" suffix="anos" hide-details readonly class="cursor-pointer"
                                            @click="showModalIdade = true"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-sheet>

                    <v-sheet border rounded class="pa-2 my-2">
                        <v-row dense>
                            <v-col cols="6">
                                <v-text-field :model-value="classeNome" label="Classe" variant="outlined"
                                    density="compact" prepend-inner-icon="mdi-shield-account" hide-details readonly
                                    class="cursor-pointer" @click="showClasseModal = true"></v-text-field>
                            </v-col>

                            <v-col cols="6">
                                <v-text-field :model-value="trilhaNome" label="Trilha" variant="outlined"
                                    density="compact" prepend-inner-icon="mdi-sign-direction" hide-details readonly
                                    :disabled="!character.classe" class="cursor-pointer"
                                    @click="showTrilhaModal = true"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-select v-model="character.patente" :items="opcoesPatentes" label="Patente"
                                    variant="outlined" density="compact" prepend-inner-icon="mdi-star-circle-outline"
                                    hide-details></v-select>
                            </v-col>
                            <v-col cols="6">
                                <v-select v-model="character.elemento" :items="opcoesElementos" label="Elemento"
                                    variant="outlined" density="compact" prepend-inner-icon="mdi-fire"
                                    hide-details></v-select>
                            </v-col>
                        </v-row>
                    </v-sheet>

                    <v-sheet border rounded class="pa-2 mt-2">
                        <v-textarea v-model="character.anotacoes" label="Anotações" variant="outlined" rows="4"
                            density="compact" hide-details></v-textarea>
                        <v-textarea v-model="character.favoritos" label="Favoritos" variant="outlined" rows="3"
                            density="compact" hide-details class="mt-2"></v-textarea>
                    </v-sheet>
                </v-window-item>
                <v-window-item :value="true">
                    <v-sheet border rounded class="pa-2">
                        <v-row dense>
                            <v-col cols="8"><v-text-field :model-value="character.name" label="Agente"
                                    variant="outlined" density="compact" hide-details readonly></v-text-field></v-col>
                            <v-col cols="2"><v-text-field v-model.number="character.level" label="Nível"
                                    variant="outlined" density="compact" type="number"
                                    hide-details></v-text-field></v-col>
                            <v-col cols="2"><v-text-field v-model.number="character.nex" label="NEX" variant="outlined"
                                    density="compact" type="number" suffix="%" hide-details></v-text-field></v-col>
                            <v-col cols="6"><v-text-field :model-value="classeTrilhaNome" label="Classe & Trilha"
                                    variant="outlined" density="compact" hide-details readonly></v-text-field></v-col>
                            <v-col cols="3"><v-text-field v-model.number="character.pe_turno" label="PE / Turno"
                                    variant="outlined" density="compact" type="number"
                                    hide-details></v-text-field></v-col>
                            <v-col cols="3"><v-text-field v-model="character.deslocamento" label="Deslocamento"
                                    variant="outlined" density="compact" type="text"
                                    hide-details></v-text-field></v-col>
                        </v-row>
                    </v-sheet>

                    <v-sheet border rounded class="pa-2 my-2">
                        <div>
                            <p class="text-center">Pontos de Vida (PV)</p>
                            <div class="progress-bar-container">
                                <v-progress-linear :model-value="(character.pv_atual / character.pv_max) * 100"
                                    color="red" height="25"></v-progress-linear>
                                <v-text-field v-model.number="character.pv_atual" class="progress-bar-input input-left"
                                    variant="plain" density="compact" hide-details type="number"></v-text-field>
                                <span class="progress-bar-slash">/</span>
                                <v-text-field :model-value="character.pv_max" class="progress-bar-input input-right"
                                    variant="plain" density="compact" hide-details type="number"
                                    readonly></v-text-field>
                            </div>
                        </div>
                        <div class="mt-4">
                            <p class="text-center">Pontos de Sanidade (PS)</p>
                            <div class="progress-bar-container">
                                <v-progress-linear :model-value="(character.ps_atual / character.ps_max) * 100"
                                    color="blue" height="25"></v-progress-linear>
                                <v-text-field v-model.number="character.ps_atual" class="progress-bar-input input-left"
                                    variant="plain" density="compact" hide-details type="number"></v-text-field>
                                <span class="progress-bar-slash">/</span>
                                <v-text-field :model-value="character.ps_max" class="progress-bar-input input-right"
                                    variant="plain" density="compact" hide-details type="number"
                                    readonly></v-text-field>
                            </div>
                        </div>
                        <div class="mt-4">
                            <p class="text-center">Pontos de Esforço (PE)</p>
                            <div class="progress-bar-container">
                                <v-progress-linear :model-value="(character.pe_atual / character.pe_max) * 100"
                                    color="orange" height="25"></v-progress-linear>
                                <v-text-field v-model.number="character.pe_atual" class="progress-bar-input input-left"
                                    variant="plain" density="compact" hide-details type="number"></v-text-field>
                                <span class="progress-bar-slash">/</span>
                                <v-text-field :model-value="character.pe_max" class="progress-bar-input input-right"
                                    variant="plain" density="compact" hide-details type="number"
                                    readonly></v-text-field>
                            </div>
                        </div>
                        <div v-if="(character.pp_max || 0) > 0" class="mt-4">
                            <p class="text-center">Pontos de Possessão (PP)</p>
                            <div class="progress-bar-container">
                                <v-progress-linear :model-value="(character.pp_atual / character.pp_max) * 100"
                                    color="purple" height="25"></v-progress-linear>
                                <v-text-field v-model.number="character.pp_atual" class="progress-bar-input input-left"
                                    variant="plain" density="compact" hide-details type="number"></v-text-field>
                                <span class="progress-bar-slash">/</span>
                                <v-text-field :model-value="character.pp_max" class="progress-bar-input input-right"
                                    variant="plain" density="compact" hide-details type="number"
                                    readonly></v-text-field>
                            </div>
                        </div>
                    </v-sheet>

                    <v-sheet border rounded class="pa-3 my-2 text-center">
                        <v-row dense justify="space-around" class="text-caption mb-n3">
                            <v-col>Base</v-col><v-col cols="auto" class="px-1"></v-col><v-col>AGI</v-col><v-col
                                cols="auto" class="px-1"></v-col><v-col>Proteção</v-col><v-col cols="auto"
                                class="px-1"></v-col><v-col>Outros</v-col><v-col cols="auto"
                                class="px-1"></v-col><v-col>Total</v-col>
                        </v-row>
                        <v-row dense align="center" justify="space-around">
                            <v-col>
                                <div class="text-h6 font-weight-bold">10</div>
                            </v-col>
                            <v-col cols="auto" class="px-1"><v-icon>mdi-plus</v-icon></v-col>
                            <v-col>
                                <div class="text-h6 font-weight-bold">{{ character.agilidade }}</div>
                            </v-col>
                            <v-col cols="auto" class="px-1"><v-icon>mdi-plus</v-icon></v-col>
                            <v-col><v-text-field v-model.number="character.defesa_protecao" variant="solo-inverted"
                                    density="compact" type="number" hide-details
                                    class="centered-input"></v-text-field></v-col>
                            <v-col cols="auto" class="px-1"><v-icon>mdi-plus</v-icon></v-col>
                            <v-col><v-text-field v-model.number="character.defesa_bonus" variant="solo-inverted"
                                    density="compact" type="number" hide-details
                                    class="centered-input"></v-text-field></v-col>
                            <v-col cols="auto" class="px-1"><v-icon>mdi-equal</v-icon></v-col>
                            <v-col>
                                <div class="text-h5 font-weight-bold">{{ defesaPassivaCalculada }}</div>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col cols="4">
                                <v-sheet color="surface" border rounded
                                    class="py-1 cursor-pointer hover-sheet d-flex flex-column align-center justify-center h-100"
                                    @click="showModalRD = true" v-ripple>
                                    <div class="text-caption text-uppercase font-weight-bold text-medium-emphasis">
                                        RD</div>
                                    <div class="d-flex align-center">
                                        <v-icon size="default" class="mr-1">mdi-shield-plus</v-icon>
                                        <span class="text-h6">
                                            {{ character.resistencias?.length || 0 }}
                                        </span>
                                    </div>
                                </v-sheet>
                            </v-col>

                            <v-col cols="4">
                                <v-sheet color="surface" border rounded class="py-1 h-100">
                                    <div class="text-caption text-uppercase font-weight-bold text-medium-emphasis">
                                        Esquiva</div>
                                    <div class="text-h6">{{ character.defesa_esquiva }}</div>
                                </v-sheet>
                            </v-col>

                            <v-col cols="4">
                                <v-sheet color="surface" border rounded class="py-1 h-100">
                                    <div class="text-caption text-uppercase font-weight-bold text-medium-emphasis">
                                        Bloqueio</div>
                                    <div class="text-h6">{{ character.defesa_bloqueio }}</div>
                                </v-sheet>
                            </v-col>
                        </v-row>
                    </v-sheet>

                </v-window-item>
            </v-window>
        </v-card-text>
        <ModalClasse v-model="showClasseModal" @select="setClasse" />

        <ModalOrigem v-model="showOrigemModal" @select="setOrigem" />

        <ModalTrilha v-model="showTrilhaModal" :classe-id="character.classe" :classe-nome="classeNome"
            @select="setTrilha" />

        <ModalIdade v-model="showModalIdade" :data-nascimento="character.dataNascimento"
            :idade-envelhecida="character.idadeEnvelhecida || 0" @save="salvarIdade" />

        <ModalRD v-model="showModalRD" :resistencias="character.resistencias || []"
            @adicionar="onAdicionarResistencia" @remover="onRemoverResistencia" />
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFichaOrdem } from '@/composables/ordem/useFicha'; // Ajuste o caminho se necessário
import type { ResistenciaManual } from '@/types/ordem/models';
import ModalClasse from './modals/escolhas/ModalClasse.vue';
import ModalOrigem from './modals/escolhas/ModalOrigem.vue';
import ModalTrilha from './modals/escolhas/ModalTrilha.vue';
import ModalRD from './modals/info/ModalRD.vue';
import ModalIdade from './modals/info/ModalIdade.vue';

const {
    character,
    classeTrilhaNome,
    defesaPassivaCalculada,
    origemNome,
    idadeCalculada,
    classeNome,
    trilhaNome,
    opcoesPatentes,
    opcoesElementos,
} = useFichaOrdem();

const showCombate = ref(false);
const showOrigemModal = ref(false); // Já tinha esse
const showClasseModal = ref(false); // Novo
const showTrilhaModal = ref(false); // Novo
const showModalIdade = ref(false);
const showModalRD = ref(false);

const setOrigem = (id: string) => {
    character.value.origem = id;
};

const setClasse = (id: string) => {
    character.value.classe = id;
    character.value.trilha = null; // Reseta trilha ao mudar classe
};

const setTrilha = (id: string) => {
    character.value.trilha = id;
};

const salvarIdade = (dados: { nascimento: string; envelhecido: number }) => {
    character.value.dataNascimento = dados.nascimento;
    character.value.idadeEnvelhecida = dados.envelhecido;
};

// --- Lógica de Resistências ---
const onAdicionarResistencia = (novaResistencia: ResistenciaManual) => {
    if (!character.value.resistencias) {
        character.value.resistencias = [];
    }
    character.value.resistencias.push(novaResistencia);
};

const onRemoverResistencia = (id: string) => {
    if (!character.value.resistencias) return;
    const idx = character.value.resistencias.findIndex(r => r.id === id);
    if (idx > -1) {
        character.value.resistencias.splice(idx, 1);
    }
};
</script>

<style scoped>
.profile-card {
    height: 85vh;
    max-height: 85vh;
}

/* Utilitário de cursor */
.cursor-pointer {
    cursor: pointer !important;
}

/* CSS GERAL DE COMPONENTES */
:deep(.v-label) {
    font-size: 12px;
    font-weight: 500;
}

:deep(.v-field__input) {
    font-size: 14px;
}

:deep(.v-list-item-title) {
    font-size: 14px !important;
}

:deep(.v-list-item-subtitle) {
    font-size: 12px !important;
}

/* PROGRESS BAR STYLES */
.progress-bar-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.progress-bar-slash {
    position: absolute;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    pointer-events: none;
}

:deep(.progress-bar-input .v-field__input) {
    background: transparent !important;
    color: white !important;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    font-size: 1.2rem;
    font-weight: bold;
    width: 80px;
    text-align: center;
    padding: 0 !important;
    min-height: 40px;
}

:deep(.progress-bar-input .v-field) {
    background: transparent !important;
    box-shadow: none !important;
    border: none !important;
}

.input-left {
    position: absolute;
    left: 10px;
}

:deep(.input-left .v-field__input) {
    text-align: right;
    padding-right: 15px !important;
}

.input-right {
    position: absolute;
    right: 10px;
}

:deep(.input-right .v-field__input) {
    text-align: left;
    padding-left: 15px !important;
}

/* DEFENSE INPUT STYLES */
:deep(.centered-input .v-field__input) {
    text-align: center;
    font-size: 1.1rem;
    font-weight: bold;
    padding: 0;
}

/* REMOVE SPINNERS FROM NUMBER INPUTS */
:deep(input[type='number']::-webkit-outer-spin-button),
:deep(input[type='number']::-webkit-inner-spin-button) {
    -webkit-appearance: none;
    margin: 0;
}
</style>