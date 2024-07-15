import { mount } from '@vue/test-utils';
import { GlobalMountOptions } from '@vue/test-utils/dist/types';
import { beforeEach, expect, test, vi } from 'vitest';

import { directive } from '@/directives/click-outside';
import TransitionBounce from './transition/bounce.vue';
import VMenu from './v-menu.vue';

beforeEach(() => {
	// create teleport target
	const el = document.createElement('div');
	el.id = 'menu-outlet';
	document.body.appendChild(el);

	// mocking this as it seems like there's observer undefined error in happy-dom
	// but it is not crucial for the current test cases at the moment
	vi.spyOn(MutationObserver.prototype, 'disconnect').mockResolvedValue();
});

const global: GlobalMountOptions = {
	directives: {
		'click-outside': directive as any,
	},
	components: {
		TransitionBounce,
	},
};

test('Mount component', () => {
	expect(VMenu).toBeTruthy();

	const wrapper = mount(VMenu, {
		slots: {
			default: 'Slot Content',
		},
		global,
	});

	expect(wrapper.html()).toMatchSnapshot();
});

test('should not appear when clicked if the trigger is not "click"', async () => {
	const wrapper = mount(VMenu, {
		global,
	});

	const menu = wrapper.find<HTMLDivElement>('.v-menu');
	const popperBefore = wrapper.findComponent(TransitionBounce).find('.v-menu-popper');
	expect(popperBefore.exists()).toBeFalsy();
	await menu.trigger('click');
	// find the menu item that should _NOT_ exist and assert that
	const popperAfter = wrapper.findComponent(TransitionBounce).find('.v-menu-popper');
	expect(popperAfter.exists()).toBeFalsy();
});

test('menu should appear when clicked if the trigger is "click"', async () => {
	const wrapper = mount(VMenu, {
		props: {
			trigger: 'click',
		},
		global,
	});

	const menu = wrapper.find<HTMLDivElement>('.v-menu');
	const popperBefore = wrapper.findComponent(TransitionBounce).find('.v-menu-popper');
	expect(popperBefore.exists()).toBeFalsy();
	await menu.trigger('click');
	// find the menu item that should _NOT_ exist and assert that
	const popperAfter = wrapper.findComponent(TransitionBounce).find('.v-menu-popper');
	expect(popperAfter.exists()).not.toBeFalsy();
});

test('should not have click event listener when closeOnContentClick prop is false', async () => {
	const wrapper = mount(VMenu, {
		props: {
			modelValue: true, // make it open in the beginning to ensure '.v-menu-content' is in the dom
			closeOnContentClick: false,
		},
		global,
	});

	//TODO: This makes me feel like pulling .v-menu-popper out of the v-menu component and into its own, more testable, component
	const popper = wrapper.getComponent(TransitionBounce).find('.v-menu-popper');
	const menuContent = popper.find('.v-menu-content');
	expect(menuContent.element._listeners.click).not.toBeDefined();
});

test('should have click event listener when closeOnContentClick prop is true', async () => {
	const wrapper = mount(VMenu, {
		props: {
			modelValue: true, // make it open in the beginning to ensure '.v-menu-content' is in the dom
			closeOnContentClick: true,
		},
		global,
	});

	const popper = wrapper.getComponent(TransitionBounce).find('.v-menu-popper');
	const menuContent = popper.find('.v-menu-content');
	expect(menuContent.element._listeners.click).toBeDefined();
});

test('should not have pointerenter and pointerleave event listener when trigger is not "hover"', () => {
	const wrapper = mount(VMenu, {
		props: {
			modelValue: true, // make it open in the beginning to ensure '.v-menu-content' is in the dom
		},
		global,
	});

	const activatorListeners = wrapper.find({ ref: 'activator' }).element._listeners;
	expect(activatorListeners).toBe({});

	// we need to use getComponent because it's teleported
	const vMenuContentListeners = wrapper.getComponent(TransitionBounce).find('.v-menu-content').element;
	expect(vMenuContentListeners._listeners).not.toHaveProperty('onPointerenter');
	expect(vMenuContentListeners._listeners).not.toHaveProperty('onPointerleave');
});

test('should have pointerenter and pointerleave event listener when trigger is "hover"', () => {
	const wrapper = mount(VMenu, {
		props: {
			modelValue: true, // make it open in the beginning to ensure '.v-menu-content' is in the dom
			trigger: 'hover',
		},
		global,
	});

	const activatorListeners = (wrapper.find({ ref: 'activator' }).element as any)._vei;
	expect(activatorListeners).toHaveProperty('onPointerenter');
	expect(activatorListeners).toHaveProperty('onPointerleave');

	// we need to use getComponent because it's teleported
	const vMenuContentListeners = (wrapper.getComponent(TransitionBounce).find('.v-menu-content').element as any)._vei;
	expect(vMenuContentListeners).toHaveProperty('onPointerenter');
	expect(vMenuContentListeners).toHaveProperty('onPointerleave');
});
