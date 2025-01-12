export interface ConfigDefinition {
    gatewayApiUrl: string;
}

const ConfigurationHelper: ConfigDefinition = {
    gatewayApiUrl: (window as any)['config'].gatewayApiUrl || 'https:localhost'
}

export default ConfigurationHelper;