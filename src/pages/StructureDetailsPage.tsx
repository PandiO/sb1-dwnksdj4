import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Home, Package, Database } from 'lucide-react';
import { StructuresManager } from '../io/structures';
import { StructureViewDTO } from '../utils/domain/dto/structure/StructureViewDTO';
import { mapFieldDataToForm as mapStructureFieldDataToForm } from '../utils/domain/dto/structure/StructureViewDTO';

export function StructureDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [structure, setStructure] = React.useState<StructureViewDTO | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchStructure = async () => {
      try {
        if (!id) throw new Error('No structure ID provided');
        const data = await StructuresManager.getInstance().getViewById(parseInt(id));
        setStructure(mapStructureFieldDataToForm(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load structure details');
      } finally {
        setLoading(false);
      }
    };

    fetchStructure();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !structure) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Structure</h2>
          <p className="text-gray-600 mb-8">{error || 'Structure not found'}</p>
          <button
            onClick={() => navigate(-1)}
            className="btn-primary"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>

          <div className="flex items-center space-x-4">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {structure.name}
                <span className="ml-3 text-lg font-normal text-gray-500">
                  (ID: {structure.id})
                </span>
              </h1>
              {structure.description && (
                <p className="mt-1 text-gray-600">{structure.description}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Location Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                Location Details
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Coordinates</div>
                  <div className="mt-1 text-gray-900">
                    X: {structure.location.x}, Y: {structure.location.y}, Z: {structure.location.z}
                  </div>
                </div>

                {structure.street && (
                  <div>
                    <div className="text-sm font-medium text-gray-500">Street</div>
                    <div className="mt-1 text-gray-900">
                      {structure.street.name}
                      {structure.streetNumber && ` #${structure.streetNumber}`}
                    </div>
                  </div>
                )}

                {structure.district && (
                  <div>
                    <div className="text-sm font-medium text-gray-500">District</div>
                    <div className="mt-1 text-gray-900">{structure.district.name}</div>
                  </div>
                )}

                {structure.district?.Town && (
                  <div>
                    <div className="text-sm font-medium text-gray-500">Town</div>
                    <div className="mt-1 text-gray-900">{structure.district.Town.name}</div>
                  </div>
                )}

                <div>
                  <div className="text-sm font-medium text-gray-500">World</div>
                  <div className="mt-1 text-gray-900">{structure.location.worldName}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Storage Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Database className="h-5 w-5 text-primary mr-2" />
                Storage Details
              </h2>

              {structure.storages && structure.storages.length > 0 ? (
                <div className="space-y-6">
                  {structure.storages.map((storage) => (
                    <div
                      key={storage.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Storage #{storage.id}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {storage.itemAmount} / {storage.itemAmountMax} items
                        </span>
                      </div>

                      {/* Capacity Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Capacity</span>
                          <span>{storage.capacity} / {storage.capacityMax}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              (storage.capacity / storage.capacityMax) > 0.9
                                ? 'bg-red-500'
                                : (storage.capacity / storage.capacityMax) > 0.7
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`}
                            style={{
                              width: `${(storage.capacity / storage.capacityMax) * 100}%`
                            }}
                          />
                        </div>
                      </div>

                      {/* Storage Items */}
                      {storage.contents && storage.contents.length > 0 ? (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Contents</h4>
                          <div className="max-h-60 overflow-y-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {storage.contents.map((item) => (
                                  <tr key={item.itemId} className="hover:bg-gray-50">
                                    <td className="px-3 py-2 text-sm text-gray-900">
                                      <div className="flex items-center">
                                        <Package className="h-4 w-4 text-gray-400 mr-2" />
                                        {item.item?.displayName || item.item?.name}
                                      </div>
                                    </td>
                                    <td className="px-3 py-2 text-sm text-gray-900 text-right">
                                      {item.amount?.toLocaleString()}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">No items in storage</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Database className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No storage units available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}