/* eslint-disable no-undef */
import { browser } from 'wdio-electron-service'
import { setupBrowser } from '@testing-library/webdriverio'
// eslint-disable-next-line no-unused-vars
import { Key } from 'webdriverio'
// eslint-disable-next-line no-unused-vars
import { sleepForX } from '../commonfunction.mjs'

describe('Export & Import', () => {
	let screen
	before(async () => {
		screen = setupBrowser(browser)
	})
	it('Should navigate to JGL page', async () => {
		// Navigate to JGL page
		const aLink = await screen.getByTestId('jungleA')
		await aLink.click()
		await expect(await screen.getByTestId('sideBarDivTest')).toExist()
	})
	it('Should open import menu when import button is pressed', async () => {
		// Grab the scuttleButtom element and press it
		const scuttleBottom = await screen.getByTestId('Scuttlecrab-Bottom')
		await scuttleBottom.click()
		// Assert that it was pressed
		await expect(scuttleBottom).toHaveAttribute('data-iscampselected', 'true')
		// Grab import button and press it
		const importButton = await screen.getByTestId('importButton')
		await importButton.click()
		// Assert that import area opened
		await expect(await screen.getByTestId('textareaImport')).toExist()
	})
	it('Should not modify settings if invalid JSON is input', async () => {
		const importInput = await screen.getByTestId('textareaImport')
		await importInput.addValue('Completely wrong JSON input')
		const doImport = await screen.getByTestId('importPopup')
		await doImport.click()
		// Assert that the camp is still selected
		const scuttleBottom = await screen.getByTestId('Scuttlecrab-Bottom')
		await expect(scuttleBottom).toHaveAttribute('data-iscampselected', 'true')
	}) 
	it('Should modify settings if correct JSON data is input', async () => {
		// Grab the scuttle-bottom camp again
		const scuttleBottom = await screen.getByTestId('Scuttlecrab-Bottom')
		// Open and grab the JSON data
		const exportOpener = await screen.getByTestId('exportButton')
		await exportOpener.click()
		const jsonExport = await screen.getByTestId('JSONexport')
		await jsonExport.click()
		// Click one other camp
		const grompBlue = await screen.getByTestId('Gromp-Blue')
		await grompBlue.click()
		// Click a champion
		const champInput = await screen.getByTestId('champInput')
		await champInput.addValue('Ahri')
		const ahrLi = await screen.getByTestId('Ahri')
		await ahrLi.click()
		// Grab the image
		const ahriImage = await screen.getByTestId('Ahriimage')
		await expect(ahriImage).toExist()
		// Grab import button and press it
		const importButton = await screen.getByTestId('importButton')
		await importButton.click()
		// Paste into import field
		const importInput = await screen.getByTestId('textareaImport')
		await importInput.click()
		await browser.keys([Key.Ctrl, 'v'])
		// Perform the import
		const doImport = await screen.getByTestId('importPopup')
		await doImport.click()
		// Assert that only scuttle-bottom is selected
		await expect(scuttleBottom).toHaveAttribute('data-iscampselected', 'true')
		await expect(grompBlue).not.toHaveAttribute('data-iscampselected', 'true')
		await expect(ahriImage).not.toExist()
	})
	it('Should save an URL to clipboard when URL export is pressed', async () => {
		// Open and grab the URL data
		const exportOpener = await screen.getByTestId('exportButton')
		await exportOpener.click()
		const urlExp = await screen.getByTestId('urlExport')
		await urlExp.click()
		// Grab a textarea 
		const routeInput = await screen.getByTestId('routesearchinput')
		await routeInput.click()
		// paste value
		await browser.keys([Key.Ctrl, 'v'])
		await expect(routeInput).toHaveValueContaining('https://')
		await routeInput.clearValue()
		await sleepForX(4000)
	})
	it('URL should contain correct data', async () => {
		const champInput = await screen.getByTestId('champInput')
		// U2N1dHRsZWNyYWItQm90dG9t Scuttle
		// Click side
		const redBox = await screen.getByTestId('RedSide')
		await redBox.click()
		// Select champion
		await champInput.click()
		const ahrLi = await screen.getByTestId('Ahri')
		await ahrLi.click()
		// Open and grab the URL data
		const exportOpener = await screen.getByTestId('exportButton')
		await exportOpener.click()
		const urlExp = await screen.getByTestId('urlExport')
		await urlExp.click()
		// Grab a textarea 
		const routeInput = await screen.getByTestId('routesearchinput')
		await routeInput.click()
		// paste value
		await browser.keys([Key.Ctrl, 'v'])
		await expect(routeInput).toHaveValueContaining('Ahri')
		await expect(routeInput).toHaveValueContaining('U2N1dHRsZWNyYWItQm90dG9t')
		await expect(routeInput).toHaveValueContaining('Blue')
	})
})