import React from 'react';
import { useParams } from 'react-router-dom';
import { ObjectView } from '../components/ObjectView';
import { objectConfigs } from '../config/objectConfigs';
import { testData } from '../data/testData';

export function ObjectViewPage() {
  const { type, id } = useParams<{ type: string; id: string }>();

  if (!type || !id) {
    return <div>Invalid parameters</div>;
  }

  const config = objectConfigs[type as keyof typeof objectConfigs];
  if (!config) {
    return <div>Invalid object type</div>;
  }

  // In a real application, you would fetch the data based on type and id
  // For now, we'll use the test data
  const getData = (type: string, id: string) => {
    switch (type) {
      case 'district':
        return Object.values(testData.districts).find(d => d.Id.toString() === id);
      case 'structure':
        return Object.values(testData.structures).find(s => s.Id.toString() === id);
      default:
        return null;
    }
  };

  const data = getData(type, id);
  if (!data) {
    return <div>Object not found</div>;
  }

  return <ObjectView data={data} config={config} />;
}