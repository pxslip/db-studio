import { action } from '@storybook/addon-actions';
//TODO: check if the _update param is somehow required
export function fix(args, argTypes, _update) {
	if (args === undefined) args = {};

	for (let type of Object.values(argTypes)) {
		if (type.table.category !== 'events') continue;

		if (type.name.startsWith('update:')) {
			args[type.name] = (event) => {
				// update({
				//     [type.name.substring(7)]: event
				// })
				action(type.name)(event);
			};
		} else args[type.name] = action(type.name);
	}

	return { args };
}
