<template>
	<component
		:is="layoutWrapper"
		ref="layoutRef"
		v-slot="{ layoutState }"
		v-model:selection="selection"
		v-model:layout-options="layoutOptions"
		v-model:layout-query="layoutQuery"
		:filter="mergeFilters(filter, roleFilter)"
		:filter-user="filter"
		:filter-system="roleFilter"
		:search="search"
		collection="directus_users"
		:reset-preset="resetPreset"
	>
		<private-view :title="bookmark ? bookmarkTitle : title">
			<template v-if="breadcrumb" #headline>
				<v-breadcrumb :items="breadcrumb" />
			</template>

			<template #title-outer:prepend>
				<v-button class="header-icon" rounded disabled icon secondary>
					<v-icon name="people_alt" />
				</v-button>
			</template>

			<template #title-outer:append>
				<div class="bookmark-controls">
					<bookmark-add
						v-if="!bookmark"
						v-model="bookmarkDialogActive"
						class="add"
						:saving="creatingBookmark"
						@save="createBookmark"
					>
						<template #activator="{ on }">
							<v-icon v-tooltip.right="t('create_bookmark')" class="toggle" clickable name="bookmark" @click="on" />
						</template>
					</bookmark-add>

					<v-icon v-else-if="bookmarkSaved" class="saved" name="bookmark" />

					<template v-else-if="bookmarkIsMine">
						<v-icon
							v-tooltip.bottom="t('update_bookmark')"
							class="save"
							clickable
							name="bookmark_save"
							@click="savePreset()"
						/>
					</template>

					<bookmark-add
						v-else
						v-model="bookmarkDialogActive"
						class="add"
						:saving="creatingBookmark"
						@save="createBookmark"
					>
						<template #activator="{ on }">
							<v-icon class="toggle" name="bookmark_outline" clickable @click="on" />
						</template>
					</bookmark-add>

					<v-icon
						v-if="bookmark && !bookmarkSaving && bookmarkSaved === false"
						v-tooltip.bottom="t('reset_bookmark')"
						name="settings_backup_restore"
						clickable
						class="clear"
						@click="clearLocalSave"
					/>
				</div>
			</template>

			<template #actions:prepend>
				<component :is="`layout-actions-${layout}`" v-bind="layoutState" />
			</template>

			<template #actions>
				<search-input v-model="search" v-model:filter="filter" collection="directus_users" />

				<v-dialog v-if="selection.length > 0" v-model="confirmDelete" @esc="confirmDelete = false">
					<template #activator="{ on }">
						<v-button
							v-tooltip.bottom="batchDeleteAllowed ? t('delete_label') : t('not_allowed')"
							:disabled="batchDeleteAllowed !== true"
							rounded
							icon
							class="action-delete"
							secondary
							@click="on"
						>
							<v-icon name="delete" />
						</v-button>
					</template>

					<v-card>
						<v-card-title>{{ t('batch_delete_confirm', selection.length) }}</v-card-title>

						<v-card-actions>
							<v-button secondary @click="confirmDelete = false">
								{{ t('cancel') }}
							</v-button>
							<v-button kind="danger" :loading="deleting" @click="batchDelete">
								{{ t('delete_label') }}
							</v-button>
						</v-card-actions>
					</v-card>
				</v-dialog>

				<v-button
					v-if="selection.length > 0"
					v-tooltip.bottom="batchEditAllowed ? t('edit') : t('not_allowed')"
					rounded
					icon
					secondary
					:disabled="batchEditAllowed === false"
					@click="batchEditActive = true"
				>
					<v-icon name="edit" />
				</v-button>

				<v-button
					v-if="canInviteUsers"
					v-tooltip.bottom="t('invite_users')"
					rounded
					icon
					secondary
					@click="userInviteModalActive = true"
				>
					<v-icon name="person_add" />
				</v-button>

				<v-button
					v-tooltip.bottom="createAllowed ? t('create_item') : t('not_allowed')"
					rounded
					icon
					:to="addNewLink"
					:disabled="createAllowed === false"
				>
					<v-icon name="add" />
				</v-button>
			</template>

			<template #navigation>
				<users-navigation :current-role="role" current-collection="directus_users" />
			</template>

			<v-info
				v-if="bookmark && bookmarkExists === false"
				type="warning"
				:title="t('bookmark_doesnt_exist')"
				icon="bookmark"
				center
			>
				{{ t('bookmark_doesnt_exist_copy') }}

				<template #append>
					<v-button to="/users">
						{{ t('bookmark_doesnt_exist_cta') }}
					</v-button>
				</template>
			</v-info>

			<users-invite v-if="canInviteUsers" v-model="userInviteModalActive" @update:model-value="refresh" />

			<component :is="`layout-${layout}`" v-bind="layoutState">
				<template #no-results>
					<v-info v-if="!filter && !search" :title="t('user_count', 0)" icon="people_alt" center>
						{{ t('no_users_copy') }}

						<template v-if="canInviteUsers" #append>
							<v-button :to="role ? { path: `/users/roles/${role}/+` } : { path: '/users/+' }">
								{{ t('create_user') }}
							</v-button>
						</template>
					</v-info>

					<v-info v-else :title="t('no_results')" icon="search" center>
						{{ t('no_results_copy') }}

						<template #append>
							<v-button @click="clearFilters">{{ t('clear_filters') }}</v-button>
						</template>
					</v-info>
				</template>

				<template #no-items>
					<v-info :title="t('user_count', 0)" icon="people_alt" center>
						{{ t('no_users_copy') }}

						<template v-if="canInviteUsers" #append>
							<v-button :to="role ? { path: `/users/roles/${role}/+` } : { path: '/users/+' }">
								{{ t('create_user') }}
							</v-button>
						</template>
					</v-info>
				</template>
			</component>

			<drawer-batch
				v-model:active="batchEditActive"
				:primary-keys="selection"
				collection="directus_users"
				@refresh="refresh"
			/>

			<template #sidebar>
				<sidebar-detail icon="info" :title="t('information')" close>
					<div v-md="t('page_help_users_collection')" class="page-description" />
				</sidebar-detail>
				<layout-sidebar-detail v-model="layout">
					<component :is="`layout-options-${layout}`" v-bind="layoutState" />
				</layout-sidebar-detail>
				<component :is="`layout-sidebar-${layout}`" v-bind="layoutState" />
				<refresh-sidebar-detail v-model="refreshInterval" @refresh="refresh" />
				<export-sidebar-detail
					collection="directus_users"
					:layout-query="layoutQuery"
					:filter="mergeFilters(filter, roleFilter)"
					:search="search"
					@refresh="refresh"
				/>
			</template>
		</private-view>
	</component>
</template>

<script lang="ts" setup>
import UsersInvite from '@/views/private/components/users-invite.vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import UsersNavigation from '../components/navigation.vue';

import api from '@/api';
import { usePreset } from '@/composables/use-preset';
import { usePermissionsStore } from '@/stores/permissions';
import { useServerStore } from '@/stores/server';
import { useUserStore } from '@/stores/user';
import { unexpectedError } from '@/utils/unexpected-error';
import DrawerBatch from '@/views/private/components/drawer-batch.vue';
import LayoutSidebarDetail from '@/views/private/components/layout-sidebar-detail.vue';
import RefreshSidebarDetail from '@/views/private/components/refresh-sidebar-detail.vue';
import SearchInput from '@/views/private/components/search-input.vue';
import { useLayout } from '@db-studio/composables';
import { Role } from '@db-studio/types';
import { mergeFilters } from '@db-studio/utils';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
import useNavigation from '../composables/use-navigation';
import { useRouter } from 'vue-router';
import BookmarkAdd from '@/views/private/components/bookmark-add.vue';

type Item = {
	[field: string]: any;
};

interface Props {
	role?: string | null;
	bookmark?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
	role: null,
	bookmark: null,
});

const { t } = useI18n();

const { roles } = useNavigation();
const userInviteModalActive = ref(false);
const userStore = useUserStore();
const permissionsStore = usePermissionsStore();
const serverStore = useServerStore();

const layoutRef = ref();
const selection = ref<Item[]>([]);

const router = useRouter();

const bookmark = computed(() => (props?.bookmark ? +props.bookmark : null));

const {
	layout,
	layoutOptions,
	layoutQuery,
	filter,
	search,
	savePreset,
	bookmarkExists,
	saveCurrentAsBookmark,
	bookmarkTitle,
	resetPreset,
	bookmarkSaved,
	bookmarkIsMine,
	refreshInterval,
	busy: bookmarkSaving,
	clearLocalSave,
} = usePreset(ref('directus_users'), bookmark);

const { addNewLink } = useLinks();

const { confirmDelete, deleting, batchDelete, batchEditActive } = useBatch();

const { bookmarkDialogActive, creatingBookmark, createBookmark } = useBookmarks();

const { breadcrumb, title } = useBreadcrumb();

const roleFilter = computed(() => {
	if (props.role !== null) {
		return {
			_and: [
				{
					role: {
						_eq: props.role,
					},
				},
			],
		};
	}

	return null;
});

const canInviteUsers = computed(() => {
	if (serverStore.auth.disableDefault === true) return false;

	const isAdmin = !!userStore.currentUser?.role?.admin_access;
	if (isAdmin) return true;

	const usersCreatePermission = permissionsStore.permissions.find(
		(permission) => permission.collection === 'directus_users' && permission.action === 'create'
	);

	const rolesReadPermission = permissionsStore.permissions.find(
		(permission) => permission.collection === 'directus_roles' && permission.action === 'read'
	);

	return !!usersCreatePermission && !!rolesReadPermission;
});

const { layoutWrapper } = useLayout(layout);

const { batchEditAllowed, batchDeleteAllowed, createAllowed } = usePermissions();

onBeforeRouteLeave(() => {
	selection.value = [];
});

onBeforeRouteUpdate(() => {
	selection.value = [];
});

async function refresh() {
	await layoutRef.value?.state?.refresh?.();
}

function useBatch() {
	const confirmDelete = ref(false);
	const deleting = ref(false);

	const batchEditActive = ref(false);

	const error = ref<any>();

	return { batchEditActive, confirmDelete, deleting, batchDelete, error };

	async function batchDelete() {
		deleting.value = true;

		const batchPrimaryKeys = selection.value;

		try {
			await api.delete('/users', {
				data: batchPrimaryKeys,
			});

			await refresh();

			selection.value = [];
			confirmDelete.value = false;
		} catch (err: any) {
			error.value = err;
			unexpectedError(err);
		} finally {
			deleting.value = false;
		}
	}
}

function useLinks() {
	const addNewLink = computed<string>(() => {
		return props.role ? `/users/roles/${props.role}/+` : '/users/+';
	});

	return { addNewLink };
}

function useBreadcrumb() {
	const breadcrumb = computed(() => {
		if (!props.role) return null;

		return [
			{
				name: t('user_directory'),
				to: `/users`,
			},
		];
	});

	const title = computed(() => {
		if (!props.role) return t('user_directory');
		return roles.value?.find((role: Role) => role.id === props.role)?.name;
	});

	return { breadcrumb, title };
}

function useBookmarks() {
	const bookmarkDialogActive = ref(false);
	const creatingBookmark = ref(false);

	return {
		bookmarkDialogActive,
		creatingBookmark,
		createBookmark,
	};

	async function createBookmark(bookmark: any) {
		creatingBookmark.value = true;

		try {
			const newBookmark = await saveCurrentAsBookmark({
				bookmark: bookmark.name,
				icon: bookmark.icon,
				color: bookmark.color,
			});

			router.push(`/users/?bookmark=${newBookmark.id}`);

			bookmarkDialogActive.value = false;
		} catch (err: any) {
			unexpectedError(err);
		} finally {
			creatingBookmark.value = false;
		}
	}
}

function clearFilters() {
	filter.value = null;
	search.value = null;
}

function usePermissions() {
	const batchEditAllowed = computed(() => {
		const admin = userStore?.currentUser?.role.admin_access === true;
		if (admin) return true;

		const updatePermissions = permissionsStore.permissions.find(
			(permission) => permission.action === 'update' && permission.collection === 'directus_users'
		);

		return !!updatePermissions;
	});

	const batchDeleteAllowed = computed(() => {
		const admin = userStore?.currentUser?.role.admin_access === true;
		if (admin) return true;

		const deletePermissions = permissionsStore.permissions.find(
			(permission) => permission.action === 'delete' && permission.collection === 'directus_users'
		);

		return !!deletePermissions;
	});

	const createAllowed = computed(() => {
		const admin = userStore?.currentUser?.role.admin_access === true;
		if (admin) return true;

		const createPermissions = permissionsStore.permissions.find(
			(permission) => permission.action === 'create' && permission.collection === 'directus_users'
		);

		return !!createPermissions;
	});

	return { batchEditAllowed, batchDeleteAllowed, createAllowed };
}
</script>

<style lang="scss" scoped>
.action-delete {
	--v-button-background-color-hover: var(--danger) !important;
	--v-button-color-hover: var(--white) !important;
}

.header-icon {
	--v-button-color-disabled: var(--foreground-normal);
}

.layout {
	--layout-offset-top: 64px;
}
.bookmark-controls {
	.add,
	.save,
	.saved,
	.clear {
		display: inline-block;
		margin-left: 8px;
	}

	.add,
	.save,
	.clear {
		cursor: pointer;
		transition: color var(--fast) var(--transition);
	}

	.add {
		color: var(--foreground-subdued);

		&:hover {
			color: var(--foreground-normal);
		}
	}

	.save {
		color: var(--warning);

		&:hover {
			color: var(--warning-125);
		}
	}

	.clear {
		margin-left: 4px;
		color: var(--foreground-subdued);

		&:hover {
			color: var(--warning);
		}
	}

	.saved {
		color: var(--primary);
	}
}
</style>
