import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { ObjectCreator } from './components/ObjectCreator';
import { LandingPage } from './pages/LandingPage';
import { DataTable } from './components/DataTable';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { objectConfigs } from './config/objectConfigs';
import { testData } from './data/testData';
import { StructuresManager } from './io/structures';

function App() {
  const handleView = (item: any) => {
    console.log('View item:', item);
  };

  const handleEdit = (item: any) => {
    console.log('Edit item:', item);
  };

  const handleDelete = (item: any) => {
    console.log('Delete item:', item);
  };

  const tableActions = [
    {
      label: 'View',
      onClick: handleView,
      icon: <Eye className="h-4 w-4" />,
    },
    {
      label: 'Edit',
      onClick: handleEdit,
      icon: <Pencil className="h-4 w-4" />,
    },
    {
      label: 'Delete',
      onClick: handleDelete,
      icon: <Trash2 className="h-4 w-4" />,
    },
  ];

  // Default formatters for common fields
  const defaultFormatters = {
    Created: (value: Date) => value?.toLocaleDateString(),
    LocationCreateDTO: (value: any) => 
      value ? `(${value.X}, ${value.Y}, ${value.Z})` : '-',
    WgRegionId: (value: any) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        Region #{value}
      </span>
    ),
    AllowEntry: (value: boolean) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value ? 'Allowed' : 'Restricted'}
      </span>
    ),
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create/:objectType" element={<ObjectCreator />} />
            <Route path="/dashboard" element={
              <div className="p-8">
                <div className="max-w-7xl mx-auto space-y-12">
                  {/* Districts Table */}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Districts</h2>
                    <DataTable
                      data={[testData.districts.northDistrict, testData.districts.southDistrict]}
                      excludeColumns={['Town', 'TownId']}
                      formatters={{
                        ...defaultFormatters,
                        Description: (value) => value || '-',
                      }}
                      actions={tableActions}
                    />
                  </div>

                  {/* Structures Table */}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Structures</h2>
                    <DataTable
                      data={[
                        testData.structures.structure1,
                        testData.structures.structure2,
                        testData.structures.structure3
                      ]}
                      excludeColumns={['District', 'DistrictId', 'Street', 'StreetId']}
                      formatters={{
                        ...defaultFormatters,
                        Description: (value) => value || '-',
                        StreetNumber: (value) => `#${value}`,
                      }}
                      actions={tableActions}
                    />
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;