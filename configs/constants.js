'use strict';

module.exports = {
	VALIDATION: {
		COUNTRY_CODE: {
			PATTERN: '^[0-9]{1,3}$'
		},
		PHONE: {
			PATTERN: '^[0-9]{9,14}$'
		},
		UUID: {
			PATTERN: '^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$'
		},
		VERSION: {
			// PATTERN: '^[0-9]{1,}.[0-9]{1,}.[0-9]{1,}$'
			PATTERN: '^\\d+.\\d+.\\d+$'
		},
		YEAR: {
			PATTERN: '^(19|20)\\d{2}|NA$'
		},
		ZIPCODE: {
			PATTERN: '^[1-9][0-9]{5}$'
		}
	},
	ENUM: {
		VEHICLE: {
			FUEL_TYPE: ['Petrol', 'Diesel', 'CNG', 'LPG', 'Petrol-CNG', 'Petrol-LPG', 'Diesel-CNG', 'Hybrid', 'Electric', 'Others'],
			CATEGORIES: ['2W', '4W', 'CV', 'D']
		}
};
