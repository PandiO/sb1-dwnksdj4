import React, { useEffect, useState } from "react";
import { getUIObjectConfig } from "../io/UIFieldConfigurationsClient";
import { UIObjectConfigDto } from "../utils/domain/dto/UIFieldConfigurations";
import DynamicFormRenderer from "../components/DynamicFormRenderer";

function UIFieldConfigurationsPage({ objectType }: { objectType: string }) {
  const [config, setConfig] = useState<UIObjectConfigDto | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const data = await getUIObjectConfig(objectType);
        setConfig(data);
      } catch (error) {
        console.error("Error fetching UIObjectConfig:", error);
      }
    }
    fetchConfig();
  }, [objectType]);

  return (
    <div>
      {config ? <DynamicFormRenderer config={config} /> : <p>Loading...</p>}
    </div>
  );
}

export default UIFieldConfigurationsPage;
