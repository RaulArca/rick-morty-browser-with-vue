import { searchModule } from '@/store/search.module'
import { charactersAndEpisodesModule } from '@/store/charactersAndEpisodes.module'
import { createStore } from 'vuex'

export const store = createStore({
    modules: {
        search: searchModule,
        charactersAndEpisodes: charactersAndEpisodesModule
    }
})