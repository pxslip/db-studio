<template>
	<div ref="canvas"></div>
</template>

<script setup lang="ts">
import api from '@/api';
import { useFieldsStore } from '@/stores/fields';
import { useRelationsStore } from '@/stores/relations';
import { useItems } from '@db-studio/composables';
import { getEndpoint } from '@db-studio/utils';
import ApexCharts from 'apexcharts';
import { computed, onMounted, onUnmounted, ref } from 'vue';
const props = withDefaults(
	defineProps<{
		showHeader?: boolean;
		collection: string;
		category: string;
		value: string;
		aggregate?: string;
	}>(),
	{
		aggregate: 'avg',
	},
);

const relations = useRelationsStore();
const fields = useFieldsStore();

const endpoint = computed(() => {
	return getEndpoint(props.collection);
});

const canvas = ref<HTMLDivElement | null>(null);
const chart = ref<ApexCharts>();

const getData = async () => {
	// test if any of the fields are relations
	const catField = fields.getField(props.collection, props.category);
	try {
		const { data, status } = await api.get(endpoint.value, {
			params: {
				'aggregate': { [props.aggregate]: props.value },
				'groupBy[]': props.category,
				'fields': [props.value, props.category],
			},
		});
		console.log(data);
	} catch (exc) {
		console.log(exc);
	}
	// const seriesData = props.data?.map((item) => {
	// 	return {
	// 		y: item[props.aggregate][props.values],
	// 		x: item['group'][props.category],
	// 	};
	// });
	return {
		chart: {
			type: 'bar',
			fontFamily: 'var(--family-sans-serif)',
			foreColor: 'var(--foreground-normal)',
		},
		plotOptions: {
			bar: {
				horizontal: false,
			},
		},
		fill: {
			opacity: 1,
		},
		series: [
			{
				data: [],
			},
		],
	};
};

getData();

onMounted(() => {
	if (canvas.value) {
		// chart.value = new ApexCharts(canvas.value, data.value);
		// chart.value.render();
	}
});

onUnmounted(() => {
	if (chart.value) {
		chart.value.destroy();
	}
});
</script>

<style scoped>
.text {
	padding: 12px;
}

.text.has-header {
	padding: 0 12px;
}
</style>
