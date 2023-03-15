export const  searchModule={
    namespaced: true,
    state:{
        searchByEpisode: false,
        query:"",
        filtersSelected: {status:"",gender:"",whatToSearch:"name"},
        whatToSearch: [
            {name: "name", text: "Name"},
            {name: "species", text: "Species"},
            {name: "type", text: "Sub-species"},
            {name: "episodes", text: "Episode name"}
        ],
        status: [
            {name: "notStatus", text: "---"},
            {name: "unknownStatus", text: "Unknown"},
            {name: "Alive", text: "Alive"},
            {name: "Dead", text: "Dead"}
        ],

        gender: [
            {name: "notGender", text: "---"},
            {name: "Female", text: "Female"},
            {name: "Male", text: "Male"},
            {name: "Genderless", text: "Genderless"},
            {name: "unknown", text: "Unknown"}],
        nexturlCharacters: "",
        nexturlEpisodes: "",
    },
    actions:{

    },
    mutations: {
        setNextCharacters(state, url){
            state.nexturlCharacters = url
        },
        setNextEpisodes(state, url){
            state.nexturlEpisodes= url
        },
        setSearchByEpisode(state, value){
            state.searchByEpisode=value
        },
        setSelectedFiltersWhatToWatch(state, value){
            if(value=="episodes")
                state.searchByEpisode=true;
            else
                state.searchByEpisode=false;
            state.filtersSelected.whatToSearch=value;
        },
        setQuery(state, query){
            state.query=query;
        },
        setSelectedFilters(state, value) {
            switch (value) {
                case "Alive":
                    state.filtersSelected.status = value;
                    break;
                case "Dead" :
                    state.filtersSelected.status = value;
                    break;
                case "unknownStatus":
                    state.filtersSelected.status = "unknown";
                    break;
                case "notStatus":
                    state.filtersSelected.status = "";
                    break;
                case "Female":
                    state.filtersSelected.gender = value;
                    break;
                case "Male":
                    state.filtersSelected.gender = value;
                    break;
                case "Genderless":
                    state.filtersSelected.gender = value;
                    break;
                case "unknown":
                    state.filtersSelected.gender = values;
                    break;
                case "notGender":
                    state.filtersSelected.gender = "";
                    break
            }
        }

    },
    getters:{
        getFiltersSelected(state){
            return state.filtersSelected;
        },
        getQuery(state){
            return state.query;
        },
        getNextCharacters(state){
            return state.nexturlCharacters;
        },
        getNextEpisodes(state){
            return state.nexturlEpisodes;
        },
        getSearchByEpisode(state){
            return state.searchByEpisode
        },
        getWhatToSearch(state){
            return state.whatToSearch;
        },
        getStatus(state){
            return state.status;
        },
        getGender(state){
            return state.gender;
        }
        
    }
}