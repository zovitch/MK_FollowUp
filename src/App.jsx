import { Admin, Resource } from 'react-admin'
import { createClient } from '@supabase/supabase-js'
import { supabaseDataProvider } from 'ra-supabase'

import { MkFileList } from './components/MkFile/MkFileList'
import { MkFileEdit } from './components/MkFile/MkFileEdit'
import { MkFileShow } from './components/MkFile/MkFileShow'
import { MkFileCreate } from './components/MkFile/MkFileCreate'

import { StencilList } from './components/Stencil/StencilList'
import { StencilEdit } from './components/Stencil/StencilEdit'
import { StencilShow } from './components/Stencil/StencilShow'
import { StencilCreate } from './components/Stencil/StencilCreate'

import { Library_itemList } from './components/LibraryItem/Library_itemList'
import { Library_itemEdit } from './components/LibraryItem/Library_itemEdit'
import { Library_itemShow } from './components/LibraryItem/Library_itemShow'
import { Library_itemCreate } from './components/LibraryItem/Library_itemCreate'

import TurnedInIcon from '@mui/icons-material/TurnedIn'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'

// supabase parameters
const instanceUrl = import.meta.env.VITE_SUPABASE_URL
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseClient = createClient(instanceUrl, apiKey)
const dataProvider = supabaseDataProvider({
  instanceUrl,
  apiKey,
  supabaseClient,
})
// const authProvider = supabaseAuthProvider(supabaseClient, {})

const App = () => (
  <Admin
    dataProvider={dataProvider}
    // theme={houseLightTheme}
    // darkTheme={houseDarkTheme}
  >
    <Resource
      name='mk_files'
      list={MkFileList}
      edit={MkFileEdit}
      show={MkFileShow}
      create={MkFileCreate}
      recordRepresentation='mkFilename'
      icon={FolderOpenIcon}
    />

    <Resource
      name='stencils'
      list={StencilList}
      edit={StencilEdit}
      show={StencilShow}
      create={StencilCreate}
      recordRepresentation='stencilNumber'
      icon={FullscreenIcon}
    />

    <Resource
      name='library_items'
      list={Library_itemList}
      edit={Library_itemEdit}
      show={Library_itemShow}
      create={Library_itemCreate}
      recordRepresentation='lItem'
      icon={TurnedInIcon}
    />
  </Admin>
)

export default App
