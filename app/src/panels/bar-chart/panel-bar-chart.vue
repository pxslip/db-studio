<template>
	<div ref="canvas"></div>
</template>

<script setup lang="ts">
import { useFieldsStore } from '@/stores/fields';
import { deepGetSpread } from '@db-studio/utils';
import ApexCharts from 'apexcharts';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const canvas = ref<HTMLDivElement | null>(null);
const chart = ref<ApexCharts>();

const fields = useFieldsStore();

const props = withDefaults(
	defineProps<{
		showHeader?: boolean;
		collection: string;
		category: string;
		values: string;
		data?: Record<string, Record<string, string | number>>[];
		aggregate?: string;
	}>(),
	{
		aggregate: 'avg',
	},
);

const seriesName = computed(() => {
	const valueField = fields.getField(props.collection, props.values);
	switch (props.aggregate) {
		case 'avg':
		case 'avgDistinct':
			return `Average (${valueField?.name})`;
		case 'count':
		case 'countDistinct':
			return `Count (${valueField?.name})`;
		case 'sum':
		case 'sumDistinct':
			return `Sum (${valueField?.name})`;
		case 'min':
			return `Min (${valueField?.name})`;
		case 'max':
			return `Max (${valueField?.name})`;
	}
});

const data = computed(() => {
	const aggregated = props.data?.reduce<Record<string, number[]>>((accumulator, item) => {
		let categories = deepGetSpread(item, props.category);
		categories = Array.isArray(categories) ? categories : [categories];
		const values = deepGetSpread(item, props.values);
		for (const category of categories) {
			const strCategory = String(category);
			if (strCategory in accumulator === false) {
				accumulator[strCategory] = [];
			}
			accumulator[strCategory].push(...((Array.isArray(values) ? values : [values]) as number[])); // TODO: this is likely an incorrect assumption, fix
		}
		return accumulator;
	}, {});

	if (aggregated) {
		// const worker = new Worker(new URL('aggregator.ts', import.meta.url));
		// worker.postMessage(aggregated);
		return Object.entries(aggregated)
			.map((item) => {
				const [category, values] = item;
				switch (props.aggregate) {
					case 'avg':
					case 'avgDistinct':
						return { x: category, y: values.reduce((acc, curr) => acc + curr, 0) / values.length };
					case 'count':
					case 'countDistinct':
						return { x: category, y: values.length };
					case 'sum':
					case 'sumDistinct':
						return { x: category, y: values.reduce((acc, curr) => acc + curr) };
					case 'min':
						return { x: category, y: Math.min(...values) };
					case 'max':
						return { x: category, y: Math.max(...values) };
				}
			})
			.filter((val) => !!val);
	}
	return [];
});

const chartData = computed(() => {
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
				name: seriesName.value,
				data: data.value,
			},
		],
	};
});

onMounted(() => {
	if (canvas.value) {
		chart.value = new ApexCharts(canvas.value, chartData.value);
		chart.value.render();
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
