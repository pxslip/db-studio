export const AGGREGATE_FUNCTIONS = (isNumeric: boolean) => {
	return [
		{
			text: 'Count',
			value: 'count',
			disabled: false,
		},
		{
			text: 'Count (Distinct)',
			value: 'countDistinct',
			disabled: false,
		},
		{
			text: 'First',
			value: 'first',
			disabled: false,
		},
		{
			text: 'Last',
			value: 'last',
			disabled: false,
		},
		{
			divider: true,
		},
		{
			text: 'Average',
			value: 'avg',
			disabled: !isNumeric,
		},
		{
			text: 'Average (Distinct)',
			value: 'avgDistinct',
			disabled: !isNumeric,
		},
		{
			text: 'Sum',
			value: 'sum',
			disabled: !isNumeric,
		},
		{
			text: 'Sum (Distinct)',
			value: 'sumDistinct',
			disabled: !isNumeric,
		},
		{
			text: 'Minimum',
			value: 'min',
			disabled: !isNumeric,
		},
		{
			text: 'Maximum',
			value: 'max',
			disabled: !isNumeric,
		},
	];
};
