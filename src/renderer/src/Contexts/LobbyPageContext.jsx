import { createContext, useState, useEffect } from 'react'
import { championIds, summonerIds } from '../Data/Objects'

export const LobbyContext = createContext()

/**
 *
 * @param root0
 * @param root0.children
 */
const LobbyContextProvider = ({children}) => {
    
	const positionsOrder = ['top', 'jungle', 'middle', 'bottom', 'utility']

	const [teamArray, setTeamArray] = useState([])
	const [imgArray, setImgArray] = useState([])
	window.LCUApi.lobbyInfo((_event, value) => {
		value.myTeam.sort((a, b) => positionsOrder.indexOf(a.assignedPosition) - positionsOrder.indexOf(b.assignedPosition))
		const combinedTeamArray = [...value.theirTeam, ...value.myTeam]
		console.log('Summoner Spell One: ' + combinedTeamArray[0].spell1Id)
		console.log('Summoner spell Two: ' + combinedTeamArray[0].spell2Id)
		if(combinedTeamArray.length > 0) {
			setTeamArray(combinedTeamArray)
		}
	})

	useEffect(() => {
		/**
		 * Resolves all the images
		 */
		const resolveImages = async () => {
			const copiedArray = Array.from(teamArray)
			for (let i = 0; i < teamArray.length; i++) {
				const imgUrl = await championIds[teamArray[i]?.championId]?.image
				copiedArray[i].championImage = imgUrl
				const summonerOneUrl = await summonerIds[teamArray[i]?.spell1Id]?.image
				copiedArray[i].spell1Id = summonerOneUrl
				const summonerTwoUrl = await summonerIds[teamArray[i]?.spell2Id]?.image
				copiedArray[i].spell2Id = summonerTwoUrl
				setImgArray(copiedArray)
			}
		}
		resolveImages()
	},[teamArray])

	return <LobbyContext.Provider
		value={{
			championIds: championIds,
			teamArray: teamArray,
			imgArray: imgArray
		}}
	>
		{children}
	</LobbyContext.Provider>
}


export default LobbyContextProvider