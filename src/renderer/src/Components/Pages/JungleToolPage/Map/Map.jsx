import './map.css'
import map from './images/map11.png'
import JungleCamp from '../JungleCamp/JungleCamp'
import {CampSelectionContext} from '../../../../Contexts/CampSelectionContext'
import ResetButton from '../ResetButton/ResetButton'
import { camps } from '../../../../Data/Arrays'

/**
 * Defines a map element containing the jungle camps.
 * @param {string} padding - The amount of padding on mapwrap.
 * @returns {HTMLElement} Returns a map element.
 */
const Map = ({padding}) => {
	return (
		<CampSelectionContext.Consumer>
			{() => (
				<div className="mapwrap" style={{ padding: padding ? padding : '0.5rem'}}>
					<ResetButton />
					<img src={map} alt="gamemap" className="mapholder" />
					{camps.map((camp) => (
						<JungleCamp
							key={camp.position}
							theCamp={camp.position}
							goldValue={camp.goldValue}
							expValue={camp.expValue}
							image={camp.image}
						/>
					))}
				</div>
			)}
		</CampSelectionContext.Consumer>
	)
}
 
export default Map