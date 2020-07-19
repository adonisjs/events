require('ts-node').register({
	files: true,
})

const { configure } = require('japa')
configure({
	files: ['test/**/*.spec.ts'],
})
