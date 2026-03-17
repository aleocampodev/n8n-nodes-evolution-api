import type {
	ICredentialType,
	INodeProperties,
	Icon,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class EvolutionApiApi implements ICredentialType {
	name = 'evolutionApiApi';
	displayName = 'Evolution API';
	icon: Icon = { light: 'file:evolution.svg', dark: 'file:evolution.dark.svg' };
	documentationUrl = 'https://evolution-api.com/docs';

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.baseUrl}}',
			url: '/instance/fetchInstances',
			method: 'GET',
		},
	};

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			placeholder: 'https://api.your-evolution.com',
			required: true,
		},
		{
			displayName: 'Global API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
	];
}
