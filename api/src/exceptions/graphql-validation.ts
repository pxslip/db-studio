import * as sharedExceptions from '@db-studio/exceptions';

export class GraphQLValidationException extends sharedExceptions.BaseException {
	constructor(extensions: Record<string, any>) {
		super('GraphQL validation error.', 400, 'GRAPHQL_VALIDATION_EXCEPTION', extensions);
	}
}
