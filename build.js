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
	processedTokens.sure.bradfordH1.value.fontFamily = `{sure.${processedTokens.sure.bradfordH1.value.fontFamily}.value}`;
	processedTokens.sure.bradfordH1.value.fontWeight = `{sure.${processedTokens.sure.bradfordH1.value.fontWeight}.value}`;
	processedTokens.sure.bradfordH1.value.fontSize = `{sure.${processedTokens.sure.bradfordH1.value.fontSize}.value}`;

	// Adjust references for sure.untitledSansH1
	processedTokens.sure.untitledSansH1.value.fontFamily = `{sure.${processedTokens.sure.untitledSansH1.value.fontFamily}.value}`;
	processedTokens.sure.untitledSansH1.value.fontWeight = `{sure.${processedTokens.sure.untitledSansH1.value.fontWeight}.value}`;
	processedTokens.sure.untitledSansH1.value.fontSize = `{sure.${processedTokens.sure.untitledSansH1.value.fontSize}.value}`;

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
