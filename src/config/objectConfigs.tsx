import React from 'react';
import { Building2, MapPin, Home, Package, User, Box, Database, Archive } from 'lucide-react';
import type { FormField, ObjectConfig } from '../types/common';
import type { Location } from '../types/Location';

const defaultLocationValue: Location = {
  x: 0,
  y: 0,
  z: 0,
  yaw: 0,
  pitch: 0,
};

export const placeholderConfigs = {
  text: {
    type: 'text',
    placeholder: 'Enter a value'
  },
  mail: {
    type: 'mail',
    placeholder: 'Enter an email address'
  },
  number: {
    type: 'number',
    placeholder: 'Enter a number'
  },
}

export const commonFields: Record<string, FormField> = {
  id: { name: 'id', label: 'Id', type: 'number', required: false, hidden: true, defaultValue: -1 },
  name: {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    validation: (value) => {
      if (!value || value.length < 3) return 'Name must be at least 3 characters';
    }
  },
  description: {
    name: 'description',
    label: 'Description',
    type: 'text',
    required: false
  }
};

const locationConfig: ObjectConfig = {
  type: 'location',
  label: 'Location',
  icon: <MapPin className="h-5 w-5" />,
  fields: {
    id: commonFields.id,
    name: { name: 'name', label: 'Name', type: 'text', required: false, defaultValue: 'Location', hidden: true },
    x: { name: 'x', label: 'X', type: 'number', required: true },
    y: { name: 'y', label: 'Y', type: 'number', required: true },
    z: { name: 'z', label: 'Z', type: 'number', required: true },
    yaw: { name: 'yaw', label: 'Yaw', type: 'number', required: false, defaultValue: 0 },
    pitch: { name: 'pitch', label: 'Pitch', type: 'number', required: false, defaultValue: 0 },
    worldName: { name: 'WorldName', label: 'World Name', type: 'text', required: true, defaultValue: 'world' }
  },
  showViewButton: false
};

const dominionConfig: ObjectConfig = {
  type: 'dominion',
  label: 'Dominion',
  icon: <Home className="h-5 w-5" />,
  fields: {
    id: commonFields.id,
    name: commonFields.name,
    description: commonFields.description,
    allowEntry: {
      name: 'AllowEntry',
      label: 'Allow Entry',
      type: 'bool',
      required: true,
      defaultValue: true
    },
    wgRegionId: {
      name: 'RegionName',
      label: 'Region',
      type: 'text',
      required: true
    },
    created: {
      name: 'Created',
      label: 'Created',
      type: 'date',
      required: false,
      hidden: true,
      defaultValue: new Date()
    },
    location: {
      name: 'Location',
      label: 'Location',
      type: 'object',
      required: true,
      objectConfig: locationConfig
    }
  },
  formatters: {
    wgRegionId: (value) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        {value}
      </span>
    ),
    created: (value: Date) => value.toLocaleDateString()
  }
};

const townConfig: ObjectConfig = {
  type: 'town',
  label: 'Town',
  icon: <Home className="h-5 w-5" />,
  fields: {
    ...dominionConfig.fields,
    requiredTitle: {
      name: 'RequiredTitle',
      label: 'Required Title',
      type: 'number',
      required: true,
      defaultValue: 1,
      validation: (value) => {
        if (value < 1) return 'Title must be larger than 0';
      }
    }
  },
  formatters: dominionConfig.formatters
};
let districtConfig: ObjectConfig = {
  type: '',
  label: '',
  icon: undefined,
  fields: {}
};

const streetConfig: ObjectConfig = {
  type: 'street',
  label: 'Street',
  icon: <MapPin className="h-5 w-5" />,
  fields: {
    id: commonFields.id,
    name: commonFields.name,
    district: {
      name: 'District',
      label: 'District',
      type: 'object',
      required: true,
      objectConfig: districtConfig
    }
  },
  formatters: dominionConfig.formatters
};

districtConfig = {
  type: 'district',
  label: 'District',
  icon: <MapPin className="h-5 w-5" />,
  fields: {
    ...dominionConfig.fields,
    town: {
      name: 'Town',
      label: 'Town',
      type: 'object',
      required: true,
      objectConfig: townConfig
    },
    streets: {
      name: 'Streets',
      label: 'Streets',
      type: 'array',
      objectConfig: streetConfig
    },
    streetNames: {
      name: 'StreetNames',
      label: 'Streets',
      type: 'array'
    }
  },
  formatters: dominionConfig.formatters
};

const itemConfig: ObjectConfig = {
  type: 'item',
  label: 'Item',
  icon: <Package className="h-5 w-5" />,
  fields: {
    id: commonFields.id,
    name: {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      validation: (value) => {
        if (!value || value.length < 2) return 'Name must be at least 2 characters';
      }
    },
    displayName: {
      name: 'displayName',
      label: 'Display Name',
      type: 'text',
      required: true
    },
    basePrice: {
      name: 'basePrice',
      label: 'Base Price',
      type: 'number',
      required: true,
      defaultValue: 1,
      validation: (value) => {
        if (value < 0) return 'Base price cannot be negative';
      }
    },
    categoryId: {
      name: 'categoryId',
      label: 'Category',
      type: 'number',
      required: true
    },
    gradeId: {
      name: 'gradeId',
      label: 'Grade',
      type: 'number',
      required: true
    },
    itemtypeId: {
      name: 'itemtypeId',
      label: 'Item Type',
      type: 'number',
      required: true
    },
    itemtypeName: {
      name: 'itemtypeName',
      label: 'Item Type Name',
      type: 'text',
      required: true
    },
    blockData: {
      name: 'blockData',
      label: 'Block Data',
      type: 'text',
      required: false
    },
    data: {
      name: 'data',
      label: 'Data',
      type: 'number',
      required: false,
      defaultValue: 0
    }
  },
  formatters: {
    basePrice: (value) => `${value.toFixed(2)} coins`,
    displayName: (value) => (
      <span className="font-minecraft">{value.replace(/§[0-9a-fk-or]/g, '')}</span>
    ),
    itemtypeName: (value) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        {value}
      </span>
    )
  }
};

const storageItemConfig: ObjectConfig = {
  type: 'storageItem',
  label: 'Storage Item',
  icon: <Box className="h-5 w-5" />,
  fields: {
    storageId: {
      name: 'storageId',
      label: 'Storage',
      type: 'number',
      required: true
    },
    itemId: {
      name: 'itemId',
      label: 'Item',
      type: 'number',
      required: true
    },
    amount: {
      name: 'amount',
      label: 'Amount',
      type: 'number',
      required: true,
      defaultValue: 0,
      validation: (value) => {
        if (value < 0) return 'Amount cannot be negative';
      }
    },
    item: {
      name: 'item',
      label: 'Item Details',
      type: 'object',
      required: true,
      objectConfig: itemConfig
    }
  },
  formatters: {
    amount: (value) => value.toLocaleString()
  }
};

const storageConfig: ObjectConfig = {
  type: 'storage',
  label: 'Storage',
  icon: <Database className="h-5 w-5" />,
  fields: {
    id: commonFields.id,
    name: commonFields.name,
    capacityMax: {
      name: 'capacityMax',
      label: 'Maximum Capacity',
      type: 'number',
      required: true,
      validation: (value) => {
        if (value <= 0) return 'Maximum capacity must be greater than 0';
      }
    },
    capacity: {
      name: 'capacity',
      label: 'Current Capacity',
      type: 'number',
      required: true,
      defaultValue: 0
    },
    itemAmountMax: {
      name: 'itemAmountMax',
      label: 'Maximum Items',
      type: 'number',
      required: true,
      validation: (value) => {
        if (value <= 0) return 'Maximum items must be greater than 0';
      }
    },
    itemAmount: {
      name: 'itemAmount',
      label: 'Current Items',
      type: 'number',
      required: true,
      defaultValue: 0
    },
    structureId: {
      name: 'structureId',
      label: 'Structure',
      type: 'number',
      required: false
    },
    structureName: {
      name: 'structureName',
      label: 'Structure Name',
      type: 'text',
      required: false
    },
    userId: {
      name: 'userId',
      label: 'User',
      type: 'text',
      required: false
    },
    userName: {
      name: 'userName',
      label: 'User Name',
      type: 'text',
      required: false
    },
    contents: {
      name: 'contents',
      label: 'Contents',
      type: 'array',
      required: false,
      objectConfig: storageItemConfig
    }
  },
  formatters: {
    capacity: (value, item) => {
      const max = item.capacityMax;
      const percentage = (value / max) * 100;
      return (
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                percentage > 90 ? 'bg-red-500' :
                percentage > 70 ? 'bg-yellow-500' :
                'bg-green-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-sm text-gray-600">
            {value.toLocaleString()} / {max.toLocaleString()}
          </span>
        </div>
      );
    },
    itemAmount: (value, item) => {
      const max = item.itemAmountMax;
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value >= max ? 'bg-red-100 text-red-800' :
          value >= max * 0.8 ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {value} / {max} items
        </span>
      );
    }
  }
};

const structureConfig: ObjectConfig = {
  type: 'structure',
  label: 'Structure',
  icon: <Building2 className="h-5 w-5" />,
  fieldDisplayConfig: {
    District: {
      fieldDisplayMode: 'all',
      fields: {
        Town: {
          fieldDisplayMode: 'idAndName'
        }
      }
    },
    Street: {
      fieldDisplayMode: 'idAndName'
    },
    Location: {
      fieldDisplayMode: 'all'
    }
  },
  fields: {
    ...dominionConfig.fields,
    district: {
      name: 'District',
      label: 'District',
      type: 'object',
      required: true,
      objectConfig: districtConfig
    },
    street: {
      name: 'Street',
      label: 'Street',
      type: 'object',
      required: true,
      objectConfig: streetConfig
    },
    streetNumber: {
      name: 'StreetNumber',
      label: 'Street Number',
      type: 'number',
      required: false,
      validation: (value) => {
        if (value < 1) return 'Street number must be positive';
      }
    },
    storages: {
      name: 'storages',
      label: 'Storages',
      type: 'array',
      required: false,
      objectConfig: storageConfig
    }
  },
  formatters: {
    ...dominionConfig.formatters,
    streetNumber: (value) => `#${value}`
  }
};

export const objectConfigs: Record<string, ObjectConfig> = {
  location: locationConfig,
  dominion: dominionConfig,
  town: townConfig,
  district: districtConfig,
  structure: structureConfig,
  street: streetConfig,
  item: itemConfig,
  storageItem: storageItemConfig,
  storage: storageConfig,
  user: {
    type: 'user',
    label: 'User',
    icon: <User className="h-5 w-5" />,
    fields: {
      name: {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        required: true
      },
      email: {
        name: 'email',
        label: 'Email Address',
        type: 'text',
        required: true,
        validation: (value) => {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Please enter a valid email address';
          }
        }
      },
      role: {
        name: 'role',
        label: 'Role',
        type: 'select',
        required: true,
        options: [
          { label: 'User', value: 'user' },
          { label: 'Admin', value: 'admin' },
          { label: 'Manager', value: 'manager' }
        ]
      },
      isActive: {
        name: 'isActive',
        label: 'Status',
        type: 'select',
        required: true,
        defaultValue: true,
        options: [
          { label: 'Active', value: 'true' },
          { label: 'Inactive', value: 'false' }
        ]
      }
    },
    formatters: {
      isActive: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      ),
      role: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {value}
        </span>
      )
    }
  }
};