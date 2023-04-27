import './jungletoolpage.css'
import Map from './Map/Map'
import CampSelectionContextProvider from '../../../Contexts/CampSelectionContext'
import Title from '../../Title/Title'
import ExpDisplay from './ExpDisplay/ExpDisplay'
import SideBar from './SideBar/SideBar'
import SideBarContextProvider from '../../../Contexts/SideBarContext'
import ValuesDisplay from './ValuesDisplay/ValuesDisplay'
import Copied from './Copied/Copied'

/**
 * Defines the jungle tool page.
 * @returns {HTMLElement} - Returns a div containing the page.
 */
const JungleToolPage = () => {
	return ( 
		<div className="jungletoolpagecontainer">
			<div className="titleholder">
				<Title titleText='Jungle Gap'></Title>
			</div>
			<CampSelectionContextProvider>
				<div className="mapcontainer">
					<Map></Map>
				</div>
				<div className="expdisplaycontainer">
					<ExpDisplay></ExpDisplay>
				</div>
				<div className="champselectcontainer">
				</div>
			</CampSelectionContextProvider>
			<SideBarContextProvider>
				<div className="valuesdisplaycontainer">
					<ValuesDisplay />
				</div>
				<Copied></Copied>
				<SideBar />
			</SideBarContextProvider>
		</div>
	)
}
 
export default JungleToolPage