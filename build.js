const StyleDictionaryPackage = require('style-dictionary');
const tokens = require('./input/tokens.json');

// Register custom format for CSS variables
StyleDictionaryPackage.registerFormat({
	name: 'css/variables',
	formatter: function (dictionary) {
		return dictionary.allProperties.map((prop) => `  --${prop.name}: ${prop.value};`).join('\n');
	},
});

// Preprocess tokens to adjust references
function preprocessTokens(rawTokens) {
	const processedTokens = JSON.parse(JSON.stringify(rawTokens)); // Deep clone the tokens

	// Adjust references for sure.bradfordH1
	processedTokens.sure.bradfordH1.value.fontFamily = `{sure.bradford.value}`;
	processedTokens.sure.bradfordH1.value.fontWeight = `{sure.medium.value}`;
	processedTokens.sure.bradfordH1.value.fontSize = `{sure.heading1.value}`;

	// Adjust references for sure.untitledSansH1
	processedTokens.sure.untitledSansH1.value.fontFamily = `{sure.untitledSans.value}`;
	processedTokens.sure.untitledSansH1.value.fontWeight = `{sure.medium.value}`;
	processedTokens.sure.untitledSansH1.value.fontSize = `{sure.heading1.value}`;

	return processedTokens;
}

// Define the transformation logic
function transformTokens(rawTokens) {
	const processedTokens = preprocessTokens(rawTokens);

	const styleDictionary = StyleDictionaryPackage.extend({
		source: ['./input/tokens.json'],
		platforms: {
			css: {
				transformGroup: 'css',
				buildPath: 'output/',
				files: [
					{
						destination: 'tokens.css',
						format: 'css/variables',
					},
				],
			},
		},
	});

	styleDictionary.buildAllPlatforms();
}

// Process the tokens
transformTokens(tokens);
