interface FieldConfig {
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'textarea';
  required?: boolean;
  description?: string;
  defaultValue?: any;
  placeholder?: string;
  validate?: (value: any) => string | undefined;
  min?: number;
  max?: number;
  step?: number;
  options?: Array<{ label: string; value: string | number }>;
}

interface ObjectConfig {
  label: string;
  fields: Record<string, FieldConfig>;
}

export const objectConfigs: Record<string, ObjectConfig> = {
  item: {
    label: 'Item',
    fields: {
      Name: {
        label: 'Name',
        type: 'text',
        required: true,
        description: 'Internal name used for identification',
        placeholder: 'e.g., premium-laptop-2024',
        validate: (value) => {
          if (!/^[a-z0-9-]+$/.test(value)) {
            return 'Name must contain only lowercase letters, numbers, and hyphens';
          }
        }
      },
      DisplayName: {
        label: 'Display Name',
        type: 'text',
        required: true,
        description: 'Name shown to users',
        placeholder: 'e.g., Premium Laptop 2024'
      },
      CategoryId: {
        label: 'Category',
        type: 'select',
        required: true,
        options: [
          { label: 'Electronics', value: '1' },
          { label: 'Furniture', value: '2' },
          { label: 'Books', value: '3' }
        ]
      },
      BaseItemName: {
        label: 'Base Item Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., Laptop'
      },
      BasePrice: {
        label: 'Base Price',
        type: 'number',
        required: true,
        min: 0,
        step: 0.01,
        placeholder: 'e.g., 999.99',
        validate: (value) => {
          if (value < 0) return 'Price cannot be negative';
        }
      },
      Price: {
        label: 'Sale Price',
        type: 'number',
        required: true,
        min: 0,
        step: 0.01,
        placeholder: 'e.g., 1299.99',
        validate: (value) => {
          if (value < 0) return 'Price cannot be negative';
        }
      }
    }
  },
  user: {
    label: 'User',
    fields: {
      name: {
        label: 'Full Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., John Smith'
      },
      email: {
        label: 'Email Address',
        type: 'text',
        required: true,
        placeholder: 'e.g., john.smith@example.com',
        validate: (value) => {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Please enter a valid email address';
          }
        }
      },
      role: {
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
        label: 'Status',
        type: 'select',
        required: true,
        defaultValue: true,
        options: [
          { label: 'Active', value: 'true' },
          { label: 'Inactive', value: 'false' }
        ]
      }
    }
  }
};