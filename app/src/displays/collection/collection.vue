<template>
	<value-null v-if="value === null || !info" />
	<div v-else>
		<v-icon v-if="icon" :name="info.icon" left small />
		{{ info.name }}
	</div>
</template>

<script lang="ts" setup>
import { useCollection } from '@db-studio/composables';
import { toRefs } from 'vue';

const props = withDefaults(
	defineProps<{
		value: string | null;
		icon: boolean;
	}>(),
	{
		value: null,
		icon: false,
	}
);

const collection = toRefs(props).value;
const { info } = useCollection(collection);
</script>
