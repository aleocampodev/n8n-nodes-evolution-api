import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class EvolutionApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Evolution API',
		name: 'evolutionApi',
		icon: 'file:evolution.svg', 
		group: ['transform'],
		version: 1,
		usableAsTool: true,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume the Evolution API for WhatsApp messaging',
		defaults: {
			name: 'Evolution API',
		},
		inputs: ['main'],
		outputs: ['main'],
		// 1. MANEJO PRO DE CREDENCIALES
		credentials: [
			{
				name: 'evolutionApiApi',
				required: true,
			},
		],
		// 2. ESTILO DECLARATIVO PRO
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				apikey: '={{$credentials.apiKey}}',
			},
		},
		properties: [
			// ----------------------------------
			// RESOURCES
			// ----------------------------------
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Message',
						value: 'message',
					},
					{
						name: 'Custom API Request',
						value: 'customApiRequest',
						description: 'Make an authenticated generic HTTP request to Evolution API. Future-proof!.',
					},
				],
				default: 'message',
			},

			// ----------------------------------
			// OPERATIONS FOR "MESSAGE"
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['message'],
					},
				},
				options: [
					{
						name: 'Send Text',
						value: 'sendText',
						action: 'Send a text message',
						description: 'Send a simple text message to a number',
						routing: {
							request: {
								method: 'POST',
								url: '=/message/sendText/{{$parameter.instanceName}}',
							},
						},
					},
				],
				default: 'sendText',
			},

			// ----------------------------------
			// FIELDS FOR "MESSAGE: SEND TEXT"
			// ----------------------------------
			{
				displayName: 'Instance Name',
				name: 'instanceName',
				type: 'string',
				default: '',
				placeholder: 'EvolutionInstance1',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendText'],
					},
				},
			},
			{
				displayName: 'Phone Number',
				name: 'number',
				type: 'string',
				default: '',
				placeholder: '573001234567',
				description: 'Destination number with country code',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendText'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'number',
					},
				},
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendText'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'text',
					},
				},
			},

			// ----------------------------------
			// OPERATIONS FOR "CUSTOM API REQUEST"
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['customApiRequest'],
					},
				},
				options: [
					{
						name: 'Execute',
						value: 'execute',
						action: 'Execute a custom request to evolution api',
						routing: {},
					},
				],
				default: 'execute',
			},
			{
				displayName: 'Method',
				name: 'method',
				type: 'options',
				options: [
					{ name: 'GET', value: 'GET' },
					{ name: 'POST', value: 'POST' },
					{ name: 'PUT', value: 'PUT' },
					{ name: 'DELETE', value: 'DELETE' },
				],
				default: 'GET',
				displayOptions: {
					show: {
						resource: ['customApiRequest'],
						operation: ['execute'],
					},
				},
				routing: {
					request: {
						// @ts-expect-error method is dynamic based on user selection
						method: '={{$value}}',
					},
				},
			},
			{
				displayName: 'URL / Path',
				name: 'url',
				type: 'string',
				default: '',
				placeholder: '/instance/create',
				description: 'The endpoint path. Example: /instance/create.',
				displayOptions: {
					show: {
						resource: ['customApiRequest'],
						operation: ['execute'],
					},
				},
				routing: {
					request: {
						url: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Body JSON',
				name: 'body',
				type: 'json',
				default: '{}',
				displayOptions: {
					show: {
						resource: ['customApiRequest'],
						operation: ['execute'],
						method: ['POST', 'PUT', 'PATCH'],
					},
				},
				routing: {
					request: {
						body: '={{JSON.parse($value)}}',
					},
				},
			},
		],
	};
}
