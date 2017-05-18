'use strict'

import { app, BrowserWindow } from 'electron'

const Tester = require('../classes/Tester.js');
const tester = new Tester();

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
? `http://localhost:${require('../../../config').port}`
: `file://${__dirname}/index.html`

function createWindow () {
	/**
	* Initial window options
	*/
	mainWindow = new BrowserWindow({
		height: 600,
		width: 800
	})

	mainWindow.loadURL(winURL)

	mainWindow.on('closed', () => {
		mainWindow = null
	})

	// eslint-disable-next-line no-console
	console.log('mainWindow opened')

	tester.runTestServer(); // запускаєм сервер селеніума
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()

		// TODO: подумати над завершенням всіх процесів, бо вильоти часті будуть
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})
