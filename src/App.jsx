/**
 * Main application component for MK FollowUp.
 * This component sets up the React Admin interface with all necessary resources.
 *
 * @module App
 */

import { Admin, Resource } from 'react-admin'
import { dataProvider } from './dataProvider'

// Import MK File components
import { MkFileList } from './components/MkFile/MkFileList'
import { MkFileEdit } from './components/MkFile/MkFileEdit'
import { MkFileShow } from './components/MkFile/MkFileShow'
import { MkFileCreate } from './components/MkFile/MkFileCreate'

// Import Stencil components
import { StencilList } from './components/Stencil/StencilList'
import { StencilEdit } from './components/Stencil/StencilEdit'
import { StencilShow } from './components/Stencil/StencilShow'
import { StencilCreate } from './components/Stencil/StencilCreate'

// Import Library Item components
import { Library_itemList } from './components/LibraryItem/Library_itemList'
import { Library_itemEdit } from './components/LibraryItem/Library_itemEdit'
import { Library_itemShow } from './components/LibraryItem/Library_itemShow'
import { Library_itemCreate } from './components/LibraryItem/Library_itemCreate'

// Import icons
import TurnedInIcon from '@mui/icons-material/TurnedIn'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'

/**
 * Main App component that configures the React Admin interface.
 * Sets up three main resources: MK Files, Stencils, and Library Items.
 * Each resource has its own list, edit, show, and create views.
 *
 * @returns {JSX.Element} The configured React Admin interface
 */
const App = () => (
  <Admin
    dataProvider={dataProvider}
    // theme={houseLightTheme}
    // darkTheme={houseDarkTheme}
  >
    {/* MK Files Resource */}
    <Resource
      name='mk_files'
      list={MkFileList}
      edit={MkFileEdit}
      show={MkFileShow}
      create={MkFileCreate}
      recordRepresentation='mkFilename'
      icon={FolderOpenIcon}
    />

    {/* Stencils Resource */}
    <Resource
      name='stencils'
      list={StencilList}
      edit={StencilEdit}
      show={StencilShow}
      create={StencilCreate}
      recordRepresentation='stencilNumber'
      icon={FullscreenIcon}
    />

    {/* Library Items Resource */}
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
