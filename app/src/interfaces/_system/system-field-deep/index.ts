import { defineInterface } from '@db-studio/utils';
import InterfaceSystemField from './system-field.vue';

export default defineInterface({
	id: 'system-field-deep',
	name: '$t:field',
	icon: 'box',
	component: InterfaceSystemField,
	types: ['string'],
	options: [],
	system: true,
});
