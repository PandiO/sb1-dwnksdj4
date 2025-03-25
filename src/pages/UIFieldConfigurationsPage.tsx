import React, { useEffect, useState } from "react";
import { getConfig } from "../config/appConfig";
import { testData } from "../data/testData";
import { UIFieldConfigurationsClient } from "../io/UIFieldConfigurationsClient";
import { UIFieldConfigurationDTO } from "../utils/domain/dto/UIFieldConfigurationDTO";
import { Loader2, Plus, Pencil, Trash2, X, AlertCircle } from "lucide-react";

export function UIFieldConfigurationsPage() {
  const [configurations, setConfigurations] = useState<UIFieldConfigurationDTO[]>([]);
  const [editingConfig, setEditingConfig] = useState<UIFieldConfigurationDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const client = UIFieldConfigurationsClient.getInstance();
  const useTestData = getConfig('useTestData');

  useEffect(() => {
    const fetchConfigurations = async () => {
      try {
        if (useTestData) {
          setConfigurations(testData.uiFieldConfigurations);
        } else {
          const data = await client.getAll();
          setConfigurations(data);
        }
      } catch (err) {
        setError('Failed to load UI field configurations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConfigurations();
  }, [useTestData]);

  const handleSave = async () => {
    if (!editingConfig) return;

    try {
      if (useTestData) {
        // Simulate API call with test data
        const updatedConfig = new UIFieldConfigurationDTO({
          ...editingConfig,
          id: editingConfig.id || configurations.length + 1
        });
        if (editingConfig.id === 0) {
          setConfigurations([...configurations, updatedConfig]);
        } else {
          setConfigurations(configurations.map(c => 
            c.id === updatedConfig.id ? updatedConfig : c
          ));
        }
      } else {
        // Real API call
        if (editingConfig.id === 0) {
          const newConfig = await client.create(editingConfig);
          setConfigurations([...configurations, newConfig]);
        } else {
          const updatedConfig = await client.update(editingConfig);
          setConfigurations(configurations.map(c => 
            c.id === updatedConfig.id ? updatedConfig : c
          ));
        }
      }
      setEditingConfig(null);
    } catch (err) {
      setError('Failed to save configuration');
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      if (!useTestData) {
        await client.delete(id);
      }
      setConfigurations(configurations.filter(c => c.id !== id));
      // Remove from state regardless of data source
      setError(null);
    } catch (err) {
      setError('Failed to delete configuration');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">UI Field Configurations</h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage field configurations for different object types
          </p>
        </div>
        <button
          onClick={() => setEditingConfig(new UIFieldConfigurationDTO({}))}
          className="btn-primary mt-4 sm:mt-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Configuration
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
          <p className="text-sm text-red-600 flex-1">{error}</p>
        </div>
      )}

      <div className="panel overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Object Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {configurations.map(config => (
              <tr key={config.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{config.objectType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{config.fieldName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{config.label}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {config.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    config.required
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {config.required ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setEditingConfig(config)}
                    className="btn-secondary mr-2 py-1 px-2"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(config.id)}
                    className="btn-secondary py-1 px-2 text-red-600 hover:text-red-700 hover:border-red-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingConfig.id === 0 ? "Add New" : "Edit"} Configuration
                </h2>
                <button
                  onClick={() => setEditingConfig(null)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Object Type
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g., structure"
                    value={editingConfig.objectType}
                    onChange={e => setEditingConfig(new UIFieldConfigurationDTO({ ...editingConfig, objectType: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field Name
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g., name"
                    value={editingConfig.fieldName}
                    onChange={e => setEditingConfig(new UIFieldConfigurationDTO({ ...editingConfig, fieldName: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g., Name"
                    value={editingConfig.label}
                    onChange={e => setEditingConfig(new UIFieldConfigurationDTO({ ...editingConfig, label: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    className="input"
                    value={editingConfig.type}
                    onChange={e => setEditingConfig(new UIFieldConfigurationDTO({ ...editingConfig, type: e.target.value }))}
                  >
                    <option value="">Select type...</option>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="object">Object</option>
                    <option value="array">Array</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Placeholder
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter placeholder text"
                    value={editingConfig.placeholder || ''}
                    onChange={e => setEditingConfig(new UIFieldConfigurationDTO({ ...editingConfig, placeholder: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Options Endpoint
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g., /api/items"
                    value={editingConfig.optionsEndpoint || ''}
                    onChange={e => setEditingConfig(new UIFieldConfigurationDTO({ ...editingConfig, optionsEndpoint: e.target.value }))}
                  />
                </div>

                <div className="sm:col-span-2 flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      checked={editingConfig.required}
                      onChange={e => setEditingConfig(new UIFieldConfigurationDTO({ ...editingConfig, required: e.target.checked }))}
                    />
                    <span className="ml-2 text-sm text-gray-700">Required</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      checked={editingConfig.readonly}
                      onChange={e => setEditingConfig(new UIFieldConfigurationDTO({ ...editingConfig, readonly: e.target.checked }))}
                    />
                    <span className="ml-2 text-sm text-gray-700">Read Only</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setEditingConfig(null)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-primary"
              >
                {editingConfig.id === 0 ? 'Create' : 'Update'} Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}