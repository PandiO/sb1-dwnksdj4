import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { ObjectCreator } from './components/ObjectCreator';
import { LandingPage } from './pages/LandingPage';
import { ObjectViewPage } from './pages/ObjectViewPage';
import { DataTable } from './components/DataTable';
import { testData } from './data/testData';

function App() {
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
            <Route path="/view/:type/:id" element={<ObjectViewPage />} />
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
                        Description: (value) => value || '-'
                      }}
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
                        Description: (value) => value || '-'
                      }}
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