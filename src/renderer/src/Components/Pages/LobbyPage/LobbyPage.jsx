import { useContext } from 'react'
import './lobbypage.css'
import { LobbyContext } from '../../../Contexts/LobbyPageContext'
import ChampionSplash from './ChampionSplash/ChampionSplash'
import Map from '../JungleToolPage/Map/Map'
import RouteSearch from '../JungleToolPage/RouteSearch/RouteSearch'
import { CampSelectionContext } from '../../../Contexts/CampSelectionContext'
import ExpDisplay from '../JungleToolPage/ExpDisplay/ExpDisplay'
import SelectChamp from '../JungleToolPage/SelectChamp/SelectChamp'
import { SideBarContext } from '../../../Contexts/SideBarContext'
import ImportDisplay from '../JungleToolPage/ImportDisplay/ImportDisplay'

/**
 * Defines the lobby page
 * @returns {HTMLElement} - Returns the lobby page.
 */
const LobbyPage = () => {

	const {exportObject, routeName, routeGameData} = useContext(CampSelectionContext)
	const {championIds, teamArray, imgArray, gameStarting, 
	//	enemyTeam
	} = useContext(LobbyContext)
	const {importOnClick} = useContext(SideBarContext)

	// mock data for design
	const enemyTeam = [
		{
			championId: 1
		},
		{
			championId: 103
		},
		{
			championId: 13
		},
		{
			championId: 134
		},
		{
			championId: 44
		}
	]

	return ( 
		<div className="lobbypagecontainer">
			<div className="teamcomp">
				{teamArray.map((player, index) => (
					<ChampionSplash 
						key={player.cellId}
						champName={championIds[player?.championId]?.name}
						imgUrl={imgArray[index]?.championImage}
						summonerSpellOne={imgArray[index]?.spell1Id}
						summonerSpellTwo={imgArray[index]?.spell2Id}
					/>
				))}
			</div>
			<div className="statistics">
				<h1 className="gamestarting">{!gameStarting && 'Ingame!'}</h1>
				<div className="split">
					{routeGameData.vsChampion && enemyTeam && <div className="championSpec">
						{routeGameData?.vsChampion.filter((vsChampObj) => {
							for (let i = 0; i < enemyTeam.length; i++) {
								if (Object.keys(vsChampObj)[0] === enemyTeam[i].championId.toString()) {
									return vsChampObj
								}
							}
						}).map(vsChampObj => {
							const champKey = Object.keys(vsChampObj)[0]
							return (
								<div key={champKey}>
									<p>Champion name: {vsChampObj[champKey].name}</p>
									<p>Winrate: {vsChampObj[champKey].totalWr}</p>
								</div>
							)})
						}
					</div>
					}
				</div>
			</div>
			<div className="mapdiv">
				<Map padding='0rem' />
			</div>
			<div className="routeselector">
				<div className="overalldiv">
					<p className="totalwr">Winrate: {routeGameData.totalWr}</p>
					<br />
					<p className="totalGames">Games: {routeGameData.totalGames}</p>
					<br />
					<p className="totalWins">Wins {routeGameData.totalWins}</p>
					<p className="totalLosses">Losses {routeGameData.totalLosses}</p>
				</div>
				<RouteSearch inputStyle={{
					width: '55%',
					height: '15%',
					left: '0.5%',
					top: '92%'
				}}
				optionsStyle={{
					top: '83.5%',
					width: '100%'
				}}
				deleteAreaStyle={{
					top: '73%',
					left: '39.1%',
					width: '23%',
					backgroundColor: 'transparent'
				}}
				confirmDeletionStyle={{
					top: '148%',
					height: '117%',
					width: '100%',
					textAlign: 'center'
				}}
				createButtonStyle={{
					height: '15%',
					left: '57%',
					top: '92.1%'
				}}
				deleteButtonStyle={{
					position: 'fixed',
					top: '79%',
					left: '59.5%',
					padding: '0.5rem'
				}}
				/>
				{routeName && <button className="saveButton" onClick={async () => {
					if (routeName) {
						const data = await window.api.readRoutesFile()
						const matchingRoute = data.routes.find(route => route.name === routeName)
						matchingRoute.side = exportObject.side
						matchingRoute.route = exportObject.route
						matchingRoute.champions = exportObject.champions
						window.api.writeRoutesFile(data)
					} else {
						// Make something that appears
					}
				}}>
					SAVE
				</button>
				}
				<button className="importOpen" onClick={importOnClick}>Import</button>
				<ImportDisplay /> 
			</div>
			<div className="camporder">
				{<button className="test"style={{width: '50px', height: '50px', position: 'absolute', zIndex: '100000'}} onClick={() => console.log(enemyTeam)}></button> }
				<ExpDisplay 
					displayTable={false}
					undermapContainerStyle={{
						left: '0%',
						top: '0%',
						width: '100%',
						height: '19%',
						zIndex: '10000',
						backgroundColor: 'rgba(39, 39, 46)'
					}}
				/>

				<SelectChamp 
					searchBarContainerStyle={{
						height: '18%'
					}}
					champImagesStyle={{
						overflowY: 'hidden'
					}}
					optionsStyle={{
						maxHeight: '340%'
					}}
				/>
			</div>
		</div>
	)
}
 
export default LobbyPage