import './jungletoolpage.css'
import Map from './Map/Map'
import CampSelectionContextProvider from '../../../Contexts/CampSelectionContext'
import Title from '../../Title/Title'
import ExpDisplay from './ExpDisplay/ExpDisplay'
import SideBar from './SideBar/SideBar'
import SideBarContextProvider from '../../../Contexts/SideBarContext'
import ValuesDisplay from './ValuesDisplay/ValuesDisplay'
import Copied from './Copied/Copied'
import SelectChamp from './SelectChamp/SelectChamp'
import RouteSearch from './RouteSearch/RouteSearch'

/**
 * Defines the jungle tool page.
 * @returns {HTMLElement} - Returns a div containing the page.
 */
const JungleToolPage = () => {
	return ( 
		<div className="jungletoolpagecontainer">
			<div className="titleholder">
				<Title titleText='Jungle Gap' color='white'></Title>
			</div>
			<CampSelectionContextProvider>
				<div className="mapcontainer">
					<Map></Map>
				</div>
				<div className="expdisplaycontainer">
					<ExpDisplay></ExpDisplay>
				</div>
				<div className="champselectcontainer">
					<SelectChamp></SelectChamp>
				</div>
			</CampSelectionContextProvider>
			<SideBarContextProvider>
				<div className="valuesdisplaycontainer">
					<ValuesDisplay />
				</div>
				<Copied></Copied>
				<SideBar />
			</SideBarContextProvider>
			<div className="routesearchcontainer">
				<RouteSearch />
			</div>
		</div>
	)
}
 
export default JungleToolPage