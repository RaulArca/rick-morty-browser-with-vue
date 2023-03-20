import { searchModule } from './search.module'
import { charactersAndEpisodesModule } from './charactersAndEpisodes.module'
import { createStore } from 'vuex'

export const store = createStore({
    modules: {
        search: searchModule,
        charactersAndEpisodes: charactersAndEpisodesModule
    }
})