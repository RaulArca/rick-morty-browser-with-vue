
import {Dispatch, Commit, Module} from "vuex";
import {Store} from 'vuex'
import {StateCharacters} from "@vue/runtime-core";

declare module '@vue/runtime-core' {
    interface StateCharacters {
        characters: [],
        episodes: [],
    }

}

export const charactersAndEpisodesModule: Module<StateCharacters, any> = {

    namespaced: true,
    state: {
        characters: [],
        episodes: [],
    },

    actions: {
        async search({commit, rootGetters}) {
            let url = 'https://rickandmortyapi.com/api/character/';
            let urlEpisodes = "https://rickandmortyapi.com/api/episode";
            try {
                if (rootGetters['search/getFiltersSelected'].whatToSearch == "episodes") {
                    fetch(urlEpisodes + "?name=" + rootGetters['search/getQuery']).then(response => response.json())
                        .then(data => {
                            commit('search/setNextEpisodes', data.info.next, {root: true});
                            commit('setEpisodes', data.results);
                        });
                } else
                    fetch(url + '?' + rootGetters['search/getFiltersSelected'].whatToSearch + '=' + rootGetters['search/getQuery'] + (rootGetters['search/getFiltersSelected'].status ? '&status=' + rootGetters['search/getFiltersSelected'].status : '') +
                        (rootGetters['search/getFiltersSelected'].gender ? '&gender=' + rootGetters['search/getFiltersSelected'].gender : '')).then(response => response.json())
                        .then(data => {
                            commit('search/setNextCharacters', data.info.next, {root: true});
                            commit('setCharacters', data.results);
                        });
            } catch (error) {
                commit('setCharacters', []);
                commit('setEpisodes', []);
            }
        },
        async next({commit, rootGetters}) {
            try {
                if (rootGetters['search/getFiltersSelected'].whatToSearch == "episodes") {
                    fetch(rootGetters['search/getNextEpisodes']).then(response => response.json())
                        .then(data => {

                            commit('search/setNextEpisodes', data.info.next, {root: true});
                            let aux = rootGetters['charactersAndEpisodes/getEpisodesgetEpisodes'];
                            aux.push(...data.results);

                            commit('setEpisodes', aux);
                        });
                } else
                    fetch(rootGetters['search/getNextCharacters']).then(response => response.json())
                        .then(data => {
                            commit('search/setNextCharacters', data.info.next, {root: true});
                            let aux = rootGetters['charactersAndEpisodes/getCharacters'];
                            aux.push(...data.results);
                            commit('setCharacters', aux);
                        });
            } catch (error) {
                console.log(error);
            }
        }
    },
    mutations: {
        setCharacters(state, characters:[]) {
            state.characters = characters;
        },
        setEpisodes(state, episodes:[]) {
            state.episodes = episodes;
        },

    },
    getters: {

        getCharacters(state) {
            return state.characters;
        },
        getEpisodes(state) {
            return state.episodes;
        },

    }
}